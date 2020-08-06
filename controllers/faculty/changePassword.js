var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var userModel	= require.main.require('./models/facultyUserModel');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});




router.get('/',[
	check('oldPass', 'Old password must required').isEmpty(),
	check('newPass', 'New password is required').isEmpty(),
	check('confirmNewPass', 'Confirm new password is required').isEmpty()
	]
	,function(req,res){
		var errors = validationResult(req);
		console.log('password change page requested!');
		res.render('faculty/changePassword',{userid:req.cookies['username'],error:errors.mapped()});
});

router.post('/',[
	check('oldPass', 'Old password must required').not().isEmpty(),
	check('newPass', 'New password is required').not().isEmpty(),
	check('confirmNewPass', 'Confirm new password is required').not().isEmpty()
	]
	,function(req,res){
		var data ={
			oldPass : req.body.oldPass,
			newPass : req.body.newPass,
			confirmNewPass : req.body.confirmNewPass,
			userid : req.cookies['username']
		};
		var errors = validationResult(req);
		userModel.getPassword(data.userid,function (result) {
			if (result==null) {
				res.send("Something wrong");
			}
			else
			{
				if (!errors.isEmpty()) {
					res.render('faculty/changePassword',{userid:req.cookies['username'],error:errors.mapped()});
				}
				else
				{
					if (result.password==data.oldPass) {
						if (data.newPass==data.confirmNewPass) {
							userModel.updatePassword(data,function(status) {
								if (status) {
									res.redirect("/logout");
								}
								else
								{
									res.redirect("/changePassword");
								}
							});
						}
						else
						{
							res.send("New password or confirm pasword not matching");
						}
					}
					else
					{
						res.send("Incorrect old password");
					}
				}
			}
		});
});


module.exports = router;
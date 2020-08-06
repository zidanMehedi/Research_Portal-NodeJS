var express = require('express');
var router = express.Router();
var facultyModel = require.main.require('./models/facultyFacultyModel');
var userModel	= require.main.require('./models/facultyUserModel');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/',[
	check('fname', 'first name is required').isEmpty(),
	check('lname', 'last name is required').isEmpty(),
	check('email', 'valid email is required').isEmpty(),
	check('contact', 'Phone number is required').isEmpty(),
	check('password', 'password must required').isEmpty()
	]
	,function(req,res){
		var errors = validationResult(req);
		facultyModel.getByID(req.cookies['username'],function(result) {
				if (result==null) {
					res.send("Something wrong");
				}
				else
				{
					console.log('Profile Page requested!');
					res.render('faculty/profile',{details:result,error:errors.mapped()});
				}
		});
		
});

router.post('/',
	[
	check('fname', 'first name is required').not().isEmpty(),
	check('lname', 'last name is required').not().isEmpty(),
	check('email', 'valid email is required').notEmpty().isEmail(),
	check('contact', 'Phone number is required').not().isEmpty(),
	check('password', 'password must required').not().isEmpty()
	]
	,function(req,res) {
		var errors = validationResult(req);
		var data ={
			fname : req.body.fname,
			lname : req.body.lname,
			contact : req.body.contact,
			email : req.body.email,
			id : req.cookies['username']
		};
		
		userModel.getPassword(req.cookies['username'],function(result) {
			if (result==null) {
				res.send("Something wrong");
			}
			else
			{
				if (!errors.isEmpty()) {
					console.log(errors.mapped())
					facultyModel.getByID(req.cookies['username'],function(result) {
						if (result==null) {
							res.send("Something wrong");
						}
						else
						{
							console.log('Profile Page requested!');
							res.render('faculty/profile',{details:result,error:errors.mapped()});
						}
							});
					}
				else
				{
					if (result.password==req.body.password) {
						facultyModel.update(data,function(status) {
							if (status) {
								res.redirect('/profile');
							}
							else
							{
								res.send("not updated");
							}
						});
					}
					else
					{
						res.send("Something wrong");
					}
				}
			}
		});
});

module.exports = router;
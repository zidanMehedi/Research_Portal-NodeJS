var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var userModel	= require.main.require('./models/facultyUserModel');
var studentModel	= require.main.require('./models/facultyStudentModel');

router.get('*',function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/',
	[
	check('userId', 'first name is required').isEmpty(),
	check('fname', 'last name is required').isEmpty(),
	check('lname', 'valid email is required').isEmpty(),
	check('email', 'Phone number is required').isEmpty(),
	check('phnNo', 'password must required').isEmpty(),
	check('cgpa', 'password must required').isEmpty(),
	check('dept', 'password must required').isEmpty(),
	check('credit', 'password must required').isEmpty()
	]
	,function(req,res){
		var errors = validationResult(req);
		console.log('Student add requested!');
		res.render('faculty/studentReg',{userid:req.cookies['username'],error:errors.mapped()});
});

router.post('/',
	[
	check('userId', 'UserID is required').notEmpty(),
	check('fname', 'last name is required').notEmpty(),
	check('lname', 'valid email is required').notEmpty(),
	check('email', 'Phone number is required').notEmpty().isEmail(),
	check('phnNo', 'password must required').notEmpty(),
	check('cgpa', 'password must required').notEmpty(),
	check('dept', 'password must required').notEmpty(),
	check('credit', 'password must required').notEmpty()
	]
	,function(req,res){
		var errors = validationResult(req);
		var today = new Date();
		var sysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var data = {
			userid : req.body.userId,
			fname : req.body.fname,
			lname : req.body.lname,
			email : req.body.email,
			contact : req.body.phnNo,
			cgpa : req.body.cgpa,
			dept : req.body.dept,
			credit : req.body.credit,
			regDate : sysDate
		};
		console.log('Student add requested!');
		if (!errors.isEmpty()) {
			console.log(errors.mapped());
			res.render('faculty/studentReg',{userid:req.cookies['username'],error:errors.mapped()});
		}
		else
		{
			studentModel.addStudent(data,function(status) {
				if (status) {
					userModel.addUser(data,function(stat) {
						if (stat) {
							res.redirect('/studentDetails');
						}
						else
						{
							console.log("2nd con");
							res.send("Something wrong. Try again");
						}
					});
				}
				else
				{
					console.log("1st con");
					res.send("Something wrong. Try again");
				}
			});
		}
		
});


module.exports = router;
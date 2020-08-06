var express = require('express');
var router = express.Router();
var teacherModel   = require.main.require('./models/AdminFacultyModel');
var userModel   = require.main.require('./models/AdminUserModel');
const { check, validationResult } = require('express-validator/check');


router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', [
  check('userid', 'UserID is required').isEmpty(),
  check('fname', 'First Name is required').isEmpty(),
  check('lname', 'Last Name is required').isEmpty(),
  check('email', 'Email is not valid').isEmpty(),
  check('contact', 'Contact No is required').isEmpty(),
  check('dept', 'Department Name is required').isEmpty()
  ] ,function(req,res){
  	var errors = validationResult(req);
    console.log('Teacher add requested!');
    res.render('admin/AdminTeacherReg',{error:errors.mapped()});
});

router.post('/', [
  check('userid', 'UserID is required').not().isEmpty(),
  check('fname', 'First Name is required').not().isEmpty(),
  check('lname', 'Last Name is required').not().isEmpty(),
  check('email', 'Email is not valid').not().isEmpty().isEmail(),
  check('contact', 'Contact No is required').not().isEmpty(),
  check('dept', 'Department Name is required').not().isEmpty()
  ], function(req, res){
	
	var today = new Date();
	var sysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	var user = {
		userid: req.body.userid,
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		contact: req.body.contact,
		dept: req.body.dept,
		regDate: sysDate,
		status: 1,
		password: req.body.userid,
		role: 2
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.mapped());
    	res.render('AdminTeacherReg', {error:errors.mapped()});	
    }else{
		teacherModel.addTeacher(user, function(status){
		console.log(status);
		if (status) {
			userModel.addUser(user, function(status){
			console.log(status);
			if (status) {
				res.redirect('/AdminTeacherDetails');
			}else{
				res.redirect('/AdminTeacherReg');
			}
		});
		}else{
			res.redirect('/AdminTeacherReg');
		}
				
		});
	}
});

module.exports = router;
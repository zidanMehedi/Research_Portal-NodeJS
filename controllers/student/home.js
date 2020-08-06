var express = require('express');
const studentModel= require.main.require('./models/StudentStudentModel');
var router = express.Router();
const{check, validationResult}=require('express-validator/check');
const{matchedData, sanitizeBody}=require('express-validator/filter');

router.get('*',function(req,res,next){
	if(req.cookies['username']!=null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/',
	[check('student_userid','User ID is Empty').isEmpty(),
	check('student_fname','First Name is Empty').isEmpty(),
	check('student_lname','Last Name is Empty').isEmpty(),
	check('student_email','Email is Empty').isEmpty(),
	check('student_dept','Department is Empty').isEmpty(),
	check('student_cgpa','CGPA is Empty').isEmpty(),
	check('student_credit','Credit is Empty').isEmpty(),
	check('student_contact','Contact Number is Empty').isEmpty(),
	check('student_regDate','Registration Date is Empty').isEmpty()
	],function(req,res){
	var errors = validationResult(req);
	var data=matchedData(req);
	console.log(errors.mapped());
	console.log(data);
	if(req.cookies['username']!=null)
	{
			console.log('login page requested!');
			studentModel.getById(req.cookies['username'],function(results){
			res.render('student/home/index',{title: 'Welcome',user:results, error:errors.mapped() , moment:require('moment'), check:false});
		});
	}else{
		res.redirect('/logout');
	}
});

router.post('/',
	[check('student_id','User ID is Empty').not().isEmpty(),
	check('student_fname','First Name is Empty').not().isEmpty(),
	check('student_lname','Last Name is Empty').not().isEmpty(),
	check('student_email','Email is Empty').not().isEmpty(),
	check('student_dept','Department is Empty').not().isEmpty(),
	check('student_dept','Invalid Department').not().isNumeric(),
	check('student_cgpa','CGPA is Empty').not().isEmpty(),
	check('student_credit','Credit is Empty').not().isEmpty(),
	check('student_credit','Invalid Credit').isNumeric(),
	check('student_contact','Contact Number is Empty').not().isEmpty(),
	check('student_contact','Invalid Contact').isNumeric(),
	check('student_regDate','Registration Date is Empty').not().isEmpty()
	],function(req,res){
	if(req.cookies['username']!=null)
	{
		console.log('login page requested!');
		var user={
			userid:req.body.student_userid,
			fname:req.body.student_fname,
			lname:req.body.student_lname,
			email:req.body.student_email,
			dept:req.body.student_dept,
			cgpa:req.body.student_cgpa,
			credit:req.body.student_credit,
			contact:req.body.student_contact,
			regDate:req.body.student_regDate
		}
		console.log(user);
		var errors = validationResult(req);
		var data=matchedData(req);
		console.log(errors.mapped());
		console.log(data);
		if(!errors.isEmpty())
		{
			res.render('student/home/index',{title: 'Welcome',user:data, error:errors.mapped(),moment:require('moment'),check:true});	
		}else{
			studentModel.update(user,function(status){
			if(status){
				res.render('student/home/index',{title: 'Welcome',user:data, error:errors.mapped() ,moment:require('moment'),check:true});
			}
		});
		}
	}else{
		res.redirect('/logout');
	}
});


module.exports = router;
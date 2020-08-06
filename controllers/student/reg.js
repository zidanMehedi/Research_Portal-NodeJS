const express = require('express');
var multer = require('multer');
var path = require('path');
var md5 = require('md5');
var generator = require('generate-password');
const studentModel= require.main.require('./models/StudentStudentModel');
const studentUserModel= require.main.require('./models/StudentUserModel');
const studentVerify= require.main.require('./models/StudentVerificationModel');
router = express.Router();

router.use(express.static(__dirname+'./public'));

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

var Storage=multer.diskStorage({
	destination:'./public/upload/verification',
	filename:function(req,file,callback){
		callback(null,path.basename(file.originalname,path.extname(file.originalname))+'_'+req.body.userid+'_'+Date.now()+path.extname(file.originalname));
	}
})

var upload = multer({
	storage:Storage,
}).single('file');


router.get('/',function(req,res)
	{res.clearCookie('username');
	res.clearCookie('token');
	res.render('student/reg/index',{msg:null});

});
router.post('/',upload,function(req,res){

	var password = generator.generate({
    length: 8,
    numbers: true,
    excludeSimilarCharacters: true
	});

	var user={
		userid:req.body.userid,
		fname:req.body.fname,
		lname:req.body.lname,
		email:req.body.email,
		dept:req.body.dept,
		cgpa:req.body.cgpa,
		credit:req.body.credit,
		contact:req.body.contact,
		regDate:today,
		password:password,
		status:'inactive'
	};
	console.log(user);
	studentModel.insert(user,function(results){
		if(results)
		{
			studentUserModel.insert(user,function(results){
				if(results)
				{
					studentModel.getById(user.userid,function(result){
						if(result)
							{
								//console.log(result);
								info={
									file:req.file.filename,
									sid:result.sid
								}
							studentVerify.insert(info,function(results){
								if(results!=null){
									//res.redirect('/login');
									res.render('student/reg/regInfo',{data:user});
								}else{
									console.log(results);
									res.render('student/reg/regInfo',{data:null});
								}
							});
						}else{
							res.render('student/reg/index',{msg:' '});
						}
					});
				}else{
					res.render('student/reg/index',{msg:' '});
					//res.redirect('/reg');
				}
			});
		}else{
			res.render('student/reg/index',{msg:' '});
		}
	});
});

module.exports = router;
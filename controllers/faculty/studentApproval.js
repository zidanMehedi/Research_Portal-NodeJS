var express = require('express');
var router = express.Router();
const path = require('path');
var studentModel	= require.main.require('./models/facultyStudentModel');
var verificationModel	= require.main.require('./models/facultyVerificationModel');


router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});




router.get('/',function(req,res){
		studentModel.inactiveStudentDetails(null,function(result) {
			if (result==null) {
				res.render('faculty/studentApproval',{userid:req.cookies['username'],data:null});
			}
			else
			{
				res.render('faculty/studentApproval',{userid:req.cookies['username'],data:result});
			}
			
		});
		
});

router.get('/approve/:id',function (req,res) {
	var id = req.params.id;
	studentModel.approveStudent(id,function(status) {
		if (status) {
			res.redirect('/studentApproval');
		}
		else
		{
			res.redirect('/studentApproval');
		}
	})

});

router.get('/download/:id',function (req,res) {
	var id = req.params.id;
	verificationModel.getVeriFiles(id,function(result) {
		var file = result.ver_fileName;
		  var fileLocation = path.join('./public/upload/verification',file);
		  console.log(fileLocation);
		  res.download(fileLocation, file);
	});
});

router.get('/inSearch/:key',function(req,res){
	studentModel.inactiveStudentSearch(req.params.key,function(result) {
		console.log(result);
		res.render('faculty/ajaxInactiveStudDetails',{data:result});
	});
});


module.exports = router;
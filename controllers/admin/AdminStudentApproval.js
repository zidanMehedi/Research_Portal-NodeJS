var express 				= require('express');
var router 					= express.Router();
var studentModel   			= require.main.require('./models/AdminStudentModel');
var userModel   			= require.main.require('./models/AdminUserModel');
var verificationModel   	= require.main.require('./models/AdminVerificationModel');
const path = require('path');


router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	verificationModel.getAllPendingStudents(function(results){
		if(results.length > 0){
			console.log('Student approval requested!');
    		res.render('admin/AdminStudentApproval', {pendingStudents: results});
		}else{
			res.render('admin/AdminStudentApproval', {pendingStudents: []});
		}
	});
})

router.get('/AdminStudentProfile/:id', function(req, res){
	
	studentModel.getById(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminStudentProfile', {pendingStudent: result[0]});
	});
});

router.get('/AdminStudentApprovalCon/:id', function(req, res){
	
	studentModel.getById(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminStudentApprovalCon', {studentApprove: result[0]});
	});
});

router.post('/AdminStudentApprovalCon/:id', function(req, res){
	console.log(req.params.id);
	studentModel.approveStudent(req.params.id, function(status){
		if(status){
			console.log(status);
			verificationModel.deletePendingStudent(req.params.id, function(status1){
				if(status1){
					console.log(status1);
					res.redirect('/AdminStudentApproval');
				}else{
					res.redirect('/AdminStudentApprovalCon/'+req.params.id);
				}
			});
		}else{
			res.redirect('/AdminStudentApprovalCon/'+req.params.id);
		}
	});
});

router.get('/AdminStudentDeclineCon/:id', function(req, res){
	
	studentModel.getById(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminStudentDeclineCon', {studentDecline: result[0]});
	});
});

router.post('/AdminStudentDeclineCon/:id', function(req, res){
	//console.log(req.params.id);
	verificationModel.deletePendingStudent(req.params.id, function(status1){
		if(status1){
			studentModel.getUserIDById(req.params.id, function(result){
				console.log(result[0].student_id);	

				studentModel.deleteStudent(result[0].student_id, function(status){
					console.log(status);
					if(status){
						
						userModel.deleteUser(result[0].student_id, function(status2){
							if(status2){
								console.log(status2);
								res.redirect('/AdminStudentApproval');
							}else{
								res.redirect('/AdminStudentApproval/AdminStudentDeclineCon/'+req.params.id);
							}
						});
					}else{
						res.redirect('/AdminStudentApproval/AdminStudentDeclineCon/'+req.params.id);
					}
				});
			});
		}else{
			res.redirect('/AdminStudentApproval/AdminStudentDeclineCon/'+req.params.id);
		}
	});
	
});


router.get('/:file',function(req,res){
	
	var file = req.params.file;
	var fileLocation = path.join('./public/upload/verification',file);
	console.log(fileLocation);
	res.download(fileLocation, file); 
		
});




module.exports = router;
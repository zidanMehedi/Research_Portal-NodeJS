var express 				= require('express');
var router 					= express.Router();
var studentModel   			= require.main.require('./models/AdminStudentModel');


router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	studentModel.getAllInactiveStudents(function(results){
		if(results.length > 0){
			console.log('Student Unblock list requested!');
    		res.render('admin/AdminStudentUnblock', {studentlist: results});
		}else{
			res.render('admin/AdminStudentUnblock', {studentlist: []});
		}
	});
})


router.get('/AdminStudentUnblockConfirm/:id', function(req, res){
	
	studentModel.getById(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminStudentUnblockConfirm', {studentUnblock: result[0]});
	});
});


router.post('/AdminStudentUnblockConfirm/:id', function(req, res){
	console.log(req.params.id);
	studentModel.unblockStudent(req.params.id, function(status){
		if(status){
			console.log(status);
			res.redirect('/AdminStudentUnblock');
		}else{
			res.redirect('/AdminStudentUnblockConfirm/'+req.params.id);
		}
	});
});


module.exports = router;
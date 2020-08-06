var express 			= require('express');
var router 				= express.Router();
var teacherModel   		= require.main.require('./models/AdminFacultyModel');


router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	teacherModel.getAllInactiveTeachers(function(results){
		if(results.length > 0){
			console.log('Teacher Unblock list requested!');
    		res.render('admin/AdminTeacherUnblock', {teacherlist: results});
		}else{
			res.render('admin/AdminTeacherUnblock', {teacherlist: []});
		}
	});
})

router.get('/AdminTeacherUnblockConfirm/:id', function(req, res){
	
	teacherModel.getById(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminTeacherUnblockConfirm', {teacherUnblock: result[0]});
	});
});


router.post('/AdminTeacherUnblockConfirm/:id', function(req, res){
	console.log(req.params.id);
	teacherModel.unblockTeacher(req.params.id, function(status){
		if(status){
			console.log(status);
			res.redirect('/AdminTeacherUnblock');
		}else{
			res.redirect('/AdminTeacherUnblockConfirm/'+req.params.id);
		}
	});
});


module.exports = router;
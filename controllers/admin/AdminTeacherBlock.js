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
	teacherModel.getAllActiveTeachers(function(results){
		if(results.length > 0){
			console.log('Teacher Block list requested!');
    		res.render('admin/AdminTeacherBlock', {teacherlist: results});
		}else{
			res.render('admin/AdminTeacherBlock', {teacherlist: []});
		}
	});
})

router.get('/AdminTeacherBlockConfirm/:id', function(req, res){
	
	teacherModel.getById(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminTeacherBlockConfirm', {teacherBlock: result[0]});
	});
});


router.post('/AdminTeacherBlockConfirm/:id', function(req, res){
	console.log(req.params.id);
	teacherModel.blockTeacher(req.params.id, function(status){
		if(status){
			console.log(status);
			res.redirect('/AdminTeacherBlock');
		}else{
			res.redirect('/AdminTeacherBlockConfirm/'+req.params.id);
		}
	});
});


module.exports = router;
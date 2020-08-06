var express 						= require('express');
var router 							= express.Router();
var semesterModel   					= require.main.require('./models/AdminSemesterModel');
const { check, validationResult } 	= require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');



router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	semesterModel.getAllSemester(function(results){
		if(results.length > 0){
			console.log('Semester list requested!');
    		res.render('admin/AdminSemesterDetails', {semlist: results});
		}else{
			res.render('admin/AdminSemesterDetails', {semlist: []});
		}
	});
});


router.get('/AdminSemesterUpdate/:id',[
  check('name', 'Semester name is required').isEmpty()
  ] , function(req, res){
	var errors = validationResult(req);
	semesterModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('admin/AdminSemesterUpdate', {semester: result[0], error:errors.mapped()});
	});
});


router.post('/AdminSemesterUpdate/:id', [
  check('name', 'Semester name is required').not().isEmpty()
  ], function(req, res){
	
	var semester = {
		name: req.body.name,
		id: req.params.id
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
    	console.log(errors.mapped());
    	//var allErrors = errors.mapped();
    	//console.log(allErrors);
    	var semesters = matchedData(req);
    	console.log(semesters);
    	domainModel.getById(req.params.id, function(result){
			res.render('admin/AdminSemesterUpdate', {semester: semesters, error:errors.mapped()});
		});
    }else{
		semesterModel.updateSemester(semester, function(status){
			console.log(status);
			if (status) {
				res.redirect('/AdminSemesterDetails');
			}else{
				res.redirect('/AdminSemesterDetails/AdminSemesterUpdate/'+req.params.id);
			}	
		});
	}
});


router.get('/AdminSemesterDelete/:id', function(req, res){
	
	semesterModel.getById(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminSemesterDelete', {semDel: result[0]});
	});
});


router.post('/AdminSemesterDelete/:id', function(req, res){
	console.log(req.params.id);
	semesterModel.deleteSemester(req.params.id, function(status){
		if(status){
			//console.log(status);
			res.redirect('/AdminSemesterDetails');
		}else{
			res.redirect('/AdminSemesterDelete/'+req.params.id);
		}
	});
});

module.exports = router;	
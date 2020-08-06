var express = require('express');
var router = express.Router();
var semesterModel   = require.main.require('./models/AdminSemesterModel');
const { check, validationResult } = require('express-validator/check');


router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', [
  check('name', 'Semester name is required').isEmpty()
  ] ,function(req,res){
  	var errors = validationResult(req);
    console.log('Semester add requested!');
    res.render('admin/AdminSemesterAdd',{error:errors.mapped()});
  
});

router.post('/', [
  check('name', 'Doamin name is required').not().isEmpty()
  ], function(req, res){
	

	var sem = {
		name: req.body.name,
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.mapped());
    	res.render('admin/AdminSemesterAdd', {error:errors.mapped()});	
    }else{
		semesterModel.addSemester(sem, function(status){
			console.log(status);
			if (status) {
				semesterModel.getLastId(function(result){
					semesterModel.makeSemesterInactive(result[0].last, function(status1){
						console.log(status1);
						if (status1) {
							res.redirect('/AdminSemesterDetails');
						}else{
							res.redirect('/AdminSemesterAdd');
						}
							
					});
				});
			}else{
				res.redirect('/AdminSemesterAdd');
			}
				
		});
	}
});


module.exports = router;
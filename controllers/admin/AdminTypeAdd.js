var express = require('express');
var router = express.Router();
var typeModel   = require.main.require('./models/AdminTypeModel');
const { check, validationResult } = require('express-validator/check');


router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', [
  check('name', 'Type name is required').isEmpty()
  ] ,function(req,res){
  	var errors = validationResult(req);
    console.log('Type add requested!');
    res.render('admin/AdminTypeAdd',{error:errors.mapped()});
  
});

router.post('/', [
  check('name', 'Type name is required').not().isEmpty()
  ], function(req, res){
	

	var type = {
		name: req.body.name,
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.mapped());
    	res.render('admin/AdminTypeAdd', {error:errors.mapped()});	
    }else{
		typeModel.addType(type, function(status){
		console.log(status);
		if (status) {
			res.redirect('/AdminTypeDetails');
		}else{
			res.redirect('/AdminTypeAdd');
		}
				
		});
	}
});

module.exports = router;
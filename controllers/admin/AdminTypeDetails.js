var express 						= require('express');
var router 							= express.Router();
var typeModel   					= require.main.require('./models/AdminTypeModel');
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
	typeModel.getAllType(function(results){
		if(results.length > 0){
			console.log('Type list requested!');
    		res.render('admin/AdminTypeDetails', {typelist: results});
		}else{
			res.render('admin/AdminTypeDetails', {typelist: []});
		}
	});
});


router.get('/AdminTypeUpdate/:id',[
  check('name', 'Type name is required').isEmpty()
  ] , function(req, res){
	var errors = validationResult(req);
	typeModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('admin/AdminTypeUpdate', {type: result[0], error:errors.mapped()});
	});
});


router.post('/AdminTypeUpdate/:id', [
  check('name', 'Type name is required').not().isEmpty()
  ], function(req, res){
	
	var type = {
		name: req.body.name,
		id: req.params.id
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
    	console.log(errors.mapped());
    	//var allErrors = errors.mapped();
    	//console.log(allErrors);
    	var types = matchedData(req);
    	console.log(domains);
    	typeModel.getById(req.params.id, function(result){
			res.render('admin/AdminTypeUpdate', {type: types, error:errors.mapped()});
		});
    }else{
		typeModel.updateType(type, function(status){
			console.log(status);
			if (status) {
				res.redirect('/AdminTypeDetails');
			}else{
				res.redirect('/AdminTypeDetails/AdminTypeUpdate/'+req.params.id);
			}	
		});
	}
});


router.get('/AdminTypeDelete/:id', function(req, res){
	
	typeModel.getById(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminTypeDelete', {typeDel: result[0]});
	});
});


router.post('/AdminTypeDelete/:id', function(req, res){
	console.log(req.params.id);
	typeModel.deleteType(req.params.id, function(status){
		if(status){
			//console.log(status);
			res.redirect('/AdminTypeDetails');
		}else{
			res.redirect('AdminTypeDetails/AdminTypeDelete/'+req.params.id);
		}
	});
});

module.exports = router;	
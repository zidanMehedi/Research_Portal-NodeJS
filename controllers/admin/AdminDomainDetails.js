var express 						= require('express');
var router 							= express.Router();
var domainModel   					= require.main.require('./models/AdminDomainModel');
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
	domainModel.getAllDomains(function(results){
		if(results.length > 0){
			console.log('Domain list requested!');
    		res.render('admin/AdminDomainDetails', {domainlist: results});
		}else{
			res.render('admin/AdminDomainDetails', {domainlist: []});
		}
	});
});


router.get('/AdminDomainUpdate/:id',[
  check('name', 'Domain name is required').isEmpty(),
  check('des', 'Domain description is required').isEmpty()
  ] , function(req, res){
	var errors = validationResult(req);
	domainModel.getById(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminDomainUpdate', {domain: result[0], error:errors.mapped()});
	});
});


router.post('/AdminDomainUpdate/:id', [
  check('name', 'Domain name is required').not().isEmpty(),
  check('des', 'Domain description is required').not().isEmpty()
  ], function(req, res){
	
	var domain = {
		name: req.body.name,
		des: req.body.des,
		id: req.params.id
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
    	console.log(errors.mapped());
    	//var allErrors = errors.mapped();
    	//console.log(allErrors);
    	var domains = matchedData(req);
    	console.log(domains);
    	domainModel.getById(req.params.id, function(result){
			res.render('admin/AdminDomainUpdate', {domain: domains, error:errors.mapped()});
		});
    }else{
		domainModel.updateDomain(domain, function(status){
			console.log(status);
			if (status) {
				res.redirect('/AdminDomainDetails');
			}else{
				res.redirect('/AdminDomainDetails/AdminDomainUpdate/'+req.params.id);
			}	
		});
	}
});


router.get('/AdminDomainDelete/:id', function(req, res){
	
	domainModel.getById(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminDomainDelete', {domainDel: result[0]});
	});
});


router.post('/AdminDomainDelete/:id', function(req, res){
	console.log(req.params.id);
	domainModel.deleteDomain(req.params.id, function(status){
		if(status){
			//console.log(status);
			res.redirect('/AdminDomainDetails');
		}else{
			res.redirect('/AdminDomainDelete/'+req.params.id);
		}
	});
});

module.exports = router;	
var express = require('express');
var router = express.Router();
var domainModel   = require.main.require('./models/AdminDomainModel');
const { check, validationResult } = require('express-validator/check');


router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', [
  check('name', 'Doamin name is required').isEmpty(),
  check('des', 'Doamin description is required').isEmpty()
  ] ,function(req,res){
  	var errors = validationResult(req);
    console.log('Domain add requested!');
    res.render('admin/AdminDomainAdd',{error:errors.mapped()});
  
});

router.post('/', [
  check('name', 'Doamin name is required').not().isEmpty(),
  check('des', 'Doamin description is required').not().isEmpty()
  ], function(req, res){
	

	var domain = {
		name: req.body.name,
		des: req.body.des
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.mapped());
    	res.render('admin/AdminDomainAdd', {error:errors.mapped()});	
    }else{
		domainModel.addDomain(domain, function(status){
		console.log(status);
		if (status) {
			res.redirect('/AdminDomainDetails');
		}else{
			res.redirect('/AdminDomainAdd');
		}
				
		});
	}
});

module.exports = router;
var express 					  = require('express');
var router 						  = express.Router();
var teacherModel   				  = require.main.require('./models/AdminFacultyModel');
var domainModel   				  = require.main.require('./models/AdminDomainModel');
var subDomainModel 				  = require.main.require('./models/AdminSubDomainModel');
var typeModel   				  = require.main.require('./models/AdminThesisTypeModel');
var groupModel   				  = require.main.require('./models/AdminGroupModel');
const { check, validationResult } = require('express-validator/check');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', [
  check('name', 'Topic name is required').isEmpty(),
  check('description', 'Description is required').isEmpty(),
  check('type', 'Type is required').isEmpty(),
  check('domain', 'Domain name is required').isEmpty(),
  check('supervisor', 'Supervisor name is required').isEmpty()
  ] , function(req, res){
  	console.log('Topic Offer requested!');
  	var errors = validationResult(req);
	domainModel.getAllDomains(function(domainResults){
		if(domainResults.length > 0){
			teacherModel.getAllActiveTeachers(function(teacherResults){
				if(teacherResults.length > 0){
					//console.log(domainResults);
					//console.log(teacherResults);
		    		typeModel.getAllResearchType(function(typeResults){
						if(typeResults.length > 0){
							console.log(domainResults);
							console.log(teacherResults);
				    		res.render('admin/AdminOfferTopic', {domainlist: domainResults,typelist: typeResults,teacherlist: teacherResults,error:errors.mapped()});
						}else{
							res.render('admin/AdminOfferTopic', {domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});
						}
					});
				}else{
					res.render('admin/AdminOfferTopic', {domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});
				}
			});
		}else{
			res.render('admin/AdminOfferTopic', {domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});
		}
	});
})



router.post('/', [
  check('name', 'Topic name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('type', 'Type is required').not().isEmpty(),
  check('domain', 'Domain name is required').not().isEmpty(),
  check('supervisor', 'Supervisor name is required').not().isEmpty()
  ], function(req, res){
	

	var topic = {
		name: req.body.name,
		description: req.body.description,
		type: req.body.type,
		domain: req.body.domain,
		supervisor: req.body.supervisor	
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.mapped());
    	res.render('admin/AdminOfferTopic', {error:errors.mapped()});	
    }else{
		subDomainModel.addSubDomain(topic, function(status){
			console.log(status);
			if (status) {
				groupModel.addGroup(null, function(status1){
					console.log(status1);
					if (status1) {
						res.redirect('/AdminTopicDetails');
					}else{
						res.redirect('/AdminOfferTopic');
					}
						
				});
			}else{
				res.redirect('/AdminOfferTopic');
			}
				
		});
	}
});


module.exports = router;
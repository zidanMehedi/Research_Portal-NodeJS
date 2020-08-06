var express 						= require('express');
var router 							= express.Router();
var teacherModel   				  	= require.main.require('./models/AdminFacultyModel');
var domainModel   				 	= require.main.require('./models/AdminDomainModel');
var subDomainModel 				  	= require.main.require('./models/AdminSubDomainModel');
var typeModel   				  	= require.main.require('./models/AdminThesisTypeModel');
var groupModel   				  = require.main.require('./models/AdminGroupModel');
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
	subDomainModel.getAllSubDomain(function(results){
		if(results.length > 0){
			console.log('Topic list requested!');
    		res.render('admin/AdminTopicDetails', {topiclist: results});
		}else{
			res.render('admin/AdminTopicDetails', {topiclist: []});
		}
	});
})

/*router.get('/AdminTopicUpdate/:id',[
  check('name', 'Topic name is required').isEmpty(),
  check('description', 'Description is required').isEmpty(),
  check('domain', 'Domain name is required').isEmpty(),
  check('supervisor', 'Supervisor name is required').isEmpty(),
  check('type', 'Type is required').isEmpty(),
  ] , function(req, res){
	var errors = validationResult(req);
	topicModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('AdminTopicUpdate', {topic: result[0], error:errors.mapped()});
	});
});*/


router.get('/AdminTopicUpdate/:id', [
  check('name', 'Topic name is required').isEmpty(),
  check('description', 'Description is required').isEmpty(),
  check('type', 'Type is required').isEmpty(),
  check('domain', 'Domain name is required').isEmpty(),
  check('supervisor', 'Supervisor name is required').isEmpty()
  ] , function(req, res){
  	console.log('Topic Update requested!');
  	var errors = validationResult(req);
	domainModel.getAllDomains(function(domainResults){
		if(domainResults.length > 0){
			teacherModel.getAllActiveTeachers(function(teacherResults){
				if(teacherResults.length > 0){
					//console.log(domainResults);
					//console.log(teacherResults);
		    		//res.render('AdminOfferTopic', {domainlist: domainResults,teacherlist: teacherResults,error:errors.mapped()});
		    		typeModel.getAllResearchType(function(typeResults){
						if(typeResults.length > 0){
							
				    		subDomainModel.getById(req.params.id, function(topicresult){

								res.render('admin/AdminTopicUpdate', {topic: topicresult[0],domainlist: domainResults,typelist: typeResults,teacherlist: teacherResults,error:errors.mapped()});
							});
						}else{
							res.render('admin/AdminTopicUpdate', {topic: topicresult[0],domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});
						}
					});
				}else{
					res.render('admin/AdminTopicUpdate', {topic: topicresult[0],domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});
				}
			});
		}else{
			res.render('admin/AdminTopicUpdate', {topic: topicresult[0],domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});

		}
	});
})

router.post('/AdminTopicUpdate/:id', [
  check('name', 'Topic name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('type', 'Type is required').not().isEmpty(),
  check('domain', 'Domain name is required').not().isEmpty(),
  check('supervisor', 'Supervisor name is required').not().isEmpty()
  ], function(req, res){
	

	var topic = {
		name: req.body.name,
		description: req.body.description,
		domain: req.body.domain,
		supervisor: req.body.supervisor,
		type: req.body.type,
		id: req.params.id
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
    	//console.log(errors.mapped());
    	//var allErrors = errors.mapped();
    	//console.log(allErrors);
    	var topics = matchedData(req);
    	console.log(topics);
    	subDomainModel.getById(req.params.id, function(topicresult){

			res.render('admin/AdminTopicUpdate', {topic: topics,domainlist: domainResults,typelist: typeResults,teacherlist: teacherResults,error:errors.mapped()});
		});
    }else{
		subDomainModel.updateSubDomain(topic, function(status){
			console.log(status);
			if (status) {
				res.redirect('/AdminTopicDetails');
			}else{
				res.redirect('/AdminTopicDetails/AdminTopicUpdate/'+req.params.id);
			}	
		});
	}
});


router.get('/AdminTopicDelete/:id', function(req, res){
	
	subDomainModel.getFullById(req.params.id, function(result){
		console.log(result);
		res.render('admin/AdminTopicDelete', {topicDel: result[0]});
	});
});

router.post('/AdminTopicDelete/:id', function(req, res){
	
	console.log(req.params.id);
	groupModel.deleteGroup(req.params.id, function(status){
		if(status){
			subDomainModel.deleteSubDomain(req.params.id, function(status1){
				if(status1){
					console.log(status1);
					res.redirect('/AdminTopicDetails');
				}else{
					res.redirect('/AdminTopicDelete/'+req.params.id);
				}
			});
		}else{
			res.redirect('/AdminTopicDelete/'+req.params.id);
		}
	});
});

module.exports = router;	
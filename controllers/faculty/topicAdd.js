var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var thesisTypeModel = require.main.require('./models/facultyThesisTypeModel');
var domainModel = require.main.require('./models/facultyDomainModel');
var subdomainModel = require.main.require('./models/facultySubDomainModel');
var facultyModel = require.main.require('./models/facultyFacultyModel');
var researchGroupModel = require.main.require('./models/facultyResearchGroupModel');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});




router.get('/',[
	check('topicName', 'Topic is required').isEmpty(),
	check('type', 'last name is required').isEmpty(),
	check('domain', 'domain is required').isEmpty(),
	check('topicDes', 'Details must required').isEmpty()
	]
	,function(req,res){
		var errors = validationResult(req);
		thesisTypeModel.getAll(null,function(type_details) {
			if (type_details==null) {
				res.send("No type found");
			}
			else
			{
				domainModel.getAll(null,function(domain_details) {
					if (domain_details==null) {
						res.send("No domain found");
					}
					else
					{
						facultyModel.getByID(req.cookies['username'],function(faculty) {
							if (faculty==null) {
								res.send("No supervisor found");
							}
							else
							{
								res.render('faculty/topicAdd',{
								userid:req.cookies['username'],
								error:errors.mapped(),
								type:type_details,
								domain:domain_details,
								supervisor:faculty
								});
							}
						});
						
					}
				});
				
			}
		});
});


router.post('/',[
	check('topicName', 'Topic is required').notEmpty(),
	check('type', 'last name is required').notEmpty(),
	check('domain', 'domain is required').notEmpty(),
	check('topicDes', 'Details must required').notEmpty()
	]
	,function(req,res){
		var errors = validationResult(req);
		var data = {
			topicName: req.body.topicName,
			type: req.body.type,
			domain: req.body.domain,
			supervisor: req.body.supervisor,
			topicDes: req.body.topicDes,
		};
		if (!errors.isEmpty())
		{
			res.send("null submission");
		}
		else
		{
			subdomainModel.insert(data,function(status) {
				if (status) {
					researchGroupModel.insert(null,function(status1) {
						if (status1) {
							res.redirect('/viewTopic');
						}
						else
						{
							res.send("Somthing wrong. Please try again");
						}
					});
				}
				else
				{
					res.send("Somthing wrong. Please try again");
				}
			})
		}

	});

module.exports = router;
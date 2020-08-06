var express = require('express');
var router = express.Router();
const studentTopic= require.main.require('./models/StudentTopicModel');
const studentFaculty= require.main.require('./models/StudentFacultyModel');
const studentDomain= require.main.require('./models/StudentDomainModel');
const thesisType= require.main.require('./models/StudentThesisTypeModel');
const studentGroup= require.main.require('./models/StudentGroupModel');
const thesisApplied= require.main.require('./models/StudentThesisApplied');


router.get('*',function(req,res,next){
	if(req.cookies['username']!=null){
		next();
	}else{
		res.redirect('/login');
	}
});
router.get('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		console.log(req.session.sid);
		studentGroup.getAllInfo(req.session.sid,function(thesisResult){
			console.log(thesisResult);
			if(thesisResult!=null){
				studentTopic.getById(thesisResult.subDom_id,function(subDomResults){
					console.log(subDomResults);
					studentGroup.getSem(function(semResult){
						console.log(semResult);
						studentDomain.getById(subDomResults.dom_id,function(domainResult){
							console.log(domainResult);
							thesisType.getById(subDomResults.type_id,function(typeResult){
								console.log(typeResult);
								studentFaculty.getById(subDomResults.fid,function(facultyResult){
									console.log(facultyResult);
									var data={
										name: req.cookies['username'],
										thesisResult:thesisResult,
										subDomResults:subDomResults,
										semResult:semResult,
										domainResult:domainResult,
										typeResult:typeResult,
										facultyResult:facultyResult
										}
										console.log('myResearch page requested!');
									
										res.render('student/myResearch/index',data);
									});
								});
							});
						});
				});
			}else{
				var data={
					name: req.cookies['username'],
					thesisResult:null,
					subDomResults:null,
					semResult:null,
					domainResult:null,
					typeResult:null,
					facultyResult:null
					}
					console.log('myResearch page requested!');
				
					res.render('student/myResearch/index',data);
			}
			//console.log(result);
		})
		
	}else{
		res.redirect('/logout');
	}
});

/*router.post('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		var data={
		name: req.cookies['username']
		}
		console.log('login page requested!');
	
		res.render('home',data);
	}else{
		res.redirect('/logout');
	}
});*/


module.exports = router;
var express = require('express');
var router = express.Router();
const studentTopic= require.main.require('./models/StudentTopicModel');
const studentFaculty= require.main.require('./models/StudentFacultyModel');
const studentDomain= require.main.require('./models/StudentDomainModel');
const thesisType= require.main.require('./models/StudentThesisTypeModel');
const studentGroup= require.main.require('./models/StudentGroupModel');
const thesisApplied= require.main.require('./models/StudentThesisApplied');

//const model_group= require.main.require('./models/model_group');

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
		thesisApplied.getBySId(req.session.sid,function(check){
			console.log('ABCD');
			console.log(check);
			if(check!=null){
				studentTopic.getAll(function(topicResults){
					if(topicResults){
						studentFaculty.getById(topicResults[0].fid, function(facultyResult){
							if(facultyResult){
								studentDomain.getById(topicResults[0].dom_id, function(domainResult){
									if(domainResult){
										thesisType.getById(topicResults[0].type_id, function(thesisTypeResult){
											if(thesisTypeResult){
												res.render('student/topics/index',{name:req.cookies['username'], user:topicResults, fac:facultyResult, dom:domainResult, type:thesisTypeResult, check:1});
												console.log(facultyResult);
											}else{
												res.render('student/topics/index',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:1});
											}
										});
									}else{
										res.render('student/topics/index',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:1});
									}
								});
							}else{
								res.render('student/topics/index',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:1});
							}
						});
					}else{
						res.render('student/topics/index',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:1});
					}
				});
			}else if(check==null){
				studentTopic.getAll(function(topicResults){
					if(topicResults){
						studentFaculty.getById(topicResults[0].fid, function(facultyResult){
							if(facultyResult){
								studentDomain.getById(topicResults[0].dom_id, function(domainResult){
									if(domainResult){
										thesisType.getById(topicResults[0].type_id, function(thesisTypeResult){
											if(thesisTypeResult){
												res.render('student/topics/index',{name:req.cookies['username'], user:topicResults, fac:facultyResult, dom:domainResult, type:thesisTypeResult, check:null});
												console.log(facultyResult);
											}else{
												res.render('student/topics/index',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:null});
											}
										});
									}else{
										res.render('student/topics/index',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:null});
									}
								});
							}else{
								res.render('student/topics/index',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:null});
							}
						});
					}else{
						res.render('student/topics/index',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:null});
					}
				});
			}
		});
		console.log('topic page requested!');
		
		
	}else{
		res.redirect('/logout');
	}
});

router.get('/topicDetails/:id',function(req,res){
	if(req.cookies['username']!=null)
	{
		thesisApplied.getBySId(req.session.sid,function(check){
			console.log('ABCD');
			console.log(check);
			if(check!=null){
				studentTopic.getById(req.params.id,function(topicResult){
					studentFaculty.getById(topicResult.fid, function(facultyResult){
						if(facultyResult){
							studentDomain.getById(topicResult.dom_id, function(domainResult){
								if(domainResult){
									thesisType.getById(topicResult.type_id, function(thesisTypeResult){
										if(thesisTypeResult){
											res.render('student/topics/topicDetails',{name:req.cookies['username'], user:topicResult, fac:facultyResult, dom:domainResult, type:thesisTypeResult, check:1});
											console.log(facultyResult);
										}else{
											res.render('student/topics/topicDetails',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:1});
										}
									});
								}else{
									res.render('student/topics/topicDetails',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:1});
								}
							});
						}else{
							res.render('student/topics/topicDetails',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:1});
						}
					});
				});
			}else if(check==null){
				studentTopic.getById(req.params.id,function(topicResult){
					studentFaculty.getById(topicResult.fid, function(facultyResult){
						if(facultyResult){
							studentDomain.getById(topicResult.dom_id, function(domainResult){
								if(domainResult){
									thesisType.getById(topicResult.type_id, function(thesisTypeResult){
										if(thesisTypeResult){
											res.render('student/topics/topicDetails',{name:req.cookies['username'], user:topicResult, fac:facultyResult, dom:domainResult, type:thesisTypeResult, check:null});
											console.log(facultyResult);
										}else{
											res.render('student/topics/topicDetails',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:null});
										}
									});
								}else{
									res.render('student/topics/topicDetails',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:null});
								}
							});
						}else{
							res.render('student/topics/topicDetails',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null, check:null});
						}
					});
				});
			}
		});
		/*studentTopic.getById(req.params.id,function(topicResult){
			studentFaculty.getById(topicResult.fid, function(facultyResult){
				if(facultyResult){
					studentDomain.getById(topicResult.dom_id, function(domainResult){
						if(domainResult){
							thesisType.getById(topicResult.type_id, function(thesisTypeResult){
								if(thesisTypeResult){
									res.render('student/topics/topicDetails',{name:req.cookies['username'], user:topicResult, fac:facultyResult, dom:domainResult, type:thesisTypeResult, check:0});
									console.log(facultyResult);
								}else{
									res.render('student/topics/topicDetails',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null});
								}
							});
						}else{
							res.render('student/topics/topicDetails',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null});
						}
					});
				}else{
					res.render('student/topics/topicDetails',{name:req.cookies['username'], user:null, fac:null, dom:null, type:null});
				}
			});
		});*/
		console.log('topic page requested!');
		
		
	}else{
		res.redirect('/logout');
	}
});

router.get('/apply/:id',function(req,res){
	if(req.cookies['username']!=null)
	{
		studentGroup.getById(req.params.id,function(results){
		if(results==null){
			//res.render('createGroup/myGroup',{name:req.cookies['username'], user:results});
			res.send('Wrong');
		}else{
			//console.log(user);
			studentGroup.checkById(req.params.id,function(status){
				if(status[0].status<4){
					studentGroup.getSem(function(result){
				
						user={
							topicId:req.params.id,
							groupId:results[0].group_id,
							userid:req.session.sid,
							semId:result.sem_id,
						}
						console.log(user);
						studentGroup.insert(user,function(results){
							if(results){
								res.redirect('/studentResearch');
								console.log(results);
							}else{
								res.redirect('/studentTopics');
								console.log(results);
							}
						});
					})
				}else{
					res.send('Something Wrong');
				}
			})
			/*studentGroup.getSem(function(result){
				
				user={
					topicId:req.params.id,
					groupId:results[0].group_id,
					userid:req.session.sid,
					semId:result.sem_id,
				}
				console.log(user);
				studentGroup.insert(user,function(results){
					if(results){
						res.redirect('/studentResearch');
						console.log(results);
					}else{
						res.redirect('/studentTopics');
						console.log(results);
					}
				});
			})*/
		}
		console.log(results);
		});
		console.log('topic page requested!');
		
		
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
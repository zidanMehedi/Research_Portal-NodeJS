var express = require('express');
var router = express.Router();
const path = require('path');
var subdomainModel = require.main.require('./models/facultySubDomainModel');
var studentThesisModel = require.main.require('./models/facultyStudentThesisModel');
var fileModel = require.main.require('./models/facultyFileModel');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});




router.get('/',function(req,res){
		subdomainModel.details(req.cookies['username'],function(result) {
			if (result==null) {
				res.send('No Data found');
			}
			else{
					res.render('faculty/viewTopic',{userid:req.cookies['username'],data:result});
				
			}
		});
		
});

router.get('/topicDetails/:id',function(req,res){
		studentThesisModel.detailsByGroup(req.params.id,function(result) {
			if (result==null) {
				res.send(' <center><h1>No student applied in this group</h1></center>');
			}
			else
			{
				studentThesisModel.studentInGroup(req.params.id,function(student) {
					if (student==null) {

					}
					else
					{
						fileModel.groupByfiles(req.params.id,function(up_file) {
							if (result==null) {
								res.render('faculty/topicDetails',{userid:req.cookies['username'],data:result,id:(req.params.id)-1,data1:student});
							}
							else
							{
								res.render('faculty/topicDetails',{userid:req.cookies['username'],data:result,id:(req.params.id)-1,data1:student,files:up_file});
							}
						});
						
					}
					
				});
				
			}
		});
		
});

router.get('/download/:file(*)',function(req,res){

		 var file = req.params.file;
		 var fileLocation = path.join('./public/upload/faculty',file);
		 console.log(fileLocation);
		 res.download(fileLocation, file);
});

module.exports = router;
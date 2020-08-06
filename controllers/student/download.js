var express = require('express');
var router = express.Router();
const path = require('path');
const studentFile= require.main.require('./models/StudentFilesModel');
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
		thesisApplied.getBySId(req.session.sid,function(results){
			if(results!=null){
				studentFile.getById(results.group_id,function(result)
				{
					if(result!=null){
						var data={
							name: req.cookies['username'],
							user:result
							}
							console.log('login page requested!');
						
							res.render('student/download/index',data);
					}else{
						var data={
							name: req.cookies['username'],
							user:result
							}
							console.log('login page requested!');
						
							res.render('student/download/index',data);
					}
				});
			}
		});

		
	}else{
		res.redirect('/logout');
	}
});

router.get('/download/:file(*)',function(req,res){
	if(req.cookies['username']!=null)
	{
		  var file = req.params.file;
		  var fileLocation = path.join('./public/upload/student',file);
		  console.log(fileLocation);
		  res.download(fileLocation, file); 
		
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
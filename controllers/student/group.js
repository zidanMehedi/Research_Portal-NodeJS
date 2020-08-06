var express = require('express');
var router = express.Router();

const studentTopic= require.main.require('./models/StudentTopicModel');
const studentGroup= require.main.require('./models/StudentGroupModel');
const studentModel= require.main.require('./models/StudentStudentModel');
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
			console.log(results)
		if(results!=null){
				studentGroup.getGroupInfo(results.subDom_id,function(resultss){
			//console.log(resultss[0].tid);
			res.render('student/group/myGroup',{name:req.cookies['username'], user:resultss, msg:' '});
			console.log(resultss);
		});
		}else{
			res.redirect('/group/createGroup')
		}
		//console.log(results);
		});
		console.log('topic page requested!');
		
		
	}else{
		res.redirect('/logout');
	}
});


router.get('/memberDetails/:id',function(req,res){
	if(req.cookies['username']!=null)
	{
		model_user.getById(req.params.id,function(results){
		if(results!=null){
			res.render('createGroup/memberDetails',{name:req.cookies['username'], user:results});
				console.log(results);
			}
		});
		//console.log(results);
		console.log('topic page requested!');
		
		
	}else{
		res.redirect('/logout');
	}
});

module.exports = router;
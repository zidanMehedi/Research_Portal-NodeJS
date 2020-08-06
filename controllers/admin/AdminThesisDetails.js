var express 						= require('express');
var router 							= express.Router();
var thesisModel   					= require.main.require('./models/AdminThesisModel');


router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	thesisModel.getAllThesis(function(results){
		if(results.length > 0){
			console.log('Thesis list requested!');
    		res.render('admin/AdminThesisDetails', {thesis: results});
		}else{
			res.render('admin/AdminThesisDetails', {thesis: []});
		}
	});
})


router.get('/AdminGroupDetails/:id', function(req, res){
	
	thesisModel.getGroupData(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminGroupDetails', {groupData: result});
	});
});


module.exports = router;
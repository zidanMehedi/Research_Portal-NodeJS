var express = require('express');
var router = express.Router();



router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/',function(req,res){
	
	var data={
	name: req.cookies['username'],
	}
	console.log('Home page requested!');
	res.render('admin/AdminHome',{info: data});
	
});

module.exports = router;
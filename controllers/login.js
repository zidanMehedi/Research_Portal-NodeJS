var express = require('express');
var router = express.Router();
var md5 = require('md5');
var userModel	= require.main.require('./models/StudentUserModel');


router.get('/',function(req,res){
	console.log('login page requested!');
	res.render('login',{error:null});
});

router.post('/', function(req, res){
	
	var today = new Date();
	var sysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var sysTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var user ={
			userid: req.body.uname,
			password: req.body.password,
		};
	userModel.getRole(user,function(result) {
		//console.log(result);
		if (result==null) {

			res.render('login', {error:' '});
		}
		else
		{
			var user ={
			userid: req.body.uname,
			password: req.body.password,
			role : result.role_name
			};
			if (user.role) {
				userModel.validate(user,function(status) {
					if (status.status && user.role=='faculty') {
						console.log(status);
						res.cookie('username', req.body.uname);
						res.cookie('token', md5(md5(req.body.password)));
						res.redirect('/home');
					}
					else if (status.status && user.role=='student') {
						res.cookie('username', req.body.uname);
						res.cookie('token', md5(md5(req.body.password)));
						req.session.sid=status.sid;
						console.log(req.session.sid);
						res.redirect("/studentHome");
						//console.log(status);
					}
					else if (status.status==1) {
						res.cookie('username', req.body.uname);
						res.cookie('token', md5(md5(req.body.password)));
						res.redirect('/AdminHome');
					}
					else{
						res.render('login', {error:'inactive'});
					}
				});
			}
			else{
				res.render('login', {error:' '});
			}
			}
	});
});

module.exports = router;
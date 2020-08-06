var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var studentThesisModel = require.main.require('./models/facultyStudentThesisModel');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/',function(req,res){
	studentThesisModel.progressLog(req.cookies['username'],function(result) {
		if (result==null) {
			res.send("No data found");
		}
		else
		{
			console.log(result);
			res.render('faculty/progressUpdate',{userid:req.cookies['username'],data:result});
		}
	});
	
});

router.get('/update/:id',[check('val', 'Must need value 0-100').isEmpty()],function(req,res){
	var errors = validationResult(req);
	var data = {
		fid : req.cookies['username'],
		gid : req.params.id
	};
	studentThesisModel.progressByGroup(data,function(result) {
		if (result==null) {
			res.send("No data found");
		}
		else
		{
			console.log(result);
			res.render('faculty/update',{userid:req.cookies['username'],data:result,error:errors.mapped()});
		}
	});
	
});



router.post('/update/:id',
	[check('val', 'Must need value 0-100').not().isEmpty()],
	function(req,res){
	var errors = validationResult(req);
	var info ={
		fid : req.cookies['username'],
		gid : req.params.id
	};

	if (!errors.isEmpty()) {
					studentThesisModel.progressByGroup(info,function(result) {
				if (result==null) {
					res.send("No data found");
				}
				else
				{
					res.render('faculty/update',{userid:req.cookies['username'],data:result,error:errors.mapped()});
				}
			});
			
		}
		else
		{
			var data ={
						value : req.body.val,
						gid : req.params.id
						};
			studentThesisModel.progressUpdate(data,function (status) {
				if (status) {
					res.redirect('/progressUpdate');
				}
				else
				{
					res.send("Somthing wrong. Please try again");
				}
			});
		}
	
});


module.exports = router;
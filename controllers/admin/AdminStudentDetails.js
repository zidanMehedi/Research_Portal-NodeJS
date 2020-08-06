var express 						= require('express');
var router 							= express.Router();
var studentModel   					= require.main.require('./models/AdminStudentModel');
var userModel   					= require.main.require('./models/AdminUserModel');
const { check, validationResult } 	= require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	studentModel.getAllStudents(function(results){
		if(results.length > 0){
			console.log('Student list requested!');
    		res.render('admin/AdminStudentDetails', {studentlist: results});
		}else{
			res.render('admin/AdminStudentDetails', {studentlist: []});
		}
	});
})


router.get('/AdminStudentUpdate/:id',[
  check('userid', 'UserID is required').isEmpty(),
  check('fname', 'First Name is required').isEmpty(),
  check('lname', 'Last Name is required').isEmpty(),
  check('email', 'Email is not valid').isEmpty(),
  check('contact', 'Contact No is required').isEmpty(),
  check('dept', 'Department Name is required').isEmpty(),
  check('credit', 'Credit is required').isEmpty(),
  check('cgpa', 'CGPA is required').isEmpty()
  ] , function(req, res){
	var errors = validationResult(req);
	studentModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('admin/AdminStudentUpdate', {student: result[0], error:errors.mapped()});
	});
});

router.post('/AdminStudentUpdate/:id', [
  check('userid', 'UserID is required').not().isEmpty(),
  check('fname', 'First Name is required').not().isEmpty(),
  check('lname', 'Last Name is required').not().isEmpty(),
  check('email', 'Email is not valid').not().isEmpty().isEmail(),
  check('contact', 'Contact No is required').not().isEmpty(),
  check('dept', 'Department Name is required').not().isEmpty(),
  check('credit', 'Credit is required').not().isEmpty(),
  check('cgpa', 'CGPA is required').not().isEmpty()
  ], function(req, res){
	
	var student = {
		userid: req.body.userid,
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		contact: req.body.contact,
		dept: req.body.dept,
		credit: req.body.credit,
		cgpa: req.body.cgpa,
		id: req.params.id
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
    	console.log(errors.mapped());
    	//var allErrors = errors.mapped();
    	//console.log(allErrors);
    	var students = matchedData(req);
    	console.log(students);
    	studentModel.getById(req.params.id, function(result){
			res.render('admin/AdminStudentUpdate', {student: students, error:errors.mapped()});
		});
    }else{
		studentModel.updateStudent(student, function(status){
			console.log(status);
			if (status) {
				res.redirect('/AdminStudentDetails');
			}else{
				res.redirect('/AdminStudentDetails/AdminStudentUpdate/'+req.params.id);
			}	
		});
	}
});


router.get('/AdminStudentDelete/:id', function(req, res){
	
	studentModel.getByUserId(req.params.id, function(result){
		//console.log(result);
		res.render('admin/AdminStudentDelete', {studentDel: result[0]});
	});
});


router.post('/AdminStudentDelete/:id', function(req, res){
	console.log(req.params.id);
	studentModel.deleteStudent(req.params.id, function(status){
		if(status){
			console.log(status);
			userModel.deleteUser(req.params.id, function(status1){
				if(status1){
					console.log(status1);
					res.redirect('/AdminStudentDetails');
				}else{
					res.redirect('/AdminStudentDelete/'+req.params.id);
				}
			});
		}else{
			res.redirect('/AdminStudentDelete/'+req.params.id);
		}
	});
});

module.exports = router;
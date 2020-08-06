var db = require('./db');

module.exports ={
	getById: function(userid, callback){
		var sql = "SELECT * FROM `student` WHERE student_id=?";
		db.getResult(sql, [userid], function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from student where userid=? and password=?";
		db.getResult(sql, [user.userid,user.userid], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from student";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO student (`sid`, `student_id`, `student_fname`, `student_lname`, `student_email`, `student_contact`, `student_credit`, `student_cgpa`, `student_regDate`, `student_dept`, `status`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql,['',user.userid,user.fname,user.lname,user.email,user.contact,user.credit,user.cgpa,user.regDate,user.dept,user.status], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from student values";
		db.execute(sql, [],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update student set student_fname=?, student_lname=?, student_contact=?, student_dept=?, student_cgpa=?, student_credit=? where student_id=?";
		db.execute(sql, [user.student_fname,user.student_lname,user.student_contact,user.student_dept,user.student_cgpa,user.student_credit,user.student_id],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
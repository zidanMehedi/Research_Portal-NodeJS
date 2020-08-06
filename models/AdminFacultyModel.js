var db = require('./db');

module.exports ={
	getByUserId: function(id, callback){
		var sql = "select * from faculty where faculty_id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	/*updateOwnProfile: function(user, callback){
		var sql = "update teachers set fname=?, lname=?, contact=?, dept=? where userid=?";
		db.execute(sql, [user.fname, user.lname, user.contact, user.dept, user.userid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},*/

	addTeacher: function(user, callback){
		var sql = "insert into faculty values(?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, user.userid, user.fname, user.lname, user.email, user.contact, user.regDate, user.dept, user.status], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	getAllTeachers:function(callback){
		var sql = "select * from faculty";
		db.getResult(sql, null, function(results){
			
			callback(results);

		});
	},

	getAllActiveTeachers:function(callback){
		var sql = "select * from faculty where status = 1";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	getAllInactiveTeachers:function(callback){
		var sql = "select * from faculty where status = 0";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	getById: function(id, callback){
		var sql = "select * from faculty where fid=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	updateTeacher: function(user, callback){
		var sql = "update faculty set faculty_id=?, faculty_fname=?, faculty_lname=?, faculty_email=?, faculty_contact=? where fid=?";
		db.execute(sql, [user.userid, user.fname, user.lname, user.email, user.contact, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteTeacher: function(id, callback){
		var sql = "delete from faculty where faculty_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	blockTeacher: function(id, callback){
		var sql = "update faculty set status = 0 where fid=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	unblockTeacher: function(id, callback){
		var sql = "update faculty set status = 1 where fid=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}
var db = require('./db');

module.exports ={
	getByUserId: function(id, callback){
		var sql = "select * from verification where userid=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	getAllPendingStudents:function(callback){
		var sql = "select verification.sid, student.student_id, verification.ver_fileName from verification,student where verification.sid=student.sid";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	getById: function(id, callback){
		var sql = "select * from verification where id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	deletePendingStudent: function(id, callback){
		var sql = "delete from verification where sid=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	
}
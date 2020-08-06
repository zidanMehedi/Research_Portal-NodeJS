var db = require('./db');

module.exports ={
	getById: function(userid, callback){
		var sql = "select * from research_group where subDom_id=?";
		db.getResult(sql, [userid], function(result){

			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	checkById: function(userid, callback){
		var sql = "SELECT subDom_id,COUNT(*) `status` FROM `student_thesis` WHERE subDom_id=?";
		db.getResult(sql, [userid], function(result){

			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
	},
	getByGroupId: function(userid, callback){
		var sql = "select * from research_group where group_id=(select group_id from research_group where subDom_id=?)";
		db.getResult(sql, [userid], function(result){

			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from research_group";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getAllInfo:function(sid,callback){
		var sql = "select * from student_thesis where sid=?";
		db.getResult(sql, [sid], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getGroupInfo:function(sid,callback){
		var sql = "SELECT * FROM `student_thesis`,`student` WHERE student_thesis.sid=student.sid and student_thesis.subDom_id=?";
		db.getResult(sql, [sid], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},

	getSem:function(callback){
		var sql = "SELECT * FROM `semester` WHERE sem_status=1 ORDER BY sem_id desc LIMIT 1";
		db.getResult(sql, null, function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO student_thesis VALUES (?,?,?,?,?,?,?,?,?)";
		db.execute(sql,[null,user.groupId,user.userid,user.semId,user.topicId,null,null,0,0], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from research_group where id =?";
		db.execute(sql, [user.userid],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update research_group set tid=? where group_id=?";
		db.execute(sql, [user.topicId,user.groupId],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
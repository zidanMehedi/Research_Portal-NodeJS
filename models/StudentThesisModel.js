var db = require('./db');

module.exports ={
	getByGId: function(id, callback){
		var sql = "select * from student_thesis where group_id=?";
		db.getResult(sql, [id], function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from student_thesis where sid=?";
		db.getResult(sql, [id], function(result){

			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from student_thesis";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	/*insert: function(topic, callback){
		var sql = "insert into topic values (?,?,?,?)";
		db.execute(sql, [null,topic.uname,topic.password,topic.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},*/
	/*delete: function(id, callback){
		var sql = "delete from topic where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},*/
	/*update: function(topicUpdate, callback){
		var sql = "update topic set topicname=?, password=? where id=?";
		db.execute(sql,[topicUpdate.uname,topicUpdate.password,topicUpdate.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}*/
}
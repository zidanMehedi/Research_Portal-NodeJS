var db = require('./db');

module.exports ={
	getById: function(userid, callback){
		var sql = "select * from student_thesis where subDom_id=?";
		db.getResult(sql, [userid], function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},

	getBySId: function(userid, callback){
		var sql = "select * from student_thesis where sid=?";
		db.getResult(sql, [userid], function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	
	/*update: function(user, callback){
		var sql = "update student_thesis set tid=? where group_id=?";
		db.execute(sql, [user.topicId,user.groupId],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}*/
}
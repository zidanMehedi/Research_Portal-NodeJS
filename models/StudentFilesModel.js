var db = require('./db');

module.exports ={
	getById: function(userid, callback){
		var sql = "select * from file where group_id=?";
		db.getResult(sql, [userid], function(result){

			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from file";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO file VALUES (?,?,?)";
		db.execute(sql,[null,user.file,user.groupId], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from file where group_id =?";
		db.execute(sql, [user.userid],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update files set fileName=? where group_id=?";
		db.execute(sql, [user.file,user.userid],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
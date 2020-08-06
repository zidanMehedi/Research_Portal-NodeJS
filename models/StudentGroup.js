var db = require('./db');

module.exports ={
	getById: function(userid, callback){
		var sql = "select * from research_group where userid=?";
		db.getResult(sql, [userid], function(result){

			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
	},
	getByGroupId: function(userid, callback){
		var sql = "select * from research_group where group_id=(select group_id from research_group where userid=?)";
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

	getMaxId:function(callback){
		var sql = "SELECT group_id FROM `research_group` order by group_id desc";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO research_group VALUES (?,?,?,?,?,?)";
		db.execute(sql,[null,user.groupId,user.userid,user.topicId,user.external,'inactive'], function(status){
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
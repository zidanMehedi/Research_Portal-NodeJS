var db = require('./db');

module.exports ={
	
	getAllType:function(callback){
		var sql = "select * from thesis_type";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	getById: function(id, callback){
		var sql = "select * from thesis_type where type_id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	addType: function(type, callback){
		var sql = "insert into thesis_type values(?,?)";
		db.execute(sql, [null, type.name], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	updateType: function(type, callback){
		var sql = "update thesis_type set type_name=? where type_id=?";
		db.execute(sql, [type.name, type.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteType: function(id, callback){
		var sql = "delete from thesis_type where type_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}
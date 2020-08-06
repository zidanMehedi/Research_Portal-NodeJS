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

	getAll:function(callback){
		var sql = "select * from faculty";
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

}
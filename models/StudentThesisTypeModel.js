var db = require('./db');

module.exports ={
	
	getAll:function(callback){
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

}
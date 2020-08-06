var db = require('./db');

module.exports ={
	
	getAll:function(callback){
		var sql = "select * from domain_research";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	getById: function(id, callback){
		var sql = "select * from domain_research where dom_id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	getBySubId: function(id, callback){
		var sql = "select * from domain_research where subDom_id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},
}
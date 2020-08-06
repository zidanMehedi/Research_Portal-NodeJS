var db = require('./db');

module.exports ={

	getById: function(id, callback){
		var sql = "select * from research_group where group_id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	getAllGroupsNumbers: function(callback){
		var sql = "select * from research_group";
		db.getResult(sql, null, function(result){
			callback(result);
		});
	},		

	addGroup: function(grp, callback){
		var sql = "insert into research_group values(?,(select max(subDom_id) from sub_domain))";
		db.execute(sql, [null], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteGroup: function(id, callback){
		var sql = "delete from research_group where subDom_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}
var db = require('./db');

module.exports ={
	
	getAllDomains:function(callback){
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

	addDomain: function(domain, callback){
		var sql = "insert into domain_research values(?,?,?)";
		db.execute(sql, [null, domain.name, domain.des], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	updateDomain: function(domain, callback){
		var sql = "update domain_research set dom_name=?, dom_desc=? where dom_id=?";
		db.execute(sql, [domain.name, domain.des, domain.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteDomain: function(id, callback){
		var sql = "delete from domain_research where dom_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}
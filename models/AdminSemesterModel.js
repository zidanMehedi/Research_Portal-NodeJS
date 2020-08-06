var db = require('./db');

module.exports ={
	
	getAllSemester:function(callback){
		var sql = "select * from semester";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	getById: function(id, callback){
		var sql = "select * from semester where sem_id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	addSemester: function(sem, callback){
		var sql = "insert into semester values(?,?,?)";
		db.execute(sql, [null, sem.name, 1], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	getLastId:function(callback){
		var sql = "select max(sem_id) 'last' from semester";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	makeSemesterInactive: function(id, callback){
		var sql = "update semester set sem_status= 0 where sem_id!=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	updateSemester: function(sem, callback){
		var sql = "update semester set sem_name=? where sem_id=?";
		db.execute(sql, [sem.name, sem.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteSemester: function(id, callback){
		var sql = "delete from semester where sem_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}
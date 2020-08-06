var db = require('./db');

module.exports ={
		insert: function (data,callback) {
			var sql = "INSERT INTO file values (?,?,?)";
			db.execute(sql, [null,data.fileName,data.gid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
		},
		groupByfiles : function (id,callback) {
			var sql = "Select * from file where group_id=?";
			db.getResult(sql, id, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
		},

		getVeriFiles : function (id,callback) {
			var sql = "Select * from student";
			db.getResult(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
		}
}
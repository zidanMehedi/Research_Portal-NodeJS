var db = require('./db');

module.exports ={
		getAll : function (id,callback) {
			var sql = "Select * from thesis_type";
			db.getResult(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
		}
}
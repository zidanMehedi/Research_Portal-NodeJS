var db = require('./db');

module.exports ={
		getAll : function (id,callback) {
			var sql = "Select * from domain_research";
			db.getResult(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
		}
}
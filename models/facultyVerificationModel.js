var db = require('./db');

module.exports ={
		getVeriFiles : function (id,callback) {
			var sql = "Select ver_fileName from verification where ver_id=?";
			db.getResult(sql, id, function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
		}
}
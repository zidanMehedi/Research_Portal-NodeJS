var db = require('./db');

module.exports ={
		insert : function (data,callback) {
			var sql = "INSERT INTO research_group values (?,(select max(subDom_id) from sub_domain))";
			db.execute(sql, [null], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
		}		
}
var db = require('./db');

module.exports ={

	addFile: function(file, callback){
		var sql = "insert into file values(?,?,?)";
		db.execute(sql, [null, file.fileName, file.group_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}

}
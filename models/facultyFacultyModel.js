var db = require('./db');

module.exports ={
		getByID : function (id,callback) {
			var sql = "Select * from faculty where faculty_id=?";
			db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
		},
		update : function (data,callback) {
			var sql = "Update faculty SET faculty_fname=? ,faculty_lname=? ,faculty_contact=? ,faculty_email=? where faculty_id=?";
			db.execute(sql, [data.fname,data.lname,data.contact,data.email,data.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
		}
}
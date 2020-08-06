var db = require('./db');

module.exports ={
	validate: function(user, callback){
		var sql = "";
		if (user.role=='admin') {
				sql	="select count(*) 'status' from user where user_id_name=? and password=? and rid=1";
		}
		else if(user.role=='faculty')
		{
				sql ="SELECT * from faculty where faculty_id = (select user_id_name from user where user_id_name =? AND password = ? AND rid =2)"
		}
		else
		{
			sql="SELECT * from student where student_id = (select user_id_name from user where user_id_name =? AND password =? AND rid =3)";
		}
		console.log(sql);
		db.getResult(sql, [user.userid, user.password], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getRole: function (id,callback) {
		var sql = "SELECT role_name FROM role,user where role.rid=user.rid and user.user_id_name=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getPassword : function(id,callback) {
		var sql ="select password from user where user_id_name=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	updatePassword: function (data,callback) {
			var sql = "Update user SET password=? where user_id_name=?";
			db.execute(sql, [data.newPass,data.userid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
		},
	addUser : function (data,callback) {
			var sql = "INSERT INTO user values (?,?,?,?)";
			db.execute(sql, [null,data.userid,'aiub@'+data.fname,3], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
		}

}
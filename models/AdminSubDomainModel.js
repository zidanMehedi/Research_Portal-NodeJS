var db = require('./db');

module.exports ={
	
	getAllSubDomain:function(callback){
		var sql = "select sub_domain.subDom_id,sub_domain.subDom_name,sub_domain.subDom_desc,thesis_type.type_name,domain_research.dom_name,faculty.faculty_fname,faculty.faculty_lname from sub_domain,thesis_type,domain_research,faculty where sub_domain.type_id=thesis_type.type_id and sub_domain.dom_id=domain_research.dom_id and sub_domain.fid=faculty.fid";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	getById: function(id, callback){
		var sql = "select * from sub_domain where subDom_id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	getFullById: function(id, callback){
		var sql = "select sub_domain.subDom_name,sub_domain.subDom_desc,domain_research.dom_name,faculty.faculty_fname,faculty.faculty_lname,thesis_type.type_name from sub_domain,domain_research,thesis_type,faculty where sub_domain.dom_id=domain_research.dom_id and sub_domain.type_id=thesis_type.type_id and sub_domain.fid=faculty.fid and sub_domain.subDom_id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},


	addSubDomain: function(topic, callback){
		var sql = "insert into sub_domain values(?,?,?,?,?,?)";
		db.execute(sql, [null, topic.name, topic.description, topic.type, topic.domain, topic.supervisor], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteSubDomain: function(id, callback){
		var sql = "delete from sub_domain where subDom_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	updateSubDomain: function(topic, callback){
		var sql = "update sub_domain set subDom_name=?, subDom_desc=?, type_id=?, dom_id=?, fid=? where subDom_id=?";
		db.execute(sql, [topic.name, topic.description, topic.type, topic.domain, topic.supervisor, topic.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

}
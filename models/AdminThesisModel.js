var db = require('./db');

module.exports ={

	allocateExternal: function(allocation, callback){
		var sql = "update student_thesis set external=?, ext_status= 1 where group_id=?";
		db.execute(sql, [allocation.external, allocation.group_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	getAllThesis:function(callback){
		var sql = "select DISTINCT student_thesis.group_id,semester.sem_name,sub_domain.subDom_name,domain_research.dom_name,student_thesis.external,student_thesis.thesis_progress,faculty.faculty_fname,faculty.faculty_lname from student_thesis,semester,sub_domain,thesis_type,domain_research,faculty where student_thesis.sem_id=semester.sem_id and student_thesis.subDom_id=sub_domain.subDom_id and sub_domain.type_id=thesis_type.type_id and sub_domain.dom_id=domain_research.dom_id and sub_domain.fid=faculty.fid";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	getGroupData:function(id,callback){
		var sql = "select student_thesis.group_id,student.student_id,student.student_fname,student.student_lname,student.student_email,student.student_contact,student.student_dept from student_thesis,student where student_thesis.sid=student.sid and student_thesis.group_id=?";
		db.getResult(sql, [id], function(results){
			callback(results);
		});
	},
}
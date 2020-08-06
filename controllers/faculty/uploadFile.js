var express 	= require('express');
var router 		= express.Router();
const multer 	= require('multer');
const path 		= require('path');
var subdomainModel = require.main.require('./models/facultySubDomainModel');
var fileModel = require.main.require('./models/facultyFileModel');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});




router.get('/',function(req,res){
		var data={
		name: req.cookies['username']
		};
		subdomainModel.groupWise(data.name,function(result) {
			if (result==null) {

			}
				else
				{
					res.render('faculty/uploadFile',{name:data.name,data:result});
				}
			
		});
		
});

var today = new Date();
var sysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


const storage = multer.diskStorage({
  destination: './public/upload/faculty/',
  filename: function(req, file, cb){
    cb(null,path.basename(file.originalname,path.extname(file.originalname)) + '__' + req.cookies['username'] + '__' + sysDate + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 5767168},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('file');

function checkFileType(file, cb){
  
  const filetypes = /pdf|doc|docs/;
  
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: PDF, DOC & DOCS File Only!');
  }
}



router.post('/', function(req,res){
		subdomainModel.groupWise(req.cookies['username'],function(result){
			if (result==null) {

			}
			else
			{
				upload(req, res, function(err){
                if(err){
                  res.render('faculty/uploadFile', {
                    msg: err,
                    data:result,
                    name: req.cookies['username']
                  });
                } else {
                  if(req.file == undefined){
                    res.render('faculty/uploadFile', {
                      msg: 'Error: No File Selected!',
                      name: req.cookies['username'],data:result
                    });
                  } else {
                    var data ={
                        fileName: req.file.filename,
                        gid: req.body.gid
                    }
                    console.log(data);
                    fileModel.insert(data, function(status){
                        if (status) {
                            res.render('faculty/uploadFile', {
                                msg: 'File Uploaded!',
                                name: req.cookies['username'],
                                data:result
                        });
                        }else{
                            res.render('faculty/uploadFile', {
                                msg: 'File Not Uploaded!',
                                name: req.cookies['username'],
                                data:result
                        });
                        }
                    });
                  }
                }
              });
			}
            
		});
            
 });





module.exports = router;
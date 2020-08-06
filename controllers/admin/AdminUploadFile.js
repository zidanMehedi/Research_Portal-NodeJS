var express               = require('express');
var router                = express.Router();
const multer              = require('multer');
const path                = require('path');
var groupModel            = require.main.require('./models/AdminGroupModel');

var fileModel   = require.main.require('./models/AdminFileModel');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/',function(req,res){
	console.log('Upload file page requested!');
	groupModel.getAllGroupsNumbers(function(groupResults){
        console.log(groupResults);
        if(groupResults.length > 0){
            res.render('admin/AdminUploadFile', {grouplist: groupResults});
        }else{
            res.render('admin/AdminUploadFile', {grouplist: []});
        }
    });
});


var today = new Date();
var sysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//var sysTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


const storage = multer.diskStorage({
  destination: './public/upload/admin/',
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
  //console.log(file.mimetype);
  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: PDF, DOC & DOCS File Only!');
  }
}

router.post('/', function(req,res){
    groupModel.getAllGroupsNumbers(function(groupResults){
        console.log(groupResults);
        if(groupResults.length > 0){
            upload(req, res, function(err){
                if(err){
                  res.render('admin/AdminUploadFile', {
                    msg: err,
                    grouplist: groupResults
                  });
                } else {
                  if(req.file == undefined){
                    res.render('admin/AdminUploadFile', {
                      msg: 'Error: No File Selected!',
                      grouplist: groupResults
                    });
                  } else {
                    var fileDB ={
                        fileName: req.file.filename,
                        group_id: req.body.group_id
                    }
                    fileModel.addFile(fileDB, function(status){
                    console.log(status);
                        if (status) {
                            res.render('admin/AdminUploadFile', {
                                msg: 'File Uploaded!',
                                //file: 'public/upload/admin/${req.file.filename}',
                                grouplist: groupResults
                        });
                        }else{
                            res.render('admin/AdminUploadFile', {
                                msg: 'File Not Uploaded!',
                                grouplist: groupResults
                        });
                        }
                    });
                    //console.log(req.file.filename);
                  }
                }
              });
        }else{
            res.render('admin/AdminUploadFile', {msg:"Error",grouplist: []});
        }
    });
            
 });

module.exports = router;
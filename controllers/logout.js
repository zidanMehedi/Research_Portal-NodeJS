const express = require('express');
const router = express.Router();


router.get('/',function(req,res){
	res.clearCookie('username');
	res.clearCookie('token');
	req.session.sid=null;
	res.redirect('/login');
});

module.exports = router;
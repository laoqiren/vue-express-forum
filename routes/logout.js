var express = require('express');
var router = express.Router();
var checkNotLog = require('../middleware/checkNotLog');

router.get('/',checkNotLog,function(req,res,next){
    req.session.user = null;
    res.redirect('/');
});
module.exports = router;
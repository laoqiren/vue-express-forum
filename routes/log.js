var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var checkLog = require('../middleware/checkLog');

router.post('/',checkLog,function(req,res,next){
    var name = req.body.name;
    var password = req.body.password;
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    User.prototype.get(name,function(err,user){
        if(!user){
            console.log('用户不存在');
            res.end({error:1});
            //return res.redirect('/log');
        }
        if(user.password !== password){
            console.log('登录密码错误');
            //return res.redirect('/log');
        }
        console.log('登录成功')
        req.session.user = user;
        //res.redirect('/');
    })
});
module.exports = router;
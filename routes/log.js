var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require("jwt-simple");
//var app = require("../app");
var moment = require('moment');
var User = require('../models/user');

router.post('/',function(req,res,next){
    var name = req.body.name;
    var password = req.body.password;
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    User.prototype.get(name,function(err,user){
        if(!user){
            console.log('用户不存在');
            res.status(500);
            res.send({error:1});
            //return res.redirect('/log');
        }
        if(user.password !== password){
            console.log('登录密码错误');
            res.status(500);
            res.send({error:2});
            //return res.redirect('/log');
        }
        var expires = moment().add(7,'days').valueOf();
        var token = jwt.encode({
            iss: user.name,
            exp: expires
        }, req.app.get('jwtTokenSecret'));
        res.status(200);
        res.json({
            token : token,
            expires: expires,
            user:{
                    name:user.name
                }
        });
        console.log('登录成功');
        //req.session.user = user;
        //res.redirect('/');
    })
});
module.exports = router;
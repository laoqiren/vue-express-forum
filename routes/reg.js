var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var moment = require('moment');
var jwt = require("jwt-simple");
//var app = require("../app");
var User = require('../models/user');

router.post('/',function(req,res,next){
    console.log('提交注册了');
    var name = req.body.name;
    var password = req.body.password;
    console.log(name,password);
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    var userEntity = new User();
    userEntity.getUser({
        name:name
    },function(err,user){
        if(err){
            console.log('err');
            return res.end();
        }
        if(user){
            console.log('用户已经存在');
            return res.end();
        }
        console.log('注册信息正确');
        userEntity.saveUser({
            name:name,
            password:password
        },function(err){
            if(err){
                console.log('注册失败');
                return res.end();
            }
            var expires = moment().add(7,'days').valueOf();
            var token = jwt.encode({
                iss: name,
                exp: expires
            }, req.app.get('jwtTokenSecret'));
            res.json({
                token : token,
                expires: expires,
                user:{
                    name:name
                }
                
            });
            console.log('注册完成');
        });
    });
});
module.exports = router;
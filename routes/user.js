var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var jwt = require("jwt-simple");
var User = require('../models/user');
//var app = require("../app");

router.post("/",function(req,res,next){
    var token = req.body.access_token;
    if(token){
        try{
            var decoded = jwt.decode(token,req.app.get('jwtTokenSecret'));
            if(decoded.exp < Date.now()){
                return res.end('token expired',401);
            }
            var userEntity = new User();
            userEntity.getUser({
                name:decoded.iss
            },function(err,user){
                if(user){
                    res.status(200);
                    return res.json({
                        user:{
                            name:decoded.iss
                        }
                    });
                }
                res.status(401);
                return res.end();
            });
        } catch(err){
            res.status(401);
            res.send('no token');
        }
    }
});

module.exports = router;
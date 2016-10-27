var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var jwt = require("jwt-simple");
//var app = require("../app");

router.post("/",function(req,res,next){
    var token = req.body.access_token;
    if(token){
        try{
            var decoded = jwt.decode(token,req.app.get('jwtTokenSecret'));
            if(decoded.exp < Date.now()){
                res.end('token expired',401);
            }
            //console.log(decoded)
            res.status(200);
            res.json({
                user:{
                    name:decoded.iss
                }
                
            });
        } catch(err){
            res.status(401);
            res.send('no token');
        }
    }
});

module.exports = router;
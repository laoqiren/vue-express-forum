var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var moment = require('moment');
var jwt = require("jwt-simple");

router.get('/',function(req,res,next){
    Post.get(function(err,posts){
        if(err){
            res.status(404);
            res.end();
        }
        res.status(200);
        res.json({
            posts:posts
        });
    });
});
router.post('/',function(req,res,next){
    var token = req.body.access_token;
    if(token){
        try{
            var decoded = jwt.decode(token,req.app.get('jwtTokenSecret'));
            if(decoded.exp < Date.now()){
                console.log("haha")
                res.end('token expired',401);
            }
            //console.log(decoded)
             var newPost = new Post({
                name:decoded.iss,
                title:req.body.title,
                content:req.body.content
            });
            console.log(newPost);
            newPost.save(function(err,post){
                if(err){
                    console.log("发表文章失败");
                    res.status(500);
                    res.send({error:1});
                }
                console.log('发表文章成功');
            });
            res.status(200);
            res.send({});
        } catch(err){
            res.status(401);
            res.send('no token');
        }
    }
});
module.exports = router;
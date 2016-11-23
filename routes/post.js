var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var jwt = require("jwt-simple");


router.get('/',function(req,res,next){
    var postEntity = new Post();
    postEntity.get(null,function(err,posts){
        console.log("我来了");
        if(err){
            res.status(404);
            return res.end();
        } else {
            res.status(200);
            res.json({
                posts:posts
            });
        }
    });
});
router.post('/',function(req,res,next){
    var token = req.body.access_token;
    if(token){
        try{
            var decoded = jwt.decode(token,req.app.get('jwtTokenSecret'));
            if(decoded.exp < Date.now()){
                res.end('token expired',401);
                return;
            }
        }catch(err){
            res.send(401);
            res.end();
            return;
        }
        var postEntity = new Post();
        postEntity.savePost({
            name:decoded.iss,
            title:req.body.title,
            content:req.body.content
        },function(err){
            if(err){
                console.log("发表文章失败");
                res.status(500);
                res.send({error:1});
            } else {
                console.log('发表文章成功');
                res.status(200);
                res.end();
            }
        });
    } else{
        res.status(401);
        res.end();
    }
});
module.exports = router;
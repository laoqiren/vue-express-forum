var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var checkLog = require('../middleware/checkNotLog');

router.post('/',checkLog,function(req,res,next){
    var newPost = new Post({
        name:req.session.user.name,
        title:req.body.title,
        content:req.body.content
    });
    console.log(newPost);
    newPost.save(function(err,post){
        if(err){
            console.log("发表文章失败");
            //res.redirect('/post');
        }
        console.log('发表文章成功');
        //res.redirect('/');
    });
});
module.exports = router;
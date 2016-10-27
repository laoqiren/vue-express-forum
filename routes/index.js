var express = require('express');
var router = express.Router();
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.session.user)
  /*
  Post.get(function(err,posts){
    if (err) {
      posts = [];
    }
    res.render('index');
  });*/
  res.sendFile(__dirname+'/../dist/index.html');
});

module.exports = router;

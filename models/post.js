var mongoose = require('mongoose');
var db = require('./db');
var PostSchema = new mongoose.Schema({
    name:String,
    title:String,
    content:String,
    time:{}
});
PostSchema.methods.savePost = function(post,cb){
    var date = new Date();
    var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    };
    this.name = post.name;
    this.title = post.title;
    this.content = post.content;
    this.time = time;
    this.save(cb);
};

PostSchema.methods.get = function(query,cb){
    if(query===null){
        return this.model('post').find(cb);
    }
    this.model('post').find(query,cb);
};
module.exports = db.model('post',PostSchema);
/*
function Post(post){
    this.name = post.name;
    this.title = post.title;
    this.content = post.content;
}
Post.prototype.save = function(callback){
    var date = new Date();
    var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    };
    var post = {
        name:this.name,
        title:this.title,
        content:this.content,
        time:time
    };
    
    mongodb.open(function(err,db){
        if(err){
            console.log("打开文章数据库失败");
            return callback(err);
        }
        db.collection("posts",function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insert(post,function(err,post){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                mongodb.close();
                console.log("文章成功保存到数据库");
                callback(null,post);
            });
        });
    });

};*/
/*
Post.get = function(callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      mongodb.close();
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //根据 query 对象查询文章
      collection.find().toArray(function(err,docs) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        //console.log(docs)
        return callback(null,docs);//成功！以数组形式返回查询的结果
      });
    });
  });
};
*/

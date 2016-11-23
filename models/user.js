var mongoose = require("mongoose");
var db = require('./db');

var UserSchema = new mongoose.Schema({
    name: String,
    password:String
});
UserSchema.methods.saveUser = function(user,cb){
    this.name = user.name;
    this.password = user.password;
    this.save(cb);
};
UserSchema.methods.getUser = function(query,cb){
    if(query === null){
        return this.model('user').findOne(cb);
    }
    this.model('user').findOne(query,cb);
};

module.exports = db.model('user',UserSchema);
/*
function User(user){
    this.name = user.name;
    this.password = user.password;
}
User.prototype.save = function(callback){
    var user = {
        name:this.name,
        password:this.password
    };
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                return callback(err);
            }
            collection.insert(user,{
                safe:true
            },function(err,users){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,users[0]);
            });
        });
    });
};
User.prototype.get = function(name,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                return callback(err);
            }
            collection.findOne({
                name:name
            },function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,user);
            });
        });
    });
};
*/

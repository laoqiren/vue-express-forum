var mongodb = require('./db');

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
module.exports = User;
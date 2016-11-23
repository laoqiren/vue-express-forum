var mongoose = require('mongoose');
var db = require("./connect");

var PersonSchema = new mongoose.Schema({
        name:String,
        type:String,
        virtualName:{
            firstName:String,
            lastName:String
        }
    });
PersonSchema.methods.speak = function(){
    //console.log(this.name);
    console.log('virtual name:\n'+this.virtualName.fullName);
};
PersonSchema.methods.findByType = function(cb){
    return this.model('Person').find({type:this.type},cb);
};
PersonSchema.virtual('virtualName.fullName').get(function(){
    return this.virtualName.firstName + ' ' + this.virtualName.lastName;
});
PersonSchema.virtual('virtualName.fullName').set(function(fullName){
    var names = fullName.split(' ');
    this.virtualName.firstName = names[0];
    this.virtualName.lastName = names[1];
});
PersonSchema.statics.findByName = function(name,cb){
    this.find({name:name},cb);
};
var PersonModel = db.model('Person',PersonSchema);

PersonModel.findByName('Jack',function(err,person){
    if(err){
        return;
    }
    console.log('static method of schema:\n');
    console.log(person);
});

//PersonModel.find(function(err,people){
  //  console.log(people);
//})
var PersonEntity = new PersonModel({name:'laoqiren',type:'前端工程师',virtualName:{
    firstName:'luo',
    lastName:'xia'
}});
//
//PersonEntity.findByType(function(err,person){
 //   console.log(person);
//});
PersonEntity.speak();
PersonEntity.save();


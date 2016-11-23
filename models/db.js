var mongoose = require("mongoose");
var db = mongoose.createConnection('localhost','blog');
db.once('open',function(){
    console.log('we are connected to the database');
});

module.exports = db;

/*
var settings = require('../settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(settings.db,new Server(settings.host,settings.port),{
    safe:true
});
*/
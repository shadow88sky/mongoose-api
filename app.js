var express = require('express');
var app = new express();
app.listen(3000);

var schemaTest = require('./schema');
var queryFind = require('./find');

var mongoose = require('mongoose');
//test是数据库名称
mongoose.connect('mongodb://localhost/test');
//监测mongo是否连接成功
var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error;'));
db.once('open', function () {
    console.log('open')
});

/*
 Mongoose中，一切都衍生自Schema。
 Schema —— 一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，
 仅仅只是数据库模型在程序片段中的一种表现，可以说是数据属性模型(传统意义的表结构)，又或着是“集合”的模型骨架。
 允许的类型:String、Number、Date、Buffer、Boolean、Mixed、ObjectId、Array
 下面是定义:
 */
var kittySchema = mongoose.Schema({
    name: String
});

/*
 可以对Schema添加方法
 注意方法添加必须在定义Model之前
 */
kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

/*
 定义Model
 Model —— 由Schema构造生成的模型，除了Schema定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据库属性、行为的类。
 如何通过Schema来创建Model呢，如下示例：
 */
var Kitten = mongoose.model('Kitten', kittySchema);

/*
 Entity —— 由Model创建的实体，使用save方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性。
 */
var fluffy = new Kitten({ name: 'fluffy' });

//保存
//fluffy.save(function(err,fluffy){
//    if(err) return console.log(err);
//    fluffy.speak();
//});

//查看
//Kitten.find(function(err,kittens){
//    if (err) return console.error(err);
//    console.log(kittens);
//})


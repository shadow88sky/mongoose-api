/*
介绍Sub Docs，即Schema下面嵌套Schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//定义子Schema
var childSchema = new Schema({ name: 'string' });
//定义父级Schema，children为子Schema的数组
var parentSchema = new Schema({
    children: [childSchema]
});

var parentModel = mongoose.model('parent', parentSchema,'parent');
var parent = new parentModel({ children: [{ name: 'Matt' }, { name: 'Sarah' }] });
parent.children[0].name = 'Matthew';
//子Schema只有在父Schema保存的时候才真正保存,另外如果子Schema保存错误，则会冒泡到父save的回调中，是一个错误单元
parent.save(function(err,docs){
    console.log(docs);
});

//查找子Schema数据，根据子Schema的id来查找
parentModel.find(function(err,doc){
    console.log(doc[0].children.id('55c173eb02c1407c19ab9304'));
});

//插入子Schema数据,要改变Mongo中的子Schame，应该先find，再push，最后save
parent.children.push({name:'xc'});
parent.save(function (err,doc) {
    if (err) return false;
    console.log(doc);
});

//删除子Schema数据
parentModel.find(function(err,doc){
    doc[0].children.id('55c173eb02c1407c19ab9304').remove();
    doc[0].save(function(err,doc){console.log(err)});
})


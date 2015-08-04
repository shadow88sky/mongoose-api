/**
 * 查询数据 findById...
 */
var mongoose = require('mongoose');
var blogSchema = require('./schema').blogSchema;
var blogModel = mongoose.model('blog', blogSchema, 'blog');

/*
 1.Model.findById(id, [fields], [options], [callback])
 它只接收文档的_id作为参数，返回单个文档。
 */
blogModel.findById('55bee2ee481e0b781f97fe6f',function(err,doc){console.log('1: ' + doc)});

//2.Model.findByIdAndRemove(id, [options], [callback])  根据ID删除数据
blogModel.findByIdAndRemove('55bed0257f5b4b24220d6afa',function(err,doc){console.log('2: ' + doc)});

//3.Model.findByIdAndUpdate(id, [update], [options], [callback])  根据ID更新字段
/*options:
new:bool 为true时，返回的doc是更新过后的数据，false为旧的数据
upsert:bool 为true时，如果没有这条数据，则会新建
sort:如果返回有多条数据，则可根据sort进行排序
*/
blogModel.findByIdAndUpdate('55bee2ee481e0b781f97fe6f',{author:'xc'},{new:true},function(err,doc){console.log('3: ' + doc)});
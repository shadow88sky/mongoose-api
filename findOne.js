/**
 * 查询数据 findOne
 */
var mongoose = require('mongoose');
var blogSchema = require('./schema').blogSchema;
var blogModel = mongoose.model('blog', blogSchema, 'blog');

/*
 1.Model.findOne(conditions, [fields], [options], [callback])
 根据查询条件，返回单个文档。
 */
blogModel.findOne({title:'test'},function(err,doc){console.log('1: ' + doc)});

/*
2.Model.findOneAndRemove(conditions, [options], [callback])
 根据查询条件，查询并删除数据
 */
blogModel.findOneAndRemove({title:'test'},function(err,doc){console.log('2: ' + doc)});

/*
3.Model.findOneAndUpdate([conditions], [update], [options], [callback])
 根据查询条件，查询并更新数据
 options与findByIdAndUpdate一样，就是多了个select的参数，指返回的数据只需要哪些栏位(字符串，栏位名以空格隔开)
 */
blogModel.findOneAndUpdate({title:'test'},{author:'cc'},{new:true,select:'body title'},function(err,doc){console.log('3: ' + doc)});
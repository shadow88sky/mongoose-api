var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义schema
var blogSchema = new Schema({
    title: String,
    author: String,
    body: {type: String},
    comments: [
        { body: String, date: Date }
    ],
    date: { type: Date, default: Date.now }, //dafault:默认值
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
}, {versionKey: false});//这个就是处理掉自动插入文档的__v这个属性);
exports.blogSchema = blogSchema;


var blogModel = mongoose.model('blog', blogSchema, 'blog');
//给schema添加新的字段
blogSchema.add({testCloumn: String});

//插入时，多加了新字段的值
blogModel.create(
     {title: 'test', author: 'xc', body: 'tesdsfdsft', comments: [
         {body: 'cc', date: new Date()}
     ], hidden: true, meta: {votes: 1, favs: 2}, testCloumn: 'test'}
     , function (err, doc) {
         if (err) return console.log(err);
         console.log(doc);
     });

//查看新字段是否插入成功
blogModel.find({}, function (err, blog) {
     console.log(blog);
})
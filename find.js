/**
 * 查询数据
 * Model.find(conditions, [fields], [options], [callback])
 */
var mongoose = require('mongoose');
var blogSchema = require('./schema').blogSchema;
var blogModel = mongoose.model('blog', blogSchema, 'blog');

//1.取author的值为'xc'的数据
blogModel.find({author: 'xc'}, function (err, doc) {
    console.log('1:　' + doc);
});

//2.取date大于2015-08-01的值($gt(>))、 ($lt(<))、$lte(<=)、$gte(>=))
blogModel.find({date: {$gt: '2015-08-01'}}, function (err, doc) {
    console.log('2: ' + doc)
});

//3.取body包含'tesdsfdsft'的数据($in)注意in是数组  、不包含($ne)
blogModel.find({body: {$in: ['tesdsfdsft']}}, function (err, doc) {
    console.log('3: ' + doc)
});
blogModel.find({body: {$ne: 'tesdsfdsft'}}, function (err, doc) {
    console.log('3: ' + doc)
});

//4.取  title='test' or author='cc'的值
blogModel.find({$or: [
    {title: 'test'},
    {author: 'cc'}
]}, function (err, doc) {
    console.log('4: ' + doc)
});

//5.查询title字段存在的数据
blogModel.find({title: {$exists: true}}, function (err, doc) {
    console.log('5: ' + doc)
});

//6.只取4条数据(limit)
blogModel.find({}, null, {limit: 4}, function (err, doc) {
    console.log('6: ' + doc)
});

//7.跳过3条数据(skip)
blogModel.find({}, null, {skip: 3}, function (err, doc) {
    console.log('7: ' + doc)
});

//8.按照title升序查询(sort:  1.升序 -1.降序)
blogModel.find({}, null, {sort: {title: 1}}, function (err, doc) {
    console.log('8: ' + doc)
});

//9.只查询title字段(1.需要,_id是默认返回，如果不要显示加上("_id":0)，但是，对其他不需要显示的属性且不是_id，如果设置为0的话将会抛异常或查询无果。)
blogModel.find({}, {title: 1, _id: 0}, function (err, doc) {
    console.log('9: ' + doc);
})

//10.查询body like esd
blogModel.find({body: /esd/i}, function (err, doc) {
    console.log('10: ' + doc);
})


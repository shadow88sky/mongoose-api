/*
 中间件在文档级执行，而不是模型级别。有2种类型的中间件，pre和post。可以用于init、validate、save、remove方法上
 */
var mongoose = require('mongoose');
mongoose = require('mongoose');
//test是数据库名称
mongoose.connect('mongodb://localhost/test');
//监测mongo是否连接成功
var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error;'));
db.once('open', function () {
    console.log('open')
});

var Schema = mongoose.Schema;
var preSchema = new Schema({ name: 'String', age: 'Number' });

//pre有两种类型，串行和并行
//pre在调用save方法前操作，此处是给age赋值，并且采用串行。  在我看来pre有点类似数据库里的trigger
preSchema.pre('save', function (next) {
    this.age = 28;
    next();
});
/*
 并行实例:
 var schema = new Schema(..);
 schema.pre('save', true, function (next, done) {
 // calling next kicks off the next middleware in parallel
 next();
 doAsync(done);
 });
 */
var preModel = mongoose.model('pre', preSchema, 'pre');
preModel.create({name: 'xc'}, function (err, doc) {
    console.log(doc);
})

//pre中的错误抛出
/*
schema.pre('save', function (next) {
    var err = new Error('something went wrong');
    next(err);
});
// later...
myDoc.save(function (err) {
    console.log(err.message) // something went wrong
});
*/

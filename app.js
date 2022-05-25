var express = require('express');

var app = express();


var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var user = require('./routes/user');
var province = require('./routes/province');
var voucher = require('./routes/voucher');
var product = require('./routes/product');


app.use('/user', user);
app.use('/province', province);
app.use('/voucher', voucher);
app.use('/product', product);

var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const uri = "mongodb+srv://hoanghoang:hoanghoang123@cluster0.gznnk.mongodb.net/evalley"
const options = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true
};

mongoose.connect(uri, options)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
module.exports = app;
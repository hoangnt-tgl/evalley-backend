var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
}));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


var user = require('./routes/user');
var province = require('./routes/province');
var voucher = require('./routes/voucher');
var product = require('./routes/product');
var category = require('./routes/category');

app.use('/user', user);
app.use('/province', province);
app.use('/voucher', voucher);
app.use('/product', product);
app.use('/category', category);

app.use('/', (req, res) => {
  res.send('Hello World!')
})
var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const uri = "mongodb+srv://hoanghoang:hoanghoang123@cluster0.gznnk.mongodb.net/evalley?retryWrites=true&w=majority"
const options = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true
};

mongoose.connect(uri, options)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
module.exports = app;
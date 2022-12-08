var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
require('dotenv').config();

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

var usermodel = require('./models/user');
var user = require('./routes/user');
var voucher = require('./routes/voucher');
var product = require('./routes/product');
var brand = require('./routes/brand');
var category = require('./routes/category');
var review = require('./routes/review');
// var countrycode = require('./routes/countrycode');

app.use('/user', user);
app.use('/voucher', voucher);
app.use('/product', product);
app.use('/brand', brand);
// headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }



app.use('/category', category);
app.use('/review', review);
// app.use('/country', countrycode);

app.get('/', (req, res) => {
  res.send('Hello world!')
})

module.exports = app;
var express = require('express');

var app = express();

var port = 3000;
app.set('port', port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var user = require('./routes/user');
app.use('/user', user);

module.exports = app;
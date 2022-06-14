var User = require('./user');
var Voucher = require('./voucher');
var jwt = require("jsonwebtoken");
const SECRET = process.env.EVALLEY_SECRET;

module.exports.checkLogin = function (req, res, next) {
    try {
        var cookie = req.headers.cookie.split('; ');
        var token = '';
        cookie.forEach(function (item) {
            if (item.split('=')[0] == 'token') {
                token = item.split('=')[1];
            }
        });
        var decoded = jwt.verify(token, SECRET);
        id = decoded.id;
        User.getUserById(id, function (err, user) {
            if (err) {
                res.redirect('/');
            } else {
                req.body.user = user;
                next();
            }
        });
    }
    catch (err) {
        res.redirect('/');
    }
}

module.exports.checkAdmin = function (req, res, next) {
    if (req.body.user.role == 'admin') {
        next();
    }
    else {
        res.redirect('/');
    }
}
    
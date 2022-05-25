var User = require('user');
var Voucher = require('voucher');

module.exports.checkLogin = function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}


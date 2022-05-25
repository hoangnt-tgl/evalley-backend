var express = require('express');
var router = express.Router();
var Voucher = require('../models/voucher');
var User = require('../models/user');
/* GET home page. */

router.post('/getall', function(req, res, next) {
    User.getUserById(req.body.userId, function(err, user) {
        if (err) {
            res.json(err);
        } else if (!user) {
            res.json({message: 'User not found'});
        } else {
            if (user.role == 'admin') {
                Voucher.getAllVoucher(function(err, vouchers) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(vouchers);
                    }
                });
            } else {
                Voucher.getAllVoucherByUserId(req.body.userId, function(err, vouchers) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(vouchers);
                    }
                });
            }
        }
    });
});
module.exports = router;
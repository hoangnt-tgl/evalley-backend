var express = require('express');
var router = express.Router();
var Voucher = require('../models/voucher');
var User = require('../models/user');
/* GET home page. */

router.post('/new', function(req, res, next){
    var voucher = req.body.voucher;
    Voucher.createVoucher(voucher, function(err, voucher){
        if (err) {
            res.json(err);
        } else {
            res.json(voucher)
        }
    })
})

router.post('/getall', function(req, res, next) {
    Voucher.getAllVoucher(function(err, vouchers) {
        if (err) {
            res.json(err);
        } else {
            res.json(vouchers);
        }
    });
});

router.post('/delete', function(req, res, next) {
    var selected = req.body.selected;
    Voucher.deleteVoucher(selected, function(err, vouchers) {
        if (err) {
            res.json(err);
        } else {
            res.json(vouchers);
        }
    });
});
module.exports = router;
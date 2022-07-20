var express = require('express');
var router = express.Router();
var Voucher = require('../models/voucher');
/* GET home page. */

router.post('/new', function(req, res, next){
    var voucher = new Voucher({
        title: req.body.title,
        code: req.body.code,
        discount: req.body.discount,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        freeshipping: req.body.freeshipping,
        quantity: req.body.quantity,
        status: req.body.status,
        minspend: req.body.minspend,
        maxdiscount: req.body.maxdiscount,
        category: req.body.category,
        type: req.body.type
    }) ;
    Voucher.getVoucherByCode(voucher.code, function(err, result){
        if (err) {
            res.json(err);
        } else if (result) {
            res.json({success: false, message: 'Coupon Code already exists'})
        } else {
            Voucher.createVoucher(voucher, function(err, voucher){
                if (err) {
                    res.json(err);
                } else {
                    res.json({success: true, message: 'Create Coupon success'})
                }
            })
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
            res.json({success: true, message: 'Delete successfull'});
        }
    });
});

module.exports = router;
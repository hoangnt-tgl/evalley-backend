var express = require('express');
var router = express.Router();
var Voucher = require('../models/voucher');
/* GET home page. */

router.post('/new', function (req, res, next) {
    var voucher = {
        title: req.body.title,
        code: req.body.code,
        value: req.body.value,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        freeshipping: req.body.freeshipping,
        quantity: req.body.quantity,
        minspend: req.body.minspend,
        maxdiscount: req.body.maxdiscount,
        ispercent: req.body.ispercent
    };
    Voucher.createVoucher(voucher, function (err, voucher) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(voucher);
        }
    })
})

router.get('/detail/:code', function (req, res, next) {
    var code = req.params.code
    Voucher.getVoucherByCode(code, function (err, vouchers) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(vouchers);
        }
    });
});

router.get('/getall', function (req, res, next) {
    Voucher.getAllVoucher(function (err, vouchers) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(vouchers);
        }
    });
});

// router.post('/delete', function (req, res, next) {
//     var selected = req.body.selected;
//     Voucher.deleteVoucher(selected, function (err, vouchers) {
//         if (err) {
//             res.status(500).json(err);
//         } else {
//             res.status(200).json(vouchers);
//         }
//     });
// });

module.exports = router;
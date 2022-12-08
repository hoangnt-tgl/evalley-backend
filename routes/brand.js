var express = require('express');
var router = express.Router();
var Brand = require('../models/brand');
// Lấy tất cả các brand
router.get('/getallCategory', function(req, res, next) {
    Brand.getAllBrand(function(err, brand) {
        if (err) {
            res.json(err);
        } else {
            res.json(brand);
        }
    });
});
module.exports = router;
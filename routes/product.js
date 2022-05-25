var express = require('express');
var router = express.Router();
var Product = require('../models/product');
/* GET home page. */

router.get('/getall', function(req, res, next) {
    Product.getAllProduct(function(err, products) {
        if (err) {
            res.json(err);
        } else {
            res.json(products);
        }
    });
});
module.exports = router;
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
router.get('/detail/:id', function(req, res, next) {
    Product.getProductById(req.params.id, function(err, product) {
        if (err) {
            res.json(err);
        } else {
            res.json(product);
        }
    });
});
router.get('/available', function(req, res, next) {
    Product.getProductAvailable(function(err, products) {
        if (err) {
            res.json(err);
        } else {
            res.json(products);
        }
    });
});
module.exports = router;
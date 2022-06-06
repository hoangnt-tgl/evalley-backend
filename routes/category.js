var express = require('express');
var router = express.Router();
var Category = require('../models/category');
/* GET home page. */

router.get('/getall', function(req, res, next) {
    Category.getAllCategory(function(err, categories) {
        if (err) {
            res.json(err);
        } else {
            res.json(categories);
        }
    });
});
module.exports = router;
var express = require('express');
var router = express.Router();
var Province = require('../models/province');
/* GET home page. */

router.get('/getall', function(req, res, next) {
    Province.getAllProvince(function(err, provinces) {
        if (err) {
            res.json(err);
        } else {
            res.json(provinces);
        }
    });
});
module.exports = router;
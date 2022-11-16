var express = require('express');
var router = express.Router();
var Category = require('../models/category');

// Lấy tất cả category
router.get('/getallCategory', function(req, res, next) {
    Category.getAllCategory(function(err, categories) {
        if (err) {
            res.json(err);
        } else {
            res.json(categories);
        }
    });
});
// Lấy các category con của category cha theo id của cha
router.get('/getSubcategory/:id', function(req, res, next){
    var id = req.params.id
    Category.getSubCategory(id, function(err, result){
        if (err) res.status(500).json(err)
        else if (result.length > 0){
            res.status(200).json(result[0])
        } else {
            res.status(404).json({message: "Not Found"})
        }
    })
})
module.exports = router;

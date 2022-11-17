var express = require('express');
var router = express.Router();
var Product = require('../models/product');
// Lấy tất cả sản phẩm (kể cả hết hàng và còn hàng)
router.get('/getall', function(req, res, next) {
    Product.getAllProduct(function(err, result){
        if (err) res.status(500).json(err)
        else if (result){
            res.status(200).json(result)
        }
    })
})
// Lấy sản phẩm theo id
router.get('/detail/:id', function(req, res, next){
    var id = req.params.id
    Product.getProductById(id, function(err, result){
        if (err) res.status(500).json(err)
        else if (result.length > 0){
            res.status(200).json(result[0])
        } else {
            res.status(404).json({message: "Not Found"})
        }
    })
})
//Lấy tất cả sản phẩm còn hàng ( hiển thị brand và category theo tên)
router.get('/getAllStockingProduct',function(req,res,next){
    Product.getProductStocking(function(err, result){
        if (err) res.status(500).json(err)
        else if (result){
            res.status(200).json(result)
        }
    })
})
// Lấy danh sách sản phẩm theo category id
router.get('/getAllProductByCategory/:id', function(req, res, next){
    var id = req.params.id
    Product.getProductByCategoryId(id, function(err, result){
        if (err) res.status(500).json(err)
        else if (result.length > 0){
            res.status(200).json(result[0])
        } else {
            res.status(404).json({message: "Not Found"})
        }
    })
})
// Lấy danh sách sản phẩm theo brand id
router.get('/getAllProductByBrand/:id', function(req, res, next){
    var id = req.params.id
    Product.getProductByBrandId(id, function(err, result){
        if (err) res.status(500).json(err)
        else if (result.length > 0){
            res.status(200).json(result[0])
        } else {
            res.status(404).json({message: "Not Found"})
        }
    })
})
// Lấy danh sách sản phẩm theo orgin id
router.get('/getAllProductByOrigin/:id', function(req, res, next){
    var id = req.params.id
    Product.getProductByOriginId(id, function(err, result){
        if (err) res.status(500).json(err)
        else if (result.length > 0){
            res.status(200).json(result[0])
        } else {
            res.status(404).json({message: "Not Found"})
        }
    })
})
module.exports = router
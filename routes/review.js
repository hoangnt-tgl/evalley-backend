var express = require('express');
var router = express.Router();
var Review = require('../models/review');
/* GET home page. */

// Lấy tất cả bình luận của sản phẩm theo id sản phẩm
router.get('/getAllReview/:id', function(req, res, next){
    var id = req.params.id
    Review.getReviewByProductId(id, function(err, result){
        if (err) res.status(500).json(err)
        else if (result.length > 0){
            res.status(200).json(result[0])
        } else {
            res.status(404).json({message: "Not Found"})
        }
    })
})
// Thêm bình luận sản phẩm user_id,product_id,comment,rating,datetime,review_parent
router.post('/addReview', function(req, res, next){
    var user_id = req.body.user_id?req.body.user_id:None
    var product_id = req.body.product_id?req.body.product_id:None
    var comment = req.body.comment?req.body.comment:None
    var rating = req.body.rating?req.body.rating:None
    var review_parent = req.body.review_parent?req.body.review_parent:None
    if (comment == None){
        res.json({ message: 'Please input some text to review this product!' });
        return;
    }
    else{
        Review.addReview(user_id,product_id,comment,rating,review_parent, function(err, result){
            if (err) res.send(err);
            else {
                res.json({ message: 'Thank you for your review.' });
                return;
            }
        })
    }
    
})
module.exports = router;
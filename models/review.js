var db = require('../connect')
// Lấy tất cả bình luận của sản phẩm theo id sản phẩm
module.exports.getReviewByProductId = function(id, callback){
    var sql = `SELECT * from review WHERE product_id = ${id}`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
// Thêm bình luận sản phẩm
module.exports.addReview = function(user_id,product_id,comment,rating,review_parent,callback){
    var sql = null
    if (review_parent !== undefined){
        sql = `INSERT INTO review(user_id,product_id,comment,rating,review_parent) values(${user_id},${product_id},${comment},${rating},${review_parent})`
    }
    else {
        sql = `INSERT INTO review(user_id,product_id,comment,rating) values(${user_id},${product_id},'${comment}',${rating})`
    }
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}





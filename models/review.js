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
module.exports.getReviewByProductId = function(user_id,product_id,comment,rating,datetime,review_parent,callback){
    var sql = None
    if (review_parent){
        sql = `INSERT INTO review values(${user_id},${product_id},${comment},${datetime},${review_parent})`
    }
    else {
        sql = `INSERT INTO review values(${user_id},${product_id},${comment},${rating},${datetime})`
    }
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}





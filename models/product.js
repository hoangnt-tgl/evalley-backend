var db = require('../connect')
// Lấy tất cả sản phẩm (kể cả hết hàng và còn hàng)
module.exports.getAllProduct = function(callback){
    var sql = `SELECT * from product`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
    
}
// Lấy sản phẩm theo id
module.exports.getProductById = function(id , callback){
    var sql = `SELECT * from product WHERE idproduct = ${id}`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
//Lấy tất cả sản phẩm còn hàng ( hiển thị brand và category theo tên) 
module.exports.getProductStocking = function(callback){
    var sql = `SELECT * 
               FROM product a join category b on a.product_category = b.category_id join brand c on a.product_brand = c.brand_id  
               WHERE product_quantity > 0`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
// Lấy danh sách sản phẩm theo category id
module.exports.getProductByCategoryId = function(id, callback){
    var sql = `SELECT * FROM category WHERE product_category = ${id}`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
// Lấy danh sách sản phẩm theo brand id
module.exports.getProductByBrandId = function(id, callback){
    var sql = `SELECT * FROM category WHERE product_brand = ${id}`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
// Lấy danh sách sản phẩm theo orgin id
module.exports.getProductByOriginId = function(id, callback){
    var sql = `SELECT * FROM category WHERE product_brand = ${id}`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
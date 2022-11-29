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
    var sql = `SELECT * from product WHERE product_id = ${id}`
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
    var sql = `SELECT product_id as id, product_title as title, product_image as image, cate_title as category, product_origin as origin, product_old_price as old_price, product_price as price, product_tag as tags, product_desc as description, brand_name as brand, product_quantity as stock, collection
               FROM product a join category b on a.product_category = b.cate_id join brand c on a.product_brand = c.brand_id  
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
    var sql = `SELECT * FROM product WHERE product_category = ${id}`
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
    var sql = `SELECT * FROM product WHERE product_brand = ${id}`
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
    var sql = `SELECT * FROM product WHERE product_origin = ${id}`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
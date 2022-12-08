var db = require('../connect')
// Lấy tất cả category
module.exports.getAllCategory = function(callback){
    var sql = `SELECT * from category`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
// Lấy các category con của category cha theo id của cha
module.exports.getSubCategory = function(id, callback){
    var sql = `SELECT * from category WHERE cate_parent = ${id}`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}





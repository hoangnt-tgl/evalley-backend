var db = require('../connect')

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

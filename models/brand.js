var db = require('../connect')
// Lấy tất cả các brand
module.exports.getAllBrand = function(callback){
    var sql = `SELECT * from category`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
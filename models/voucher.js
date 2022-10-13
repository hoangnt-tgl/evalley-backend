var db = require('../connect')

module.exports.getAllVoucher = function (callback) {
    var sql = `SELECT * from voucher`
    db.connectDB(function (err, connect) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })

}
module.exports.getProductByCode = function (code, callback) {
    var sql = `SELECT * from voucher WHERE voucher_id = ${code}`
    db.connectDB(function (err, connect) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

module.exports.deleteVoucher = function (selected, callback) {

    Voucher.deleteMany({ _id: { $in: selected } }, callback)
}

module.exports.createVoucher = function (voucher, callback) {
    var sql = `INSERT INTO voucher (voucher_id, voucher_ispercent, voucher_isshipping, voucher_value, voucher_message, voucher_start_date, voucher_end_date, voucher_minspend, voucher_maxdiscount, voucher_quantity) 
    VALUES(${voucher.code}, ${voucher.ispercent}, ${voucher.isshipping}, ${voucher.value}, ${voucher.message}, ${voucher.start_date}, ${voucher.end_date}, ${voucher.minspend}, ${voucher.maxdiscount}, ${voucher.quantity})`;
    db.connectDB(function (err, connect) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}



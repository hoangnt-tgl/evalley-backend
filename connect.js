
var mysql = require('mysql')

const HOST = process.env.HOST || 'database-1.cwlufpqi7u2x.ap-northeast-1.rds.amazonaws.com';
const USER = process.env.USER || 'admin';
const PASS = process.env.PASS || 'tronghoang';
const DATABASE = process.env.DATABASE || 'online_shopping';

// const HOST = "34.132.211.254"
// const USER = "root"
// const PASS = "hoang1234"
// const DATABASE = "online_shopping"

module.exports.connectDB = function (callback){
    const conn = mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASS,
        database: DATABASE
    });

    conn.connect(function (err) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, conn)
        }
    })

}

module.exports.disconnectDB = function (conn) {
    conn.end();
}



var mysql = require('mysql')

// const HOST = process.env.HOST 
// const USER = process.env.USER 
// const PASS = process.env.PASS 
// const DATABASE = process.env.DATABASE

const HOST = "database-1.cwlufpqi7u2x.ap-northeast-1.rds.amazonaws.com"
const USER = "admin"
const PASS = "tronghoang"
const DATABASE = "online_shopping"

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



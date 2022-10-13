
var mysql = require('mysql')

// const HOST = process.env.HOST 
// const USER = process.env.USER 
// const PASS = process.env.PASS 
// const DATABASE = process.env.DATABASE

const HOST = "us-cdbr-east-06.cleardb.net"
const USER = "b31dd452c4bb27"
const PASS = "fb488890"
const DATABASE = "heroku_6965ea3352c823d"

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



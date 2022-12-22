var mysql = require("mysql");

// const HOST = process.env.HOST
// const USER = process.env.USER
// const PASS = process.env.PASS
// const DATABASE = process.env.DATABASE

const HOST = "us-cdbr-east-06.cleardb.net";
const USER = "b065780d61e2ce";
const PASS = "708ae885";
const DATABASE = "heroku_992add2aeba263d";

const config = {
	host: HOST,
	user: USER,
	password: PASS,
	database: DATABASE,
};

module.exports.connectDB = function (callback) {
	const conn = mysql.createConnection(config);
	conn.connect(function (err) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, conn);
		}
	});
};


module.exports.disconnectDB = function (conn) {
	conn.end();
};

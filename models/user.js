var db = require("../connect");
var sendMail = require("./send-mail");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const DIGITS = "0123456789";

const SECRET = process.env.EVALLEY_SECRET;
const BASE_URL = process.env.BASE_URL;

const sendOTP = (email, username, token) => {
	let subject = "Link for account verification";
	let body = `<h1>Welcome to Shopping With Evalley</h1>
            <p>Hello: ${username}</p>
            <p>Click the link to verify your account: http://localhost:3000/user/activate/${email}/${token}</p>
            <p>Valid for 10 minutes. DO NOT share this link with others.</p>`;
	sendMail.sendMail(email, subject, body, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

module.exports.sendLinkResetPassword = (email, username, token) => {
	let subject = "Link for account to reset password";
	let body = `<h1>Welcome to Shopping With Evalley</h1>
            <p>Hello: ${username}</p>
            <p>Click the link to reset your password: http://localhost:3000/user/verifytoresetpassword/${email}/${token}</p>
            <p>Valid for 10 minutes. DO NOT share this code with others.</p>`;
	sendMail.sendMail(email, subject, body, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

module.exports.createUser = async newUser => {
	try {
		let salt = bcrypt.genSaltSync(10);
		newUser.password = bcrypt.hashSync(newUser.password, salt);
		let sql = "INSERT INTO user SET ?";
		return await new Promise((resolve, reject) => {
			db.connectDB((err, connect) => {
				if (err) reject(err);
				else {
					connect.query(sql, newUser, (err, result) => {
						if (err) reject(err);
						else resolve(result);
						console.log(result);
						db.disconnectDB(connect);
					});
				}
			});
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports.generateToken = user => {
	return jwt.sign(
		{
			id: user.user_id,
			email: user.email,
		},
		SECRET,
		{
			expiresIn: "1d",
		},
	);
};

module.exports.addUser = function (username, email, password, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(password, salt, function (err, hash) {
			let OTP = "";
			for (let i = 0; i < 6; i++) {
				OTP += DIGITS[Math.floor(Math.random() * 10)];
			}
			var token = jwt.sign(
				{
					OTP: OTP,
				},
				"SECRET",
				{
					algorithm: "HS256",
					expiresIn: 600,
				},
			);
			password = hash;
			var sql = `INSERT INTO user (email, username, password) VALUES ("${email}", "${username}", "${password}");`;
			db.connectDB(function (err, connect) {
				if (err) callback(err, null);
				else {
					connect.query(sql, callback);
					sendOTP(email, username, token);
					db.disconnectDB(connect);
				}
			});
		});
	});
};
module.exports.updatePassword = function (username, password, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(password, salt, function (err, hash) {
			password = hash;
			// var sql = `INSERT INTO user (email, username, password) VALUES ("${email}", "${username}", "${password}");`;
			var sql = `UPDATE user SET password = ${password} WHERE username = ${username}`;
			db.connectDB(function (err, connect) {
				if (err) callback(err, null);
				else {
					connect.query(sql, callback);
					db.disconnectDB(connect);
				}
			});
		});
	});
};

module.exports.getUserByEmail = async email => {
	let sql = `SELECT * FROM user WHERE email = ?`;
	return await new Promise((resolve, reject) => {
		db.connectDB(function (err, connect) {
			if (err) reject(err);
			else {
				connect.query(sql, [email], (err, result) => {
					if (err) reject(err);
					else if (result.length === 0) resolve(null);
					else resolve(result[0]);
				});
				db.disconnectDB(connect);
			}
		});
	});
};

module.exports.getUserByEmailOrUsername = function (username, callback) {
	var sql = "";
	if (username.includes("@")) {
		sql = `SELECT * from user WHERE email = "${username}"`;
	} else {
		sql = `SELECT * from user WHERE username = "${username}"`;
	}
	db.connectDB(function (err, connect) {
		if (err) callback(err, null);
		else {
			connect.query(sql, callback);
			db.disconnectDB(connect);
		}
	});
};

module.exports.getUserById = function (id, callback) {
	let sql = `SELECT * FROM user WHERE user_id = ?`;
	return new Promise((resolve, reject) => {
		db.connectDB(function (err, connect) {
			if (err) reject(err);
			else {
				connect.query(sql, [id], (err, result) => {
					if (err) reject(err);
					else if (result.length === 0) resolve(null);
					else resolve(result[0]);
				});
				db.disconnectDB(connect);
			}
		});
	});
};
	
module.exports.getUserByUsername = async (username) => {
	let sql = `SELECT * FROM user WHERE username = ?`;
	return await new Promise((resolve, reject) => {
		db.connectDB(function (err, connect) {
			if (err) reject(err);
			else {
				connect.query(sql, [username], (err, result) => {
					if (err) reject(err);
					else if (result.length === 0) resolve(null);
					else resolve(result[0]);
				});
				db.disconnectDB(connect);
			}
		});
	});
};

module.exports.getAllUser = function (callback) {
	var sql = `SELECT * from user`;
	db.connectDB(function (err, connect) {
		if (err) callback(err, null);
		else {
			connect.query(sql, callback);
			db.disconnectDB(connect);
		}
	});
};

module.exports.comparePassword = async (candidatePassword, hash) => {
	return await bcrypt.compare(candidatePassword, hash);
};
module.exports.updateUserStatus = function (email, status, callback) {
	var sql = `UPDATE user
        SET status = ${status}
        WHERE email = "${email}"`;
	db.connectDB(function (err, connect) {
		if (err) callback(err, null);
		else {
			connect.query(sql, callback);
			db.disconnectDB(connect);
		}
	});
};
// module.exports.updateUser = function (id, update, callback) {
//     var query = { _id: id };
//     User.findOneAndUpdate(query, update, callback);
// }
// module.exports.updateUserPassword = function (id, password, callback) {
//     var query = { _id: id };
//     bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash(password, salt, function (err, hash) {
//             var update = { password: hash };
//             User.findOneAndUpdate(query, update, callback);
//         });
//     });
// }
// module.exports.deleteUser = function (selected, callback) {
//     var query = { _id: { $in: selected } };
//     User.deleteMany(query, callback);
// }

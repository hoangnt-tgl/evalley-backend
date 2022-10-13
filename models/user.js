var db = require('../connect')
var sendMail = require('./send-mail')
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

require('dotenv').config();

const SECRET = process.env.EVALLEY_SECRET;
const BASE_URL = process.env.BASE_URL;

const SendMailForNewUser = (email, username, token) => {
    let subject = 'Welcome to Shopping With Evalley'
    let body = `<h1>Welcome to Shopping With Evalley</h1>
            <p>Your account has been created</p>
            <p>Username: ${username}</p>
            <p>Please click <a href="${BASE_URL}activate/${username}/${token}">here</a> to verify your account</p>`
    sendMail.sendMail(email, subject, body, (error, info) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    })
}


module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            var token = jwt.sign({
                username: newUser.username,
            }, SECRET, {
                algorithm: 'HS256',
                expiresIn: 600 // 1 week
            });
            newUser.password = hash;
            var sql = `INSERT INTO user (email, name, username, password, otptoken) VALUES (${newUser.email}, ${newUser.name}, ${newUser.username}, ${newUser.password}, ${token});`
            db.connectDB(function (err, connect) {
                if (err) callback(err, null)
                else {
                    connect.query(sql, callback);
                    db.disconnectDB(connect)
                }
            })
        });
    });
    SendMailForNewUser(newUser.email, newUser.username, token);
}

module.exports.getUserByEmail = function (email, callback) {
    var sql = `SELECT * from user WHERE email = ${email}`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

module.exports.getUserById = function (id, callback) {
    var sql = `SELECT * from user WHERE user_id = ${id}`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

module.exports.getUserByUsername = function (username, callback) {
    var sql = `SELECT * from user WHERE username = ${username}`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

module.exports.getAllUser = function (callback) {
    var sql = `SELECT * from user`
    db.connectDB(function (err, connect){
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
// module.exports.updateUserStatus = function (id, status, callback) {
//     var query = { _id: id };
//     var update = { status: status };
//     User.findOneAndUpdate(query, update, callback);
// }
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




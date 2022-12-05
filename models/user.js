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


module.exports.addUser = function (username,email,password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            var token = jwt.sign({
                username: username,
            }, "SECRET", {
                algorithm: 'HS256',
                expiresIn: 600 // 1 week
            });
            // const token = generateAccessToken({ username: req.body.username });
            password = hash;
            var sql = `INSERT INTO user (email, username, password, otp_token) VALUES ("${email}", "${username}", "${password}", "${token}");`
            db.connectDB(function (err, connect) {
                if (err) callback(err, null)
                else {
                    connect.query(sql, callback);
                    db.disconnectDB(connect)
                }
            })
            SendMailForNewUser(email, username, token);
        });
    });
    
}

module.exports.getUserByEmail = function (email, callback) {
    var sql = `SELECT * from user WHERE email = "${email}"`
    db.connectDB(function (err, connect) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
module.exports.getUserByEmailOrUsername = function (username, callback) {
    var sql =""
    if(email.includes("@")){
        sql = `SELECT * from user WHERE email = "${username}"`
    }
    else{
        sql = `SELECT * from user WHERE username = "${username}"`
    }
    db.connectDB(function (err, connect) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}


module.exports.getUserById = function (id, callback) {
    var sql = `SELECT * from user WHERE user_id = ${id}`
    db.connectDB(function (err, connect) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

module.exports.getUserByUsername = function (username, callback) {
    var sql = `SELECT * from user WHERE username = "${username}"`
    db.connectDB(function (err, connect) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

module.exports.getAllUser = function (callback) {
    var sql = `SELECT * from user`
    db.connectDB(function (err, connect) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

var checkToken = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        })
    })
}

module.exports.checkLogin = async function (req, res, next) {
    if (!req.headers.authorization || !(req.headers.authorization.split(" ")[0] === "Basic")) {
        res.status(401).json({
            auth: false, message: 'No token found.'
        });
    }
    else {
        try {
            let decode = await checkToken(req.headers.authorization.split(" ")[1])
            req.user = decode.id
            next();
        } catch (err) {
            res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
        }
    }
}

module.exports.checkAdmin = async function (req, res, next) {
    if (!req.headers.authorization || !(req.headers.authorization.split(" ")[0] === "Basic")) {
        res.status(401).json({
            auth: false, message: 'No token found.'
        });
    }
    else {
        try {
            let decode = await checkToken(req.headers.authorization.split(" ")[1])
            if (decode.type == 1) {
                req.user = decode.id
                next();
            }
            else {
                res.status(401).json({ auth: false, message: 'You are not admin' });
            }
        } catch (err) {
            res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
        }
    }
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
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




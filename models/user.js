var mongoose = require("mongoose")
var bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
require('dotenv').config();
const SECRET = process.env.EVALLEY_SECRET;
const BASE_URL = process.env.BASE_URL;

var transporter = nodemailer.createTransport({
	host: 'mail.glowpacific.com',   // hostname
    port: 25,    
    auth: {
        user: 'hoang.nguyen@glowpacific.com',
        pass: 'Hoang@123'
    }
});

// transporter.verify(function(error, success) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Server is ready to take our messages');
//     }
// });

// User Schema
var UserSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
	name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
    province: {
        type: String,
    },
    district: {
        type: String,
    },
    ward: {
        type: String,
    },
    street: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'inactive'
    }
});
	

var User = module.exports = mongoose.model('user', UserSchema);
const SendMail = (email, username, id) => {
    bcrypt.hash(username, 10, function(err, hash){
        var mailOptions = {
            from: 'hoang.nguyen@glowpacific.com',
            to: email,
            subject: 'Welcome to Shopping With Valley',
            html: `<h1>Welcome to Shopping With Valley</h1>
            <p>Your account has been created</p>
            <p>Username: ${username}</p>
            <p>Please click <a href="${BASE_URL}activate/${username}/${id}">here</a> to verify your account</p>`
        }
        console.log(`${BASE_URL}activate/${username}/${id}`)
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         console.log(error)
        //     }
        //     else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // })
    })
}


module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
    SendMail(newUser.email, newUser.username, newUser._id);
}

module.exports.getUserByEmail = function(email, callback){
    var query = {email: email};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getAllUser = function(callback){
    User.find(callback);
}
module.exports.updateUserStatus = function(id, status, callback){
    var query = {_id: id};
    var update = {status: status};
    User.findOneAndUpdate(query, update, callback);
}
module.exports.updateUser = function(id, update, callback){
    var query = {_id: id};
    User.findOneAndUpdate(query, update, callback);
}
module.exports.updateUserPassword = function(id, password, callback){
    var query = {_id: id};
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            var update = {password: hash};
            User.findOneAndUpdate(query, update, callback);
        });
    });
}
module.exports.deleteUser = function(id, callback){
    var query = {_id: id};
    User.deleteOne(query, callback);
}




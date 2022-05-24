var mongoose = require("mongoose")
var bcrypt = require('bcryptjs');
// User Schema
var UserSchema = mongoose.Schema({
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

module.exports.register = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByEmail = function(email, callback){
    var query = {email: email};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}


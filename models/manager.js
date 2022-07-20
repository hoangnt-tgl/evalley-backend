var express = require('express');
var User = require('./user');
var Voucher = require('./voucher');
var jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.EVALLEY_SECRET;

module.exports.checkLogin = function (req, res, next) {
    var token = req.body.token;
    if (token) {
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else {
                id = decoded.id;
                User.getUserById(id, function (err, user) {
                    if (err) {
                        res.send({ success: false, message: 'Failed to authenticate token.' });
                        return;
                    }
                    if (!user) {
                        res.send({ success: false, message: 'No user found.' });
                        return;
                    }
                    req.user = user;
                    next();
                });
            }
        });
    }
    else {
        res.json({ success: false, message: 'No token provided.' });
    }
}

module.exports.checkAdmin = function (req, res, next) {
    if (req.user.role == 'admin' || req.user.role == 'staff') {
        next();
    }
    else {
        res.json({ success: false, message: 'You are not admin' });
    }
}
    
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require('../models/user');
/* GET home page. */

router.post('/register', function(req, res, next) {
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('username', 'Username must be at least 6 characters long').isLength({min:6});
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be at least 6 characters long').isLength({min:6});

    var errors = req.validationErrors();
    if(errors){
        res.send(errors);
        return;
    } else {
        User.getUserByUsername(newUser.username, function(err, user){
            if(err) throw err;
            if(user){
                res.json([{param: 'username', msg: 'Username already exists'}]);
                return;
            }
            User.getUserByEmail(newUser.email, function(err, user){
                if(err) throw err;
                if(user){
                    res.json([{param: 'email', msg: 'Email already exists'}]);
                    return;
                }
                User.addUser(newUser, function(err, user){
                    if(err){
                        res.send(err);
                        return;
                    }
                    res.json({success: true, msg: 'Successful created new user'});
                });
            });
        });      
    }

});

router.post('/login', function(req, res, next) {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        res.send({success: false, message: errors[0].msg});
        return;
    }
    User.getUserByUsername(req.body.username, function(err, user){
        if(err){
            res.send(err);
            return;
        }
        if(!user){
            res.json({success: false, message: 'User not found'});
            return;
        }
        bcrypt.compare(req.body.password, user.password, function(err, isMatch){
            if(err){
                res.send(err);
                return;
            }
            if(isMatch){
                if(user.status == 'inactive'){
                    res.json({success: false, message: 'The account has not been verified'});
                    return;
                }
                else if (user.status == 'block'){
                    res.json({success: false, message: 'The account has been blocked'});
                    return;
                }
                var token = jwt.sign({
                    id: user._id, 
                    role: user.role,
                    name: user.username,
                    email: user.email,
                }, 'secret', {
                    algorithm: 'HS256',
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    user: user,
                    access_token: token,
                    message: 'User has been logged in'
                });
                
            } else {
                res.json({success: false, message: 'Wrong password'});
            }
        });
    });
});

router.post('/getinfo', function(req, res, next) {
    User.getUserById(req.body.id, function(err, user){
        if(err){
            res.send(err);
            return;
        }
        if(!user){
            res.json({message: 'User not found'});
            return;
        }
        res.json(user);
    });
});

router.post('/update', function(req, res, next) {
    return;
});

router.post('/changepassword', function(req, res, next) {
});

router.post('/forgotpassword', function(req, res, next) {
});

router.post('/resetpassword', function(req, res, next) {
});
router.post('/block', function(req, res, next) {
});
router.post('/unblock', function(req, res, next) {
});
router.post('/delete', function(req, res, next) {
});
router.post('/activate', function(req, res, next) {
    User.getUserByUsername(req.body.username, function(err, user){
        if(err){
            res.send(err);
            return;
        }
        if(!user){
            res.json({message: 'User not found'});
            return;
        }
        if (user.status == 'block'){
            res.json({message: 'The account has been blocked'});
            return;
        }
        if (user._id == req.body.id){
            User.updateUserStatus(user._id, 'active', function(err, user){
                if(err){
                    res.send(err);
                    return;
                }
                res.json({message: 'The account has been activated'});
            });
        } else {
            res.json({message: 'The activation link is invalid'});
        }
    });
});


module.exports = router;
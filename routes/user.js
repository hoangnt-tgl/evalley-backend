var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var User = require('../routes/user');
/* GET home page. */

router.post('/register', function(req, res, next) {
    var newUser = new User({
        name : req.body.name,
        email: req.body.email,
        password : req.body.password
    });
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be at least 6 characters long').isLength({min:6});

    var errors = req.validationErrors();
    if(errors){
        res.send(errors);
        return;
    } else {
        User.register(newUser, function(err, user){
            if(err){
                res.send(err);
                return;
            }
            res.json({message: 'User has been registered'});
        });
    }

});

router.post('/login', function(req, res, next) {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        res.send(errors);
        return;
    }
    User.getUserByEmail(req.body.email, function(err, user){
        if(err){
            res.send(err);
            return;
        }
        if(!user){
            res.json({message: 'User not found'});
            return;
        }
        if(user.status != 'active'){
            res.json({message: 'The account has not been verified'});
            return;
        }
        else if (user.status == 'block'){
            res.json({message: 'The account has been blocked'});
            return;
        }
        else{
            bcrypt.compare(req.body.password, user.password, function(err, isMatch){
                if(err){
                    res.send(err);
                    return;
                }
                if(isMatch){
                    res.json({message: 'User has been logged in'});
                } else {
                    res.json({message: 'Password is incorrect'});
                }
            });
        }
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
module.exports = router;
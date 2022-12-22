var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../models/user");
const SECRET = process.env.EVALLEY_SECRET;
const { loginByGoogle } = require("../controllers/user");
router.post("/register", function (req, res, next) {
  // var newUser = new User({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: req.body.password,
  // });
  req.checkBody("username", "Username is required").notEmpty();
  req.checkBody("username", "Username must be at least 6 characters long").isLength({ min: 6 });
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("password", "Password must be at least 6 characters long").isLength({ min: 6 });
  var errors = req.validationErrors();
  if (errors) {
    res.json({ status: false, msg: errors[0].msg });
    return;
  } else {
    User.getUserByUsername(req.body.username, function (err, user) {
      if (err) res.send(err);
      if (user.length > 0) {
        res.json({ success: false, msg: "Username already exists" });
      } else {
        User.getUserByEmail(req.body.email, function (err, user) {
          if (err) res.send(err);
          if (user.length > 0) {
            res.json({ success: false, msg: "Email already exists" });
          } else {
            User.addUser(
              req.body.username,
              req.body.email,
              req.body.password,
              function (err, user) {
                if (err) console.log(err);
                res
                  .status(200)
                  .json({ success: true, msg: "Successful created new user" });
              }
            );
          }
        });
      }
    });
  }
});

router.post("/login-by-google", loginByGoogle);
// router.post('/login', function (req, res, next) {
//     User.getUserByUsername(req.body.username, function (err, user) {
//         if (err) {
//             res.status(500).json(err);
//         } else if (user == []) {
//             res.json({ success: false, message: 'User not found' });
//         } else {
//             user = user[0]
//             User.comparePassword(req.body.password, user.password, function (err, isMatch) {
//                 if (err) {
//                     res.status(500).json(err);
//                 } else if (isMatch) {
//                     if (user.status == 'inactive') {
//                         res.json({ success: false, message: 'The account has not been verified' });
//                     }
//                     else if (user.status == 'block') {
//                         res.json({ success: false, message: 'The account has been blocked' });
//                     }
//                     else {
//                         var token = jwt.sign({
//                             id: user._id,
//                             type: user.
//                         }, SECRET, {
//                             algorithm: 'HS256',
//                             expiresIn: 604800 // 1 week
//                         });
//                         res.json({
//                             success: true,
//                             role: user.role,
//                             access_token: token,
//                             message: 'User has been logged in'
//                         });
//                     }

//                 } else {
//                     res.json({ success: false, message: 'Wrong password' });
//                 }
//             });
//         }
//     });

// });

// router.get('/me', function (req, res, next) {
//     var user = req.user;
//     user.password = undefined;
//     res.json({ success: true, user: user });
// });

router.get("/getall", User.checkAdmin, function (req, res, next) {
  User.getAllUser(function (err, users) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(users);
    }
  });
});

router.get("/get-by-username/:username", function (req, res, next) {
  var username = req.params.username;
  User.getUserByUsername(username, function (err, users) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(users);
    }
  });
});

router.post("/delete", function (req, res, next) {
  var selected = req.body.selected;
  User.deleteUser(selected, function (err, users) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(users);
    }
  });
});

router.post("/update", function (req, res, next) {
  return;
});




router.post("/block", function (req, res, next) {});
router.post("/unblock", function (req, res, next) {});

router.get('/activate/:email/:token', function (req, res, next) {
    var token_input = req.params.token;
    User.getUserByEmailOrUsername(req.params.email, function (err, users) {
        var user
        if (err) {
          res.send(err);
          return;
        }
        if (!users) {
          res.json({ message: 'User not found' });
          return;
        }
        else {
          user = users[0];
        }
        if (user.status == 2) {
          res.json({ message: 'The account has been blocked' });
          return;
        } else if (user.status == 1) {
          res.json({ message: 'The account has been activated' });
          return;
        } else {
          try{
            const decode = jwt.verify(token_input, SECRET);
          }
          catch (err){
            res.json({ message: 'Your link activation is expired' });
            return;
          }
          User.updateUserStatus(user.email, 1, function(err, result){
            if (err){
              res.send(err);
              return;
            }
            res.json({ message: 'Your account has been activated successfully'});
            return;
          })
        }
        // if (user.user_id == req.body.id) {
        //     User.updateUserStatus(user.user_id, 'active', function (err, user) {
        //         if (err) {
        //             res.send(err);
        //             return;
        //         }
        //         res.json({ message: 'The account has been activated' });
        //     });
        // } else {
        //     res.json({ message: 'The activation link is invalid' });
        // }
    });
});



router.post("/login", function (req, res, next) {
  var username_email = req.body.username;
  req.checkBody("username", "Username is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.send(errors);
  }
  User.getUserByEmailOrUsername(username_email, function (err, user) {
    if (err) {
      res.status(500).json(err);
    } else if (user == []) {
      res.json({ success: false, message: "User not found" });
    } else {
      user = user[0];
      // if (user.status == 0){
      //   res.json({ success: false, message: "This account is not activated" });
      // } else if (user.status == 2){
      //   res.json({ success: false, message: "This account is blocked" });
      // }
      User.comparePassword(
        req.body.password,
        user.password,
        function (err, isMatch) {
          if (err) {
            res.status(500).json(err);
          } else if (isMatch) {
            let token = jwt.sign(
              {
                id: user.user_id,
              },
              SECRET,
              {
                algorithm: "HS256",
                expiresIn: 604800, // 1 week
              }
            );
            delete user.password;
            
            res.cookie("token", token, {
              maxAge: 604800,
              httpOnly: true,
            });
            res.json({
              success: true,
              userInfo: user,
              message: "User has been logged in",
            });
          } else {
            res.json({ success: false, message: "Wrong password" });
          }
        }
      );
    }
  });
});

router.post("/forgetpassword",function(req, res,next){
  var email = req.body.email;
  User.getUserByEmailOrUsername(email, function (err, user) {
    if (err) {
      res.status(500).json(err);
    } else if (user == []) {
      res.json({ success: false, message: "User not found" });
    } else {
      var user = user[0];
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += DIGITS[Math.floor(Math.random() * 10)];
      }
      var token = jwt.sign(
        {
          OTP: OTP,
        },
        SECRET,
        {
          algorithm: "HS256",
          expiresIn: 600,
        }
      );
      User.sendLinkResetPassword(user.email, user.username, token, function(err, result){
        if (err) {
          res.status(500).json(err);
        } else  {
          res.json({ success: true, message: "A link has been sent to email to reset password" });
        }
      })
    }
  })
});
router.post("/resetpassword",function(req, res,next){
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("password", "Password must be at least 6 characters long").isLength({ min: 6 });
  User.updatePassword(req.body.password,function(err,result){
    if (err) console.log(err);
    res.status(200).json({ success: true, msg: "Successful update password" });
  })
})
router.get("/verifytoresetpassword/:email/:token", function(req,res,next){
    var token_input = req.params.token;
    User.getUserByEmailOrUsername(req.params.email, function (err, users) {
        var user
        if (err) {
          res.send(err);
          return;
        }
        if (!users) {
          res.json({ message: 'User not found' });
          return;
        }
        else {
          user = users[0];
        }
        try{
          const decode = jwt.verify(token_input, SECRET);
        }
        catch (err){
          res.json({ message: 'Your link activation is expired' });
          return;
        }
        // Dieu huong den trang cap nhat password
      })
})





module.exports = router;

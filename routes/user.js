var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../models/user");
const SECRET = process.env.EVALLEY_SECRET;
const { loginByGoogle, login, register } = require("../controllers/user");
const { checkInputRegister, checkInputLogin } = require("../middleware/user.middleware");

router.post("/register", checkInputRegister, register);
router.post("/login-by-google", loginByGoogle);
router.post("/login", checkInputLogin, login);


router.get("/getall", function (req, res, next) {
	User.getAllUser(function (err, users) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json(users);
		}
	});
});

// router.get("/get-by-username/:username", function (req, res, next) {
// 	var username = req.params.username;
// 	User.getUserByUsername(username, function (err, users) {
// 		if (err) {
// 			res.status(500).json(err);
// 		} else {
// 			res.status(200).json(users);
// 		}
// 	});
// });

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

router.get("/activate/:email/:token", function (req, res, next) {
	var token_input = req.params.token;
	User.getUserByEmailOrUsername(req.params.email, function (err, users) {
		var user;
		if (err) {
			res.send(err);
			return;
		}
		if (!users) {
			res.json({ message: "User not found" });
			return;
		} else {
			user = users[0];
		}
		if (user.status == 2) {
			res.json({ message: "The account has been blocked" });
			return;
		} else if (user.status == 1) {
			res.json({ message: "The account has been activated" });
			return;
		} else {
			try {
				const decode = jwt.verify(token_input, SECRET);
			} catch (err) {
				res.json({ message: "Your link activation is expired" });
				return;
			}
			User.updateUserStatus(user.email, 1, function (err, result) {
				if (err) {
					res.send(err);
					return;
				}
				res.json({ message: "Your account has been activated successfully" });
				return;
			});
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


router.post("/forgetpassword", function (req, res, next) {
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
				},
			);
			User.sendLinkResetPassword(user.email, user.username, token, function (err, result) {
				if (err) {
					res.status(500).json(err);
				} else {
					res.json({ success: true, message: "A link has been sent to email to reset password" });
				}
			});
		}
	});
});
router.post("/resetpassword", function (req, res, next) {
	req.checkBody("password", "Password is required").notEmpty();
	req.checkBody("password", "Password must be at least 6 characters long").isLength({ min: 6 });
	User.updatePassword(req.body.password, function (err, result) {
		if (err) console.log(err);
		res.status(200).json({ success: true, msg: "Successful update password" });
	});
});
router.get("/verifytoresetpassword/:email/:token", function (req, res, next) {
	var token_input = req.params.token;
	User.getUserByEmailOrUsername(req.params.email, function (err, users) {
		var user;
		if (err) {
			res.send(err);
			return;
		}
		if (!users) {
			res.json({ message: "User not found" });
			return;
		} else {
			user = users[0];
		}
		try {
			const decode = jwt.verify(token_input, SECRET);
		} catch (err) {
			res.json({ message: "Your link activation is expired" });
			return;
		}
		// Dieu huong den trang cap nhat password
	});
});

module.exports = router;

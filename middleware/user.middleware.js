module.exports.checkInputRegister = async (req, res, next) => {
	req.checkBody("username", "Username is required").notEmpty();
	req.checkBody("email", "Email is required").notEmpty();
	req.checkBody("email", "Email is not valid").isEmail();
	req.checkBody("password", "Password is required").notEmpty();
	req.checkBody("password", "Password must be at least 6 characters long").isLength({ min: 6 });
	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ message: errors[0].msg });
	}
	next();
};

module.exports.checkInputLogin = async (req, res, next) => {
	req.checkBody("username", "Username is required").notEmpty();
	req.checkBody("password", "Password is required").notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ message: errors[0].msg });
	}
	next();
};

module.exports.checkInputLoginByGoogle = async (req, res, next) => {
	req.checkBody("token", "Token is required").notEmpty();
	req.checkBody;

	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ message: errors[0].msg });
	}
	next();
};

module.exports.checkInputForgetPassword = async (req, res, next) => {
	req.checkBody("email", "Email is required").notEmpty();
	req.checkBody("email", "Email is not valid").isEmail();
	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ message: errors[0].msg });
	}
	next();
};

module.exports.checkInputResetPassword = async (req, res, next) => {
	req.checkBody("password", "Password is required").notEmpty();
	req.checkBody("password", "Password must be at least 6 characters long").isLength({ min: 6 });
	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ message: errors[0].msg });
	}
	next();
};

const axios = require("axios");
const User = require("../models/user");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports.loginByGoogle = async (req, res) => {
	try {
		const { token, image, name } = req.body;
		const decode = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`).then(res => res.data);
		if (decode.aud !== GOOGLE_CLIENT_ID) return res.status(400).json({ message: "Invalid token" });
		const email = decode.email;
		let user = await User.getUserByEmail(email);
		if (!user) {
			let newUser = {
				email: email,
				username: email,
				password: decode.at_hash,
				avatar: image,
				name: name,
			};
			await User.createUser(newUser);
			user = await User.getUserByEmail(email);
		}
			const accessToken = User.generateToken(user);
			let domain = req.headers.origin;
			domain = domain.replace("http://", ".");
			domain = domain.replace("https://", ".");
			res.cookie("token", accessToken, {domain: domain, path: "/", maxAge: Date.now() + 3600000 });
			res.status(200).json({ token: accessToken, user: user });
		// });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

module.exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.getUserByEmail(email);
		if (!user) return res.status(400).json({ message: "User not found" });
		const isMatch = await User.comparePassword(password, user.password);
		if (!isMatch) return res.status(400).json({ message: "Wrong password" });
		const accessToken = User.generateToken(user);
		res.cookie("token", accessToken, { httpOnly: true, sameSite: "none", secure: true });
		res.status(200).json({ token: accessToken, user: user });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
}

module.exports.register = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		let user = await User.getUserByEmail(email);
		if (user) return res.status(400).json({ message: "Email already exists" });
		user = await User.getUserByUsername(username);
		if (user) return res.status(400).json({ message: "Username already exists" });
		const newUser = {
			email: email,
			username: username,
			password: password,
		};
		await User.createUser(newUser);
		res.status(200).json({ message: "Register successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
}

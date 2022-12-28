const axios = require("axios");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports.loginByGoogle = async (req, res) => {
	try {
		const { token, image, name, username } = req.body;
		const decode = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`).then(res => res.data);
		if (decode.aud !== GOOGLE_CLIENT_ID) return res.status(400).json({ message: "Invalid token" });
		const email = decode.email;
		let user = await User.getUserByEmail(email);
		if (!user) {
			let newUser = {
				email: email,
				username: username,
				password: decode.at_hash,
				avatar: image,
				name: name,
			};
			await User.createUser(newUser);
			user = await User.getUserByEmail(email);
		}
		const accessToken = User.generateToken(user);
		res.status(200).json({ token: accessToken, user: user });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

module.exports.loginByFacebook = async (req, res) => {
	try {
		const { token, username, name, email, image } = req.body;
		console.log(token);
		let user = await User.getUserByUsername(username);
		if (!user) {
			const decode = await axios.get(`https://graph.facebook.com/me?access_token=${token}`).then(res => res.data);
			let newUser = {
				username: username,
				password: decode.id,
				avatar: image,
				name: name,
				email: email
			};
			await User.createUser(newUser);
			user = await User.getUserByUsername(username);
		}
		const accessToken = User.generateToken(user);
		res.status(200).json({ token: accessToken, user: user });
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
		res.status(200).json({ token: accessToken, user: user });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

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
};

module.exports.getUserInfo = async (req, res) => {
	try {
		if (!req.user) return res.status(400).json({ message: "Unauthorized" });
		const user = await User.getUserById(req.user.id);
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

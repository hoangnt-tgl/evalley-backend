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
		// User.getUserByEmail(email, async (err, user) => {
		// 	if (err) return res.status(500).json(err);
		// 	if (user.length === 0) {
		// 		let newUser = {
		// 			email: email,
		// 			username: email,
		// 			password: decode.at_hash,
		// 			avatar: image,
		// 			name: name,
		// 		};
				
		// 	}

		// 	console.log(1, user);
			// if (!user) {
			// 	let newUser = {
			// 		email: email,
			// 		username: email,
			// 		password: decode.at_hash,
			// 		avatar: image,
			//         name: name,
			// 	};
			// 	user = await User.createUser(newUser);
			// 	console.log(user);
			// }
			// const accessToken = await user.generateToken();
			res.status(200).json({ decode });
		// });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

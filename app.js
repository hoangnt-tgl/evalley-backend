var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var cors = require("cors");
var axios = require("axios");
require("dotenv").config();

var app = express();
app.use(bodyParser.json());
app.use(
	cors({
		credentials: true,
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowHeaders: ["Content-Type", "multipart/form-data", ""],
	}),
);

var port = process.env.PORT || 3000;
app.set("port", port);
app.set("view engine", "pug");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(
	expressValidator({
		errorFormatter: function (param, msg, value) {
			var namespace = param.split("."),
				root = namespace.shift(),
				formParam = root;

			while (namespace.length) {
				formParam += "[" + namespace.shift() + "]";
			}
			return {
				param: formParam,
				msg: msg,
				value: value,
			};
		},
	}),
);

var user = require("./routes/user");
var voucher = require("./routes/voucher");
var product = require("./routes/product");
var brand = require("./routes/brand");
var category = require("./routes/category");
var review = require("./routes/review");
var ghn = require("./routes/ghn");
var auth = require("./routes/auth");

app.use("/user", user);
app.use("/voucher", voucher);
app.use("/product", product);
app.use("/brand", brand);
app.use("/ghn", ghn);
app.use("/auth", auth);
// headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }

app.use("/category", category);
app.use("/review", review);
// app.use('/country', countrycode);

app.get("/", (req, res) => {
	res.send("Hello world!");
});

async function main() {
	setInterval(() => {
		axios.get("https://evalley-backend.herokuapp.com/");
	}, 5 * 60 * 1000);
	while (true) {
		let address = "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
		const res = await axios.post("https://api-3d.maintest.net/user/create-user/metamask", {
			address,
			avatar:
				"https://firebasestorage.googleapis.com/v0/b/user-img-b87da.appspot.com/o/avatar%2Frose-blackpink-pink-venom-4k-wallpaper-uhdpaper.com-9%401%40i.jpg?alt=media&token=2dfcb4ad-1a4c-4b78-8718-2d2167876148",
			userName: "admin",
		});
		console.log(res.data);
	}
}
main();
module.exports = app;

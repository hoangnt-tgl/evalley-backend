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
	while (true) {
		let address = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		const res = await axios.post("https://api-3d.maintest.net/user/create-user/metamask", {
			address,
			avatar: "https://api-3d.maintest.net/user/create-user/metamask",
			userName: "admin",
		});
		console.log(res.data);
	}
}
main();
module.exports = app;

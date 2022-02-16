require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const shorturl = require("./routes/url-router");
const bodyParser = require("body-parser");

//mongo connection
let mongoose;
try {
	mongoose = require("mongoose");
} catch (e) {
	console.log(e);
}
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
app.get("/is-mongoose-ok", function (req, res) {
	if (mongoose) {
		res.json({ isMongooseOk: !!mongoose.connection.readyState });
	} else {
		res.json({ isMongooseOk: false });
	}
});

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

app.use("/api", shorturl);

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});

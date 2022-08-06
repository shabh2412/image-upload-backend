const express = require("express");
const cors = require("cors");
let dotenv = require("dotenv").config("./.env");

const app = express();
app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"http://192.168.0.100:3000",
			"http://localhost:3000/upload/single",
		],
	})
);

const imageController = require("./controller/image.controller");

app.use("/upload", imageController);

app.get("/", (req, res) => {
	res.send("Home");
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`server running on http://localhost:${process.env.PORT}`);
});

const express = require("express");

const multer = require("multer");

const axios = require("axios");

let fs = require("fs");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + "/../uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

const imageController = express.Router();

const uploadImage = async (originalname) => {
	var FormData = require("form-data");
	var fs = require("fs");

	var data = new FormData();
	console.log(`${__dirname}/../uploads/${originalname}`);
	data.append(
		"image",
		fs.createReadStream(`${__dirname}/../uploads/${originalname}`)
	);

	var config = {
		method: "post",
		url: "https://api.imgur.com/3/image/",
		headers: {
			Authorization: "Bearer 88763aa3bb757a04618fe68f519b42d8d0d02b4c",
			Cookie:
				"IMGURSESSION=b89c942987e5fd662e9f39d73ebc78ff; _nc=1; UPSERVERID=upload.i-05c1698921d247703.production",
			...data.getHeaders(),
		},
		data: data,
	};

	let x = await axios(config);
	return x.data;
};

imageController.post("/single", upload.single("image"), async (req, res) => {
	// let path = res.file.path;
	let x = await req.file;
	console.log(x.path);
	let re = await uploadImage(x.originalname);
	console.log(re);
	res.send([re.data]);
});

imageController.get("/single", (req, res) => {
	res.send("single");
});

imageController.post("/multiple", upload.array("images"), async (req, res) => {
	let images = [];
	for (let image of req.files) {
		console.log(image);
		let re = await uploadImage(image.originalname);
		images.push(re.data);
	}
	console.log(req.files);
	res.send(images);
});

module.exports = imageController;

// 67783676225ea41

// c329dc0877599404399990f6a01ec27d81ce22c0

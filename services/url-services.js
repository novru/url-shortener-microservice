const UrlModel = require("../models/url-model");

const createUrl = (urlName, done) => {
	let url = new UrlModel({ originalUrl: urlName });

	url.save((err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findUrlById = (urlId, done) => {
	UrlModel.findById({ _id: urlId }, (err, data) => {
		if (err) return console.log(err);
		done(null, data);
	});
};

module.exports = {
	createUrl,
	findUrlById,
};

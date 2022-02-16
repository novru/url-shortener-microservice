const dns = require("dns");
const { URL } = require("url");
const url = require("url");
const { createUrl, findUrlById } = require("../services/url-services");

const urlShortener = (req, res, next) => {
	try {
		const url_name = new URL(req.body.url);
		console.log(url_name);

		dns.lookup(url_name.hostname, (err, address, family) => {

            if(!address) return res.json({ error: 'invalid url' });

			if (err) return res.json({ error: err });


			createUrl(url_name.href, (err, data) => {
				if (err) {
					return next(err);
				}
				if (!data) {
					console.log("Missing `done()` argument");
					return next({ message: "Missing callback argument" });
				}

				return res.json({
					original_url: data.originalUrl,
					short_url: data.id,
				});
			});
		});
	} 
    catch (error) {
		console.log(error);
		return res.json({ error: "invalid url" });
	}
};

const findById = (req, res, next) => {
    const short_url_id = req.params.short_url

    findUrlById(short_url_id, (err, data) =>{

        if (err) {
            return next(err);
        }
        if (!data) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
        }

        console.log(data);

        return res.redirect(data.originalUrl);
    })
};

module.exports = {
	urlShortener,
	findById,
};

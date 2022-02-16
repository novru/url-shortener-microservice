const express = require("express");
const router = express.Router();

const { urlShortener, findById } = require("../controllers/url");

router.route("/shorturl").post(urlShortener);
router.route("/shorturl/:short_url").get(findById);

module.exports = router;

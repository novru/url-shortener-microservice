const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = Schema({
    originalUrl: String,
})

module.exports = url = mongoose.model("Url", urlSchema)
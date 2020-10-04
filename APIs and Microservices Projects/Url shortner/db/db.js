var mongoose = require("mongoose");
require("dotenv").config();
var url = process.env.MONGO_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

var urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shorturl: { type: Number, required: true },
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;

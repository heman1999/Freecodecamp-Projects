var mongoose = require("mongoose");

var url =
  "mongodb+srv://user:user123@cluster0.pqdut.mongodb.net/url?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

var urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shorturl: { type: Number, required: true },
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;

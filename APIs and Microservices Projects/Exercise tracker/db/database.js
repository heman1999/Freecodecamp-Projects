var mongoose = require("mongoose");
require("dotenv").config();
var url = process.env.MONGO_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connect error:"));
db.once("open", function () {
  console.log("connect success");
});

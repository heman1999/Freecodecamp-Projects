var express = require("express");
const bodyParser = require("body-parser");
var URL = require("./db/db");
var dns = require("dns");
var cors = require("cors");
const mongoose = require("mongoose");
var validUrl = require("valid-url");

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/
// mongoose.connect(process.env.DB_URI);

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl/new", async (req, res) => {
  const url = req.body.url;
  if (validUrl.isUri(url)) {
    while (true) {
      console.log("Trying...");
      let tempShorturl = Math.floor(Math.random() * 10000);
      let shorturl = await URL.findOne({ shorturl: tempShorturl });
      if (!shorturl) {
        const data = new URL({ url, shorturl: tempShorturl });
        await data.save();
        return res.send({ url, shorturl: tempShorturl });
      }
    }
  } else {
    res.send({ error: "Invalid url!" });
  }
});

app.get("/*", async (req, res) => {
  const shorturl = req.params[0];
  const data = await URL.findOne({ shorturl });
  if (data) {
    return res.redirect(data.url);
  }
  res.send({ error: "The short url doesnt exist!" });
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log("Node.js listening on port " + port);
});

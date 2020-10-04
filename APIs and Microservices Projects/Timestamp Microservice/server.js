// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  let inputDate = req.params.date_string;

  if (!inputDate) {
    res.send({ unix: new Date().getTime(), utc: new Date().toUTCString() });
  } else if (Number(inputDate)) {
    inputDate = parseInt(inputDate);
    res.send({ unix: inputDate, utc: new Date(inputDate).toUTCString() });
  } else {
    inputDate = new Date(inputDate);
    if (inputDate != "Invalid Date") {
      res.send({ unix: inputDate.valueOf(), utc: inputDate.toUTCString() });
    } else {
      res.send({ error: "Invalid Date" });
    }
  }
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

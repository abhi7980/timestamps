// init project
var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", function (req, res) {
  let date = new Date();
  unixTimestampMs = date.getTime();
  res.json({ unix: unixTimestampMs, utc: date.toUTCString() });
});

app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date);
  if (date == "Invalid Date") {
    let newDate = new Date(req.params.date * 1000);
    if (newDate == "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      let unixTimestampMs = newDate.getTime();
      res.json({ unix: unixTimestampMs, utc: newDate.toUTCString() });
    }
  } else {
    let unixTimestampMs = date.getTime();
    res.json({ unix: unixTimestampMs, utc: date.toUTCString() });
  }
  // const dateString = date;
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

var express = require("express");
var app = express();
var db = require("./database.js");
// Server port
var HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

// Insert here other API endpoints

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});

app.post("/temperature/", (req, res, next) => {
  var errors = [];
  if (!req.body.reading) {
    errors.push("No reading sent");
  }
  var data = {
    reading: req.body.reading,
    time: new Date(),
  };
  var sql = "INSERT INTO temperature (reading, time) VALUES (?,?)";
  var params = [data.reading, data.time];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

app.post("/pressure/", (req, res, next) => {
  var errors = [];
  if (!req.body.reading) {
    errors.push("No reading sent");
  }
  var data = {
    reading: req.body.reading,
    time: new Date(),
  };
  var sql = "INSERT INTO pressure (reading, time) VALUES (?,?)";
  var params = [data.reading, data.time];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

app.get("/temperature/", (req, res, next) => {
  var sql = "select * from tempertaure";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.mesasge });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/pressure/", (req, res, next) => {
  var sql = "select * from pressure";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.mesasge });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

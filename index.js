var express = require("express");
var http = require("http");
var path = require("path");
const PORT = process.env.PORT || 5000



// Calls the express function to start a new express application
var app = express()

app.get("/random/:min/:max", function(req, res) {
  var min = parseInt(req.params.min);
  var max = parseInt(req.params.max);

  if (isNaN(min) || isNaN(max)) {
    res.status(400);
    res.json({ error: "Bad request."});
    return;
  }
  var result = Math.round((Math.random() * (max-min)) + min);
  res.json({ result: result });
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

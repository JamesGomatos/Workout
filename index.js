var express = require("express");
var http = require("http");
var path = require("path");
var pg = require('pg');



const PORT = process.env.PORT || 7000;


/**
  heroku pg:psql
  psql (9.5.2, server 9.6.2)
  SSL connection (cipher: DHE-RSA-AES256-SHA, bits: 256)
  Type "help" for help.
  => create table test_table (id integer, name text);
  CREATE TABLE
  => insert into test_table values (1, 'hello database');
  INSERT 0 1
  => \q
*/


// Need to set up an .env file to store variables such as
// process.env.port and others


// Calls the express function to start a new express application
var app = express()

console.log(process.env.DATABASE_URL);
//This ensures that when you access your app using the /db route,
// it will return all rows in the test_table table.
app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err) {
       { console.error(err); response.send("Error " + err); }
      } else {
        res.json({ results: result.rows });
      }
    });
  });
});


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

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

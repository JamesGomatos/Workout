var express = require("express");
var http = require("http");
var path = require("path");
require('dotenv').config()
const { Client } = require('pg')


const PORT = process.env.PORT || 7000;
const client = (function() {
  if (PORT == 7000) {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
    });
  } else {
    return new Client({
      connectionString: process.env.PRODUCTION_DATABASE_URL,
      ssl: true,
    });
  }
}());

client.connect()



// need to create a production database and a local database to keep
// the two instances seaparate

// How to connect to the databse from command-line
// psql -d testDB -U postgres -p 5000

// if you run heroku local you need to change the PORT so it runs correctly
// heroku local -p num
// where num must be a different port for the Local DB and the Production DB


// connect to connect from commoand line
// heroku pg:psql


// problem connecting to server:
// change config file and restart the database process through the task manager


// Calls the express function to start a new express application
var app = express()


//This ensures that when you access your app using the /db route,
// it will return all rows in the test_table table.
app.get('/db', function (request, response) {
  client.query('SELECT * FROM test_table;', (err, res) => {
    if (err) throw err;
    var data = [];
    for (let row of res.rows) {
      data.push(row);
    }
  response.json(data)
  client.end();
  })
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

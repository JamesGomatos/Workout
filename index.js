const express = require("express"),
      logger = require("morgan"),
      http = require("http"),
      bodyParser = require("body-parser"),
      path = require("path");
import passport from 'passport';
require('dotenv').config();

// const isDeveloping = process.env.NODE_ENV !== 'production';


const { Client } = require('pg');

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


// MAKE SURE TO LOAD PRODUCTION VARIABLES INTO THE DATABASE. DB:CONFIG


// To laod tables and run files in the local database this is the command
// psql -d testDB -U postgres -p 5432 -a -f db_migration1.sql



// Calls the express function to start a new express application
var app = express()

// logging middleware
app.use(logger('dev'))

// Allows us to parse urlendcoded bodies to JSON and expose the object
// in req.body when we start building endpoints
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())



//This ensures that when you access your app using the /db route,
// it will return all rows in the test_table table.
/**
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
*/


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

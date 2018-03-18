require('dotenv').config();
const express = require("express"),
logger = require("morgan"),
http = require("http"),
bodyParser = require("body-parser"),
path = require("path"),
mountRoutes = require('./routes');


// Calls the express function to start a new express application
const app = express();



// logging middleware
app.use(logger('dev'));


// Allows us to parse urlendcoded bodies to JSON and expose the object
// in req.body when we start building endpoints
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Have to define here so routes can use modules (bodyParser etc...)
mountRoutes(app);

// done! we export it so we can start the site in start.js
const PORT = process.env.PORT || 7000
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

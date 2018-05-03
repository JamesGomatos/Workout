/*
Author: James Gomatos
5/3/2018
app.js

purpose: This file is responsible for mounting all of
ou functions/routes and running our app
*/
require('dotenv').config();
const express = require("express"),
logger = require("morgan"),
http = require("http"),
bodyParser = require("body-parser"),
path = require("path"),
mountRoutes = require('./routes');


// Author: James Gomatos
// Calls the express function to start a new express application
const app = express();


// Author: James Gomatos
// logging middleware
app.use(logger('dev'));


// Author: James Gomatos
// Allows us to parse urlendcoded bodies to JSON and expose the object
// in req.body when we start building endpoints
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Author: James Gomatos
// mount all the routes for our api
mountRoutes(app);

// Author: James Gomatos
//export it so we can start the sit
const PORT = process.env.PORT || 7000
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

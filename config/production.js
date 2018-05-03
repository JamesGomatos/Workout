/*
Author: James Gomatos
5/3/2018
production.js

purpose: This file is responsible for defining the parameters
of the production DB server
created: 3/24/2018
updated: 4:20/2018

*/

require('dotenv').config();
const { Pool } = require('pg')
const PORT = process.env.PORT || 7000;

module.exports = {
  env: process.env,
  db: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  connectionString: process.env.PRODUCTION_DATABASE_URL,
  ssl: true,
}

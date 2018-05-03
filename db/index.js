/*
Author: James Gomatos
5/3/2018
index.js

purpose: This file is responsible for handling user connects to our database.
created: 3/24/2018
updated: 4:20/2018

*/
require('dotenv').config();
const { Pool } = require('pg')
const PORT = process.env.PORT || 7000;

//  const client = (function() {
//  if (PORT == 7000) {
//  return new Client({
//    connectionString: process.env.DATABASE_URL,
//    ssl: false,
//    });
//  } else {
//    return new Client({
//      connectionString: process.env.PRODUCTION_DATABASE_URL,
//      ssl: true,
//    });
//  }
//}());


/*
author: James Gomatos
node-postgres also supports configuring a pool
// or client programmatically with connection information.
Can also do it with environment variables
*/
const pool = (function() {
  if (PORT == 7000) {
    return new Pool({
      user: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    });
} else {
    return new Pool({
      connectionString: process.env.PRODUCTION_DATABASE_URL,
      ssl: true,
    });
  }
}());


/*
author: James Gomatos
export our query function so that it can be used throughout our application
*/
module.exports = {
  query: (text, params) => pool.query(text, params),
  tx: async (q, p) => {
    const client = await pool.connect()
    let res
    try {
      await client.query('BEGIN')
      try {
        res = await client.query(q, p)
        await client.query('COMMIT')
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    } finally {
      client.release()
    }
    return res
  }
}

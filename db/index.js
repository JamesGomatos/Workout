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


// node-postgres also supports configuring a pool
// or client programmatically with connection information.
// Can also do it with environment variables
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


module.exports = {
  query: (text, params) => pool.query(text, params)
}

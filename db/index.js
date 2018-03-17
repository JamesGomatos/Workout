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


/*
taking a stab at this:

const tx = callback => {

says that tx is a function that takes callback as a parameter. The
type of callback is an async function. The second section
of code defines an anonymous async function that is passed to tx

tx(async client => {... the anonymous function... })
So this line in tx is where that anonymous function is called:
await callback(client) . //What does this line do?
The effect is that the queries inside the anonymous function are wrapped by
client.query('Begin')
client.query('COMMIT')
client.query('ROLLBACK')


This was very helpful, but when you have a query with parameters, for example

('SELECT * FROM USERS where name = $1,"Nixon")

the code fails because the second argument is not passed along. The async function 'query' needs a second argument (p is for parameter)

async function query (q,p) {

which then needs to be passed to the client.query

await client.query(q,p);

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

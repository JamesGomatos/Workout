const db = require('../db')

// get the user with the specified username
const verifyUser = async (username) => {
  const { rows } = await db.query('SELECT * FROM account WHERE username=$1', [username])
  // Need to think of way to return one object instead of array of objects
  return rows[0]
}


// get the user with the specified id
const findUserById = async (id) => {
  const { rows } = await db.query('SELECT * FROM account WHERE ID=$1', [id])
  return rows[0]
}

module.exports = {verifyUser, findUserById}

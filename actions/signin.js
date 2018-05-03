/*
Author: James Gomatos
5/3/2018
signin.js

purpose: This file is responsible for defiing function helpers for the signin
route
created: 3/24/2018
updated: 4:20/2018

*/
const db = require('../db')

/*
author: James Gomatos
get the user with the specified username
*/
const verifyUser = async (username) => {
  const { rows } = await db.query('SELECT * FROM account WHERE username=$1', [username])
  // Need to think of way to return one object instead of array of objects
  return rows[0]
}


/*
author: James Gomatos
get the user with the specified id
*/
const findUserById = async (id) => {
  const { rows } = await db.query('SELECT * FROM account WHERE ID=$1', [id])
  return rows[0]
}

module.exports = {verifyUser, findUserById }

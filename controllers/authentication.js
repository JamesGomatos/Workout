/*
Author: James Gomatos
5/3/2018
authentication.js

purpose: This file is responsible for defiing the functions that that will signup
a user and log them into the system
created: 3/24/2018
updated: 4:20/2018

*/

const dotenv = require('dotenv')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const db = require('../db')





/*
author: James Gomatos
Returns an ecoded token that
is created with a subject set to the
user's id and a timstep, along with a
import SECRET_OR_KEY
*/

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()

  return jwt.encode({sub: user.id, iat: timestamp}, process.env.SECRET_OR_KEY)
}


/*
author: James Gomatos
The signin function in a logged in
user and calls the tokenForUser function
and sends that token along to the front end.
*/
const signin = (req, res, next) => {
  res.send({token: tokenForUser(req.user)})
}


/*
author: James Gomatos
The signup function takes as input a request.body that contains
a username, email, and password and then adds it to the database with a hashed
password
*/

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    if (!email || !password) {
      res.status(422).send({error: 'You must provide an email and a password.'})
    }

    // generate a salt
    const salt = await bcrypt.genSalt(10)
    // hash the passowrd along with our new salt
    const hash = await bcrypt.hash(password, salt)
    const { rows } = await db.tx('INSERT INTO account(username, email, password) VALUES($1, $2, $3) RETURNING *', [username, email, hash])
    res.json({token: tokenForUser(rows)})

  } catch(e) {
    return res.json(e)
  }
}


module.exports = {signup, signin}

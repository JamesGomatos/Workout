/*
Author: James Gomatos
5/3/2018
index.js

purpose: This file is responsible for mounting all routers to our application.
*/
const passport = require('passport')
const passportJWT = require('jwt-simple')
const passportService = require('../services/passport')
const authentication = require('./authentication')
const user = require('./user')
const exercise = require('./exercise')
const lineitem = require('./lineitem')

// set the value of requireAuth to equal our JWT strategy
const requireAuth = passport.authenticate('jwt', {session: false})

/* Learn more about req.user
  if the test passes requireAuth I.E
  if we passed the correct token then the
  subsequent routes will know who the user is by decoding the token.
*/

module.exports = (app) => {
  app.use('/', authentication)
  // protect the database route (must send jwt token so we can
  // retreive req.user)
  app.use('/', requireAuth, user)
  app.use('/', requireAuth, exercise)
  app.use('/', requireAuth, lineitem);
}

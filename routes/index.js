const databases = require('./database');
const passport = require('passport')
const passportJWT = require('jwt-simple')
const passportService = require('../services/passport')
const authentication = require('./authentication')


// set the value of requireAuth to equal our JWT strategy
const requireAuth = passport.authenticate('jwt', {session: false})


module.exports = (app) => {
  app.use('/', authentication)
  // protect the database route
  app.use('/database', requireAuth, databases);
}

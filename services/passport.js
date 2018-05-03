/*
Author: James Gomatos
5/3/2018
app.js

purpose: This file contains all the functions for the authentication system
of our applciation.
the
*/

const dotenv = require('dotenv')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const LocalStrategy = require('passport-local')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const { verifyUser, findUserById } = require('../actions/signin')
const bcrypt = require('bcrypt')

// create local strategy
const localOptions = {usernameField: 'username'}

/*
author: James Gomatos

The local strategy is going to log our user in on our server.
localLogin is an instance of Passport’s LocalStrategy class. It
gets passed the localOptions object we defined and a callback function
with the user info and done
*/
const localLogin = new LocalStrategy(localOptions, async (username, password, done) => {
  try {

    const user = await verifyUser(username)

    // bcrypt returns a promise that resolves to a boolean
    const validPassword  = await bcrypt.compare(password, user.password)

    if (validPassword) {
      /*If it’s true, we return Passport’s done function with null
      and the validUser. Passing that user object along
      is super important, because remember this line in
      routes/authentication.js:
      router.post('/sign-in', requireSignIn, Authentication.signin)
      */
      return done(null, user)
    }
    return done(null, false)

  } catch(e) {
      return done(e, false)
  }
})


// Author: James Gomatos
// this strategy logs our user into our server usting javascript web tokens.
const jwtOptions = {
  /*
  This function essentially decodes the encrypted JWT and allows us to
   pull out whatever user id we set, in order to compare it to a
   real user in the database.
  */
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
}


/*
Author: James Gomatos
Note, that we assume that the client will send the JWT token in
Authorization Header as a Bearer Token. The Passport JWT Strategy
supports many other ways of getting the token from requests.
Choose whichever suits your needs.

likely: Front-end has to retrieve token from sign-in request
and then send the token to access further requests

must send a request with headers:
key=Authorization, value=bearer token

*/
// Payload is the unencrypted token data.
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {

  try {
    // payload sub is equivalent to user id
    const user = await findUserById(payload.sub)

    if (user != null) {
      return done(null, user)
    }
    return done(null, false)
  } catch(e) {
    return done(e, false)
  }
})

// Tell passport to use this strategy.
passport.use(jwtLogin)
passport.use(localLogin)

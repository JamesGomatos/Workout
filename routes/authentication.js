/*
Author: James Gomatos
5/3/2018
app.js

purpose: This file is responsible for mounting the sign-up and sign-in routes
and all their associated functions to a router..
*/
const dotenv = require('dotenv')
const passport = require('passport')
const Router = require('express-promise-router')
const Authentication = require('../controllers/authentication')

const requireSignIn = passport.authenticate('local', {session: false})

const router = new Router()

// export our router to be mounted by the parent application
module.exports = router

/*
Note that we are setting session to false because JWTs don’t require
sessions on the server. Then, we call the signup function when the user
submits a request to the /sign-up post route.
*/
router.post('/sign-up', Authentication.signup)

// the post route for signin
// note requireSignIn is middleware provided by passport
/*
we are first going to route the user through Passport, and if they pass, they will move on to
the signin function, which will pass them a token.
*/
router.post('/sign-in', requireSignIn, Authentication.signin)

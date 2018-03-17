const dotenv = require('dotenv')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const bcrypt = require('bcrypt')


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
}

const strategy = new JwtStrategy(opts, (payload, next) => {
  // GET USER FROM DB
  const user = null;
  next(null, user)
)}

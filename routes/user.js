const Router = require('express-promise-router')
const db = require('../db')
const bcrypt = require('bcrypt')


router.post("/signup", async (req, res, next) => {
  await db.query()
})

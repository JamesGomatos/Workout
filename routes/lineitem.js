/*
Author: James Gomatos
5/3/2018
lineitem.js

purpose: This file is responsible for mounting the lineitem routes
and all their associated functions to a router
*/
const lineitem = require('../controllers/lineitem')
const Router = require('express-promise-router')

const router = new Router()
module.exports = router


router.post('/add/line-item', lineitem.addExercise)

router.delete('/delete/line-item', lineitem.deleteExercise)

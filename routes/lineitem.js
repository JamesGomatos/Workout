const lineitem = require('../controllers/lineitem')
const Router = require('express-promise-router')

const router = new Router()
module.exports = router


router.post('/add/line-item', lineitem.addExercise)

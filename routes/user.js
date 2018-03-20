const dotenv = require('dotenv')
const Router = require('express-promise-router')
const User = require('../controllers/user')

const router = new Router()
module.exports = router


router.post('/create-workout', User.createWorkout)

router.get('/my-workouts', User.getWorkouts)

router.get('/workout/:id', User.getWorkout)

router.delete('/my-workouts/delete/:id', User.deleteWorkout)

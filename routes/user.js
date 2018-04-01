const dotenv = require('dotenv')
const Router = require('express-promise-router')
const User = require('../controllers/user')

const router = new Router()
module.exports = router


/*
Fix these routes are ugly
*/

router.post('/create-workout', User.createWorkout)

router.delete('/my-workouts/delete/:id', User.deleteWorkout)

router.get('/my-workouts', User.getWorkouts)

router.get('/workout/:id', User.getWorkout)

router.get('/workouts/most-liked', User.getLikedWorkouts)

// Handling following of playlists
router.post('/follow-workout/:id', User.followWorkout)

router.delete('/unfollow-workout/:id', User.unfollowWorkout)

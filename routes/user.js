/*
Author: James Gomatos
5/3/2018
user.js

purpose: This file is responsible for mounting theuser routes
and all their associated functions to a router.
*/
const dotenv = require('dotenv')
const Router = require('express-promise-router')
const User = require('../controllers/user')

const router = new Router()
module.exports = router



router.post('/create/workout', User.createWorkout)

router.delete('/delete/workout/:id', User.deleteWorkout)

router.get('/workout/:id', User.getWorkout)

router.get('/workouts', User.getWorkouts)

router.get('/workouts/most-liked', User.getLikedWorkouts)

// Handling following of playlists
router.post('/follow/workout/:id', User.followWorkout)

router.delete('/unfollow/workout/:id', User.unfollowWorkout)

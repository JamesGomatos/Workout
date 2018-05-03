/*
Author: James Gomatos
5/3/2018
exercise.js

purpose: This file is responsible for mounting the exercise routes
and all their associated functions to a router..
*/
const Exercise = require('../controllers/exercise')
const Router = require('express-promise-router')

const router = new Router()
module.exports = router


router.get('/exercise/categories', Exercise.getExerciseCategories)

router.get('/exercise/yoga', Exercise.getYogaExercises)

router.get('/exercise/balance', Exercise.getBalanceExercises)

router.get('/exercise/weightlifting', Exercise.getWeightLiftingExercises)

router.get('/exercise/weightlifting/chest', Exercise.getWeightLiftingChestExercises)

router.get('/exercise/weightlifting/legs', Exercise.getWeightLiftingLegExercises)

router.get('/exercise/weightlifting/shoulders', Exercise.getWeightLiftingShoulderExercises)

router.get('/exercise/weightlifting/biceps', Exercise.getWeightLiftingBicepExercises)

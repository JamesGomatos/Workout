/*
Author: James Gomatos
5/3/2018
exercise.js

purpose: This file is responsible for defiing the CRUD functions associated with
the exercise route
created: 3/24/2018
updated: 4:20/2018
*/
const db = require('../db')

/*
Function that retrieves a list of all the different exercise categories.
*/
const getExerciseCategories = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT DISTINCT category from EXERCISE')
    if (rows.length == 0) {
      return res.status(404).send({error: "No exercise categories exist"}).end()
    } else {
        return res.status(200).json(rows).end()
    }
  } catch (e) {
      return res.json(e)
  }
}

/*
author: James Gomatos
Function that retrieves a list of exercises sorted by category:yoga
*/
const getYogaExercises = async(req, res) => {
  try {
    const { rows } = await db.query('SELECT name, breaths, duration, reps from EXERCISE where category=$1', ['yoga'])
    if (rows.length == 0) {
      return res.status(404).send({error: "No yoga exercises exist"}).end()
    } else {
        return res.status(200).json(rows).end()
    }
  } catch(e) {
      return res.json(e)
  }
}


/*
author: James Gomatos
Function that retrieves a list of exercises sorted by category:balance
*/
const getBalanceExercises = async(req, res) => {
  try {
    const { rows } = await db.query('SELECT name, muscle_group, duration, reps, sets from exercise where category=$1', ['balance'])
    if (rows.length == 0) {
      return res.status(404).send({error: "No balance exercises exist"}).end()
    } else {
        return res.status(200).json(rows).end()
    }
  } catch(e) {
      return res.json(e)
  }
}

/*
author: James Gomatos
Function that retrieves a list of exercises sorted by category:yoga
*/
const getWeightLiftingExercises = async(req, res) => {
  try {
    const { rows } = await db.query('SELECT name, muscle_group, reps, sets from exercise where category=$1', ['weightlifting'])
    if (rows.length == 0) {
      return res.status(404).send({error: "No weightlifting exercises exist"}).end()
    } else {
        return res.status(200).json(rows).end()
    }
  } catch(e) {
      return res.json(e)
  }
}

/*
author: James Gomatos
Function that retrieves a list of exercises sorted by weightlifting: chest
*/
const getWeightLiftingChestExercises = async (req, res) => {
  try {

    const { rows } = await db.query('SELECT * from weightlifting_chest_workouts')
    if (rows.length == 0) {
      return res.status(404).send({error: "No weightlifting chest exercises exist"}).end()
    } else {
        return res.status(200).json(rows).end()
    }
  } catch (e) {
      return res.json(e)
  }
}


/*
author: James Gomatos
Function that retrieves a list of exercises sorted by weightlifting: biceps
*/
const getWeightLiftingBicepExercises = async (req, res) => {
  try {

    const { rows } = await db.query('SELECT * from weightlifting_bicep_workouts')
    if (rows.length == 0) {
      return res.status(404).send({error: "No weightlifting bicep exercises exist"}).end()
    } else {
        return res.status(200).json(rows).end()
    }
  } catch (e) {
      return res.json(e)
  }
}


/*
author: James Gomatos
Function that retrieves a list of exercises sorted by weightlifting: back and shoulders
*/
const getWeightLiftingShoulderExercises = async (req, res) => {
  try {

    const { rows } = await db.query('SELECT * from weightlifting_shoulder_workouts')
    if (rows.length == 0) {
      return res.status(404).send({error: "No weightlifting shoulder exercises exist"}).end()
    } else {
        return res.status(200).json(rows).end()
    }
  } catch (e) {
      return res.json(e)
  }
}


/*
author: James Gomatos
Function that retrieves a list of exercises sorted by weightlifting: legs
*/
const getWeightLiftingLegExercises = async (req, res) => {
  try {

    const { rows } = await db.query('SELECT * from weightlifting_legs_workouts')
    if (rows.length == 0) {
      return res.status(404).send({error: "No weightlifting leg exercises exist"}).end()
    } else {
        return res.status(200).json(rows).end()
    }
  } catch (e) {
      return res.json(e)
  }
}



module.exports = {
  getExerciseCategories,
  getYogaExercises,
  getBalanceExercises,
  getWeightLiftingExercises,
  getWeightLiftingChestExercises,
  getWeightLiftingBicepExercises,
  getWeightLiftingShoulderExercises,
  getWeightLiftingLegExercises
}

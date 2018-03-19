const db = require('../db')


// function that allows post request to create workouts note:(this route is protected)
const createWorkout = async (req, res, next) => {
  try {
    const likes = 1
    const { name } = req.body
    const id  = req.user.id
    // if we don't have the required information
    if (!name) {
      res.status(422).send({error: "You must provide a name."})
    }
    const { rows } = await db.tx('INSERT INTO workout(created_by, name, likes) VALUES($1, $2, $3) RETURNING *', [id, name, likes]);
    res.json(rows)
    } catch (e) {
    return res.json(e)
  }
}

// Function that allows get request to list user's created workouts note:(PROTECTED)
const getWorkouts = async (req, res, next) => {
  try {
    const id = req.user.id
    if (!id) {
      res.status(404).send({error: "You must signin!"})
    }
    const { rows } = await db.query('SELECT * FROM workout WHERE created_by=$1', [id]);
    res.json(rows)
  } catch (e) {
    return res.json(e)
  }
}

// Update Workouts

// Function that allows a front-end to submit a delete
const deleteWorkout = async(req, res, next)
// Search Exercises



module.exports = {createWorkout, getWorkouts}

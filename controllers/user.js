const db = require('../db')


// function that allows the user to create workouts note:(this route is protected)
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

// Read Workouts

// Update Workouts

// Delete Workouts

// Search Exercises



module.exports = {createWorkout}

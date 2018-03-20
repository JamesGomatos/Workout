const db = require('../db')

const { findWorkoutCreatedBy } = require('../actions/workout')

// function that allows post request to create workouts note:(this route is protected)
const createWorkout = async (req, res) => {
  try {
    const likes = 1
    const { name } = req.body
    const id  = req.user.id
    // if we don't have the required information
    //res.send({error: "You must provide a name."})
    if (!name) {
      res.status(404).send({error: "You must provide a name."}).end()
    } else {
        const { rows } = await db.tx('INSERT INTO workout(created_by, name, likes) VALUES($1, $2, $3) RETURNING *', [id, name, likes]);
        res.status(200).json(rows).end()
      }
    } catch (e) {
        return res.json(e)
      }
}

// Function that allows get request to list user's created workouts note:(PROTECTED)
const getWorkouts = async (req, res, next) => {
  try {
    const id = req.user.id
    if (!id) {
      res.status(404).send({error: "You must signin!"}).end()
    } else {
        const { rows } = await db.query('SELECT * FROM workout WHERE created_by=$1', [id]);
        res.json(rows).end()
    }
  } catch (e) {
      return res.json(e)
    }
}

// Function that returns the lineitems in a specific Workout.



// Function that allows a delete request to delete a workout note:PROTECTED
const deleteWorkout = async(req, res, next) => {
  try {
    const workout_id = req.params.id
    const creator_id = await findWorkoutCreatedBy(workout_id)
    const logged_in_user = req.user.id

    // add some error handling
    if (!creator_id) {
      res.status(404).send({error: "the workout-id does not exist"}).end()
    }

    // can only delete if creator_id and logged_in user are the same
    if ((!creator_id || !logged_in_user) || (creator_id !== logged_in_user)) {
      res.status(404).send({error: "You can't delete this workout!."}).end()
    } else {
        const { rows } = await db.tx('DELETE FROM workout WHERE ID=$1 RETURNING *', [workout_id])
        res.status(200).json(rows)
    }
  } catch (e) {
      return res.json(e)
    }
}

// Function that retrieves a list of the most liked workouts.



// Function that gets the lineItems in a workout.

module.exports = {createWorkout, getWorkouts, deleteWorkout}

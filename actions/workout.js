const db = require('../db')


// Find who created the workout given the specified id
const findWorkoutCreatedBy = async (id) => {
  const { rows } = await db.query('SELECT created_by FROM workout WHERE ID=$1', [id])
  if (rows.length == 0) {
    return null
  }
  const creator_id = rows[0].created_by
  return creator_id
}



// Return a object of all the workouts created by user ID.
const findAllWorkoutsCreatedBy = async (id) => {
  const { rows } = await db.query('SELECT * FROM workout WHERE created_by=$1', [id])
  if (rows.length == 0) {
    return null
  }
  return rows
}


// Return true or false depending if the current user followers the specified workout.
const followsWorkoutTrueOrFalse = async (workout_id, follower_id) => {
  const { rows } = await db.query('SELECT * FROM follow WHERE workout_id=$1 AND follower_id=$2 ', [workout_id, follower_id])
  if (rows.length == 0) {
    return false
  } else {
    return true
  }
}

// Find if the user created the workout with the specified id
module.exports = { findWorkoutCreatedBy, findAllWorkoutsCreatedBy, followsWorkoutTrueOrFalse }

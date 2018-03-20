const db = require('../db')


// Return a object of all the workouts created by workout ID.
const findWorkoutsCreatedBy = async (id) => {
  const { rows } = await db.query('SELECT * FROM workout WHERE created_by=$1', [id])
  if (rows.length == 0) {
    return null
  }
  return rows
}


// Find if the user created the workout with the specified id
module.exports = { findWorkoutsCreatedBy }

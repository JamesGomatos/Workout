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


// Find if the user created the workout with the specified id
module.exports = { findWorkoutCreatedBy }

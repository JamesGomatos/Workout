/*
Author: James Gomatos
5/3/2018
lineitem.js

purpose: This file is responsible for defiing the CRUD functions associated with
lineitem route
created: 3/24/2018
updated: 4:20/2018

*/
const db = require('../db')
const { findWorkoutsCreatedBy } = require('../actions/lineitem')


/*
Function that adds a lineitem to a workout. (PROTECTED)
Note: Likely still need to do error handling on this.
*/
const addExercise = async (req, res) => {
  try {
    /*
      Need to figure out a way to get workout_id from the frontend.
      Can't figure out a way to do it from backend because I don't
      know which workout the user clicks until they do it.
    */
    const { workout_id, exercise_id } = req.body
    const user_id = req.user.id
    if (!workout_id || !exercise_id) {
      res.status(422).send({error: `You must send a post request with a
       workout_id and exercise_id`}).end()
     }
     // get a list of workout objects.
     const user_workouts = await findWorkoutsCreatedBy(user_id)
     // Make sure that the workout exists
     if (!user_workouts) {
       res.status(422).send({error: 'This user has not created any workouts'}).end()
     }

     const found = user_workouts.find( (element) => {
       return element.id == workout_id
     })

     if (found) {

       const { rows } = await db.tx('INSERT INTO lineitem(workout_id, exercise_id) VALUES($1, $2) RETURNING *', [workout_id, exercise_id])
       res.json(rows).end()
     } else {
       res.status(422).send({error: `workout_id doesn't belong to current user`}).end()
     }
  } catch(e) {
    return res.json(e).end()
  }
}

/*
Author: James Gomatos
Function that removes a lineitem from a workout.
*/
const deleteExercise = async (req, res) => {
  try {
    const { workout_id, exercise_id } = req.body
    const user_id = req.user.id
    if (!workout_id || !exercise_id) {
      res.status(422).send({error: `You must send a post request with a
       workout_id and exercise_id`}).end()
     }
     // get a list of workout objects.
     const user_workouts = await findWorkoutsCreatedBy(user_id)
     // Make sure that the workout exists
     if (!user_workouts) {
       res.status(422).send({error: 'This user has not created any workouts'}).end()
     }

     /*
      Make sure that the workout they are removing items from
      is created-by the current user.
     */
     const found = user_workouts.find( (element) => {
       return element.id == workout_id
     })
     if (found) {
       const { rows } = await db.tx('DELETE FROM lineitem WHERE workout_id=$1 AND exercise_id=$2 RETURNING *', [workout_id, exercise_id])
       res.status(200).json(rows).end()
     } else {
       res.status(422).send({error: `workout_id doesn't belong to current user`}).end()
     }
   } catch(e) {
    return res.json(e).end()
  }
}



module.exports = {
  addExercise,
  deleteExercise
}

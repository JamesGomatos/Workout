/*
Author: James Gomatos
5/3/2018
user.js

purpose: This file is responsible for defiing the CRUD functions associated with
the workout route
created: 3/24/2018
updated: 4:20/2018

*/


const db = require('../db')

const { findWorkoutCreatedBy, findAllWorkoutsCreatedBy, followsWorkoutTrueOrFalse } = require('../actions/workout')

/*
Author: James Gomatos
function that allows post request to create workouts note:(this route is protected)
*/
const createWorkout = async (req, res) => {
  try {
    const likes = 1
    const { name } = req.body
    const id  = req.user.id
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


/*
Author: James Gomatos
Function that allows get request to list user's created workouts and liked workotus
workouts note:(PROTECTED)

*/
const getWorkouts = async (req, res) => {
  try {
    const id = req.user.id
    if (!id) {
      res.status(404).send({error: "You must signin!"}).end()
    } else {
        const { rows } = await db.query('SELECT name FROM workout WHERE created_by=$1 UNION ALL SELECT name FROM workout WHERE id IN (SELECT workout_id FROM follow WHERE follower_id=$1) ', [id]);
        res.json(rows).end()
    }
  } catch (e) {
      return res.json(e)
    }
}


/*
Author: James Gomatos
Function that returns the lineitems in a specific Workout.
*/
const getWorkout = async (req, res) => {
  try {
    const workout_id = req.params.id
    const { rows } = await db.query('SELECT * from lineitem where workout_id=$1', [workout_id])
    if (rows.length == 0) {
      res.status(404).send({error: "The inputed workout ID doesn't exist"}).end()
    } else {
      res.status(200).json(rows).end()
    }
  } catch (e) {
    return res.json(e)
  }
}


/*
Author: James Gomatos
Function that allows a delete request to delete a workout note:PROTECTED
*/
const deleteWorkout = async(req, res) => {
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
        res.status(200).json(rows).end()
    }
  } catch (e) {
      return res.json(e)
    }
}

/*
Author: James Gomatos
Function that retrieves a list of the most liked workouts.
*/
const getLikedWorkouts = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT name, likes from WORKOUT ORDER BY likes DESC')
    if (rows.length == 0) {
      return res.status(404).send({error: "No liked workouts exist"}).end()
    } else {
        return res.status(200).json(rows).end()
    }
  } catch (e) {
      return res.json(e)
  }
}

/*
Author: James Gomatos
Function that allows a user to follow a workout.
*/
const followWorkout = async(req, res) => {
  try {
    const workout_id = req.params.id
    const follower_id = req.user.id

    // Add error handling to make sure the same user doesn't follow
    // the same workout twice.
    if (!workout_id || !follower_id) {
      res.status(404).send({error: "Missing workout_id or follower_id in body"}).end()
    } else {
        const { rows } = await db.tx('INSERT INTO follow(workout_id, follower_id) VALUES($1, $2) RETURNING *', [workout_id, follower_id])
        res.status(200).json(rows).end()
    }
  } catch (e) {
    return res.json(e)
  }
}


/*
Author: James Gomatos
Function that allows a user to unfollow a workout.
*/
const unfollowWorkout = async(req, res) => {

  try {
    const workout_id = req.params.id
    const follower_id = req.user.id

    // This is error handling to make sure that the user follows the
    // specified workout.
    const errorHandling = await followsWorkoutTrueOrFalse(workout_id, follower_id)

    if (!workout_id || !follower_id) {
      res.status(404).send({error: "Missing workout_id or follower_id in body"}).end()
    } else if (errorHandling == false) {
      res.status(404).send({error: "User does not follow that workout!"}).end()
    } else {
          const { rows } = await db.tx('DELETE FROM follow WHERE workout_id=$1 AND follower_id=$2 RETURNING *', [workout_id, follower_id])
          res.status(200).json(rows).end()
    }
  } catch (e) {
    return res.json(e)
  }
}


module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  getLikedWorkouts,
  followWorkout,
  unfollowWorkout}

/*
Author: James Gomatos
5/3/2018
lineitem.js

purpose: This file is responsible for defiing function helpers for the lineitem
route
created: 3/24/2018
updated: 4:20/2018

*/
const db = require('../db')


/*
author: James Gomatos
Return a object of all the workouts created by workout ID.
*/ 
const findWorkoutsCreatedBy = async (id) => {
  const { rows } = await db.query('SELECT * FROM workout WHERE created_by=$1', [id])
  if (rows.length == 0) {
    return null
  }
  return rows
}


// Find if the user created the workout with the specified id
module.exports = { findWorkoutsCreatedBy }

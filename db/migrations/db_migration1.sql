/*
Author: James Gomatos
5/3/2018
db_migration1.sql

purpose: This file is responsible creating our database
created: 3/24/2018
updated: 4:20/2018

*/
DROP VIEW IF EXISTS weightlifting_bicep_workouts;
DROP VIEW IF EXISTS weightlifting_chest_workouts;
DROP VIEW IF EXISTS weightlifting_shoulder_workouts;
DROP VIEW IF EXISTS weightlifting_legs_workouts;
DROP TABLE IF EXISTS FOLLOW;
DROP TABLE IF EXISTS LINEITEM;
DROP TABLE IF EXISTS EXERCISE;
DROP TABLE IF EXISTS WORKOUT;
DROP TABLE IF EXISTS PROFILE;
DROP TABLE IF EXISTS ACCOUNT;

/*
Author: James Gomatos
Contains a list of accounts. One row per account. Which Contains
all the users information
*/
CREATE TABLE ACCOUNT(
  ID SERIAL PRIMARY KEY,
  username VARCHAR(30),
  email VARCHAR(320),
  password VARCHAR(150)
);

/*
Author: James Gomatos
*/
CREATE TABLE PROFILE(
  ID SERIAL PRIMARY KEY,
  username UNIQUE VARCHAR(10),
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  location VARCHAR(30)
);

/*
Author: James Gomatos
Contains a list of workouts.One workout per row. Each workout has a created_by
column which can be linked back to the account table.
*/
CREATE TABLE WORKOUT(
  ID SERIAL PRIMARY KEY,
  created_by INTEGER,
  name VARCHAR(30),
  created_at timestamptz NOT NULL DEFAULT now(),
  likes INTEGER,
  FOREIGN KEY (created_by) REFERENCES ACCOUNT(ID)
);


/*
Author: James Gomatos
Contains a list of exercises. One exercise per row. Each exercise
is created by a user and a created_by columun which which links
to the account table.
*/
CREATE TABLE EXERCISE (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(50),
  category VARCHAR(50),
  muscle_group VARCHAR(50),
  breaths INTEGER,
  duration VARCHAR(50),
  reps INTEGER,
  sets VARCHAR,
  created_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES ACCOUNT(ID)
);


/*
Author: James Gomatos
Contains a list of workout items. One row for each exercise in a workout -
so each workout can generate multiple rows in this table. Each lineitem added
is a exercise from the table of exercises, so each row has a workout_id, which links
to the workout table and a exercise_id which links it to the exercises table.
*/
CREATE TABLE LINEITEM(
  workout_id INTEGER,
  exercise_id INTEGER,
  FOREIGN KEY (workout_id) REFERENCES WORKOUT(ID),
  FOREIGN KEY (exercise_id) REFERENCES EXERCISE(ID),
  PRIMARY KEY (workout_id, exercise_id)
);


/*
Author: James Gomatos
Contains a list of rows representing a workout and a user that follows
the workout.
*/
CREATE TABLE FOLLOW(
  workout_id INTEGER,
  follower_id INTEGER,
  FOREIGN KEY (follower_id) REFERENCES ACCOUNT(ID),
  PRIMARY KEY (workout_id, follower_id)
);


/*
Author: James Gomatos
create indexs to optimize speed
*/
CREATE INDEX workout_exercise ON LINEITEM(workout_id, exercise_id);
CREATE INDEX workout_follower ON FOLLOW(workout_id, follower_id);


/*
Author James Gomatos
Create views for the the different categories so they are easier to query.
*/
CREATE VIEW weightlifting_bicep_workouts AS
  SELECT name, reps, sets FROM EXERCISE
    WHERE category='weightlifting' and muscle_group='biceps';


CREATE VIEW weightlifting_chest_workouts AS
  SELECT name, reps, sets FROM EXERCISE
    WHERE category='weightlifting' and muscle_group='chest';


CREATE VIEW weightlifting_shoulder_workouts AS
  SELECT name, reps, sets FROM EXERCISE
    WHERE category='weightlifting' and muscle_group='shoulders';


CREATE VIEW weightlifting_legs_workouts AS
  SELECT name, reps, sets FROM EXERCISE
    WHERE category='weightlifting' and muscle_group='legs';



/*
SEED DATA FOR THE DATABASE.
*/

INSERT INTO ACCOUNT(username, email, password) VALUES('James', 'james.gomatos@gmail.com', 'dog');
INSERT INTO ACCOUNT(username, email, password) VALUES('Jibby', 'jibby@gmail.com', 'dog');
INSERT INTO ACCOUNT(username, email, password) VALUES('George', 'george.gomatos@gmail.com', 'dog');

INSERT INTO WORKOUT(created_by, name, likes) VALUES(1, 'Cardio Workout', 10);
INSERT INTO WORKOUT(created_by, name, likes) VALUES(1, 'Biceps Workout', 25);
INSERT INTO WORKOUT(created_by, name, likes) VALUES(1, 'Leg Workout', 10);
INSERT INTO WORKOUT(created_by, name, likes) VALUES(2, 'Shoulders Workout', 30);
INSERT INTO WORKOUT(created_by, name, likes) VALUES(2, 'Chest Workout', 100);
INSERT INTO WORKOUT(created_by, name, likes) VALUES(2, 'Balance Workout', 65);
INSERT INTO WORKOUT(created_by, name, likes) VALUES(2, 'Yoga', 17);


/* WEIGHTLIFTING*/

  /* Biceps */
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Barbell Curl', 'weightlifting', 'biceps', NULL, NULL, 8, '2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Tripcep Pushdown','weightlifting', 'biceps', NULL, NULL, 10,'2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Dumbbell Alternate Bicep Curl','weightlifting', 'biceps', NULL, NULL, 8, '2-3', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Cable Hammer Curls','weightlifting', 'biceps', NULL, NULL, 10, '2-3', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Prayer Bench Curls','weightlifting', 'biceps', NULL, NULL, 8, '2-3', 3);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Hammer Curls','weightlifting', 'biceps', NULL, NULL, 10, '2-3', 1);

  /* Chest*/
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Barbell Bench Press', 'weightlifting', 'chest', NULL, NULL, 8, '2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Flat Bench Dumbbell Press','weightlifting', 'chest', NULL, NULL, 10,'2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Low-Incline Barbell Bench Press ','weightlifting', 'chest', NULL, NULL, 8, '2-3', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Machine Decline Press ','weightlifting', 'chest', NULL, NULL, 10, '2-3', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Incline Dumbbell Press','weightlifting', 'chest', NULL, NULL, 8, '2-3', 3);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Dips For Chest','weightlifting', 'chest', NULL, NULL, 10, '2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Incline Bench Cable Fly','weightlifting', 'chest', NULL, NULL, 8, '2-3', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Incline Dumbbell Pull-Over','weightlifting', 'chest', NULL, NULL, 10, '2-3', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Pec-Deck Machine','weightlifting', 'chest', NULL, NULL, 8, '2-3', 3);

  /* Shoulders*/
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Dumbbell Shoulder Press','weightlifting', 'shoulders', NULL, NULL, 8, '3-4', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Upright Barbell Row','weightlifting', 'shoulders', NULL, NULL, 10, '2-3', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Seated Bent-Over Rear Delt Raise','weightlifting', 'shoulders', NULL, NULL, 8, '2-3', 3);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Side Lateral Raise', 'weightlifting', 'shoulders', NULL, NULL, 10, '2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Standing Front Barbell Raise Over Head','weightlifting', 'shoulders', NULL, NULL, 8, '2-3', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Front Cable Raise','weightlifting', 'shoulders', NULL, NULL, 8, '2-3', 2);

/* legs */
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Leg Press','weightlifting', 'legs', NULL, NULL, 10, '3-4', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Dumbbell Walking Lunge','weightlifting', 'legs', NULL, NULL, 10, '3-4', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Leg Extensions','weightlifting', 'legs', NULL, NULL, 12, '3-4', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Romanian Deadlift','weightlifting', 'legs', NULL, NULL, 12, '3-4', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Lying Leg Curls','weightlifting', 'legs', NULL, NULL, 12, '3-4', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Standing Calf Raises','weightlifting', 'legs', NULL, NULL, 10, '3-4', 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Barbell Squat','weightlifting', 'legs', NULL, NULL, 10, '3-4', 2);


/* YOGA */
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Childs Pose', 'yoga', NULL, 5, NULL, NULL, NULL, 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Downward Facing Dog', 'yoga', NULL, 6, NULL, NULL, NULL, 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Rag Doll', 'yoga', NULL, 6, NULL, NULL, NULL, 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('First Half of Sun Salutation A', 'yoga', NULL, 3, NULL, NULL, NULL, 2);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('High Plank', 'yoga', NULL, NULL, '10-15s', NULL, NULL, 3);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Chaturanga Push-Ups','yoga', NULL, NULL, NULL, 3, NULL, 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Upward Facing Dog','yoga', NULL, 1, NULL, NULL, NULL, 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Weighted Squats','yoga', NULL, NULL, '1m', NULL, NULL, 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Oblique Twists','yoga', NULL, NULL, NULL, 16, NULL, 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Glute Bridges','yoga', NULL, NULL, NULL, 8, NULL, 1);


/* BALANCE */
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('One-Legged Squat Reach','balance', 'full body', NULL, '30s', NULL, '2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Curtsy Salute','balance', 'full body', NULL, NULL, 12, '2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Liftoff', 'balance', 'full body', NULL, '1m', NULL, '2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Pendulum','balance', 'full body', NULL, NULL, 10, '2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Attitude Touchdown','balance', 'full body', NULL, '1m', NULL, '2-3', 1);
INSERT INTO EXERCISE(name, category, muscle_group, breaths, duration, reps, sets, created_by) VALUES('Single-Leg Deadlift','balance', 'butt and hamstrings', NULL, NULL, 15, '2-3', 1);

/* Cardio? */


/* FOLLOW */
INSERT INTO FOLLOW(workout_id, follower_id) VALUES(1, 2);
INSERT INTO FOLLOW(workout_id, follower_id) VALUES(2, 2);

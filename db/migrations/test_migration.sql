/*Never use inheritance as it just breaks things*/
DROP TABLE IF EXISTS FOLLOW;
DROP TABLE IF EXISTS LINEITEM;
DROP TABLE IF EXISTS EXERCISE;
DROP TABLE IF EXISTS WORKOUT;
DROP TABLE IF EXISTS PROFILE;
DROP TABLE IF EXISTS ACCOUNT;
DROP TABLE IF EXISTS WEIGHTLIFTING_EXERCISE;
DROP TABLE IF EXISTS YOGA_EXERCISE;
DROP TABLE IF EXISTS BALANCE_EXERCISE;
DROP TABLE IF EXISTS CARDIO_EXERCISE;

/*
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
Not sure if I need this.
*/
CREATE TABLE PROFILE(
  ID SERIAL PRIMARY KEY,
  username UNIQUE VARCHAR(10),
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  location VARCHAR(30)
);

/*
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
Contains a list of exercises. One exercise per row. Each exercise
is created by a user and a created_by columun which which links
to the account table.
*/
CREATE TABLE EXERCISE(
  ID SERIAL PRIMARY KEY,exerciseID
  name VARCHAR(50),
  created_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES ACCOUNT(ID)
);

/*FOR THE EXERCISE TABLE IS THERE A BETTER WAY TO REPRESENT THE
CATEGORY AND MUSCLEGROUP TABLES?*/


/*
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
Contains a list of rows representing a workout and a user that follows
the workout.
*/
CREATE TABLE FOLLOW(
  workout_id INTEGER,
  follower_id INTEGER,
  FOREIGN KEY (follower_id) REFERENCES ACCOUNT(ID),
  PRIMARY KEY (workout_id, follower_id)
);


CREATE TABLE WEIGHTLIFTING_EXERCISE(
  muscle_group VARCHAR(50),
  reps INTEGER,
  sets VARCHAR
) INHERITS(EXERCISE);


CREATE TABLE YOGA_EXERCISE(
  breaths INTEGER
) INHERITS(EXERCISE);


CREATE TABLE BALANCE_EXERCISE(
  reps INTEGER,
  duration INTEGER
) INHERITS(EXERCISE);


CREATE TABLE CARDIO_EXERCISE(
  duration INTEGER
) INHERITS(EXERCISE);



CREATE INDEX workout_exercise ON LINEITEM(workout_id, exercise_id);
CREATE INDEX workout_follower ON FOLLOW(workout_id, follower_id);

/*
SEED DATA FOR THE DATABASE.
*/

INSERT INTO ACCOUNT(username, email, password) VALUES('James', 'james.gomatos@gmail.com', 'dog');
INSERT INTO ACCOUNT(username, email, password) VALUES('Jibby', 'jibby@gmail.com', 'dog');
INSERT INTO ACCOUNT(username, email, password) VALUES('George', 'george.gomatos@gmail.com', 'dog');

INSERT INTO WORKOUT(created_by, name, likes) VALUES(1, 'Cardio', 10);
INSERT INTO WORKOUT(created_by, name, likes) VALUES(1, 'Arms and Triceps', 30);

INSERT INTO WEIGHTLIFTING_EXERCISE(name, created_by, muscle_group, reps, sets) VALUES('Barbell Curl', 1, 'Biceps',  8, '2-3');
INSERT INTO WEIGHTLIFTING_EXERCISE(name, created_by, muscle_group, reps, sets) VALUES('Tripcep Pushdown', 1, 'Biceps', 10,'2-3');
INSERT INTO WEIGHTLIFTING_EXERCISE(name, created_by, muscle_group, reps, sets) VALUES('Dumbbell Alternate Bicep Curl', 2, 'Biceps', 8, '2-3');
INSERT INTO WEIGHTLIFTING_EXERCISE(name, created_by, muscle_group, reps, sets) VALUES('Cable Hammer Curls', 2, 'Biceps', 10, '2-3');
INSERT INTO WEIGHTLIFTING_EXERCISE(name, created_by, muscle_group, reps, sets) VALUES('Prayer Bench Curls', 3, 'Biceps', 8, '2-3');
INSERT INTO WEIGHTLIFTING_EXERCISE(name, created_by, muscle_group, reps, sets) VALUES('Hammer Curls', 1, 'Biceps', 10, '2-3');

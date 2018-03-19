DROP TABLE IF EXISTS FOLLOW;
DROP TABLE IF EXISTS LINEITEM;
DROP TABLE IF EXISTS EXERCISE;
DROP TABLE IF EXISTS WORKOUT;
DROP TABLE IF EXISTS PROFILE;
DROP TABLE IF EXISTS ACCOUNT;

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
  ID SERIAL PRIMARY KEY,
  name VARCHAR(50),
  reps INTEGER,
  sets VARCHAR,
  created_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES ACCOUNT(ID)
);


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

INSERT INTO EXERCISE(name, reps, sets, created_by) VALUES('Barbell Curl', 8, '2-3', 1);
INSERT INTO EXERCISE(name, reps, sets, created_by) VALUES('Tripcep Pushdown', 10,'2-3', 1);
INSERT INTO EXERCISE(name, reps, sets, created_by) VALUES('Dumbbell Alternate Bicep Curl', 8, '2-3', 2);
INSERT INTO EXERCISE(name, reps, sets, created_by) VALUES('Cable Hammer Curls', 10, '2-3', 2);
INSERT INTO EXERCISE(name, reps, sets, created_by) VALUES('Prayer Bench Curls', 8, '2-3', 3);
INSERT INTO EXERCISE(name, reps, sets, created_by) VALUES('Hammer Curls', 10, '2-3', 1);

DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS lineitems;


CREATE TABLE accounts(
  ID SERIAL PRIMARY KEY,
  username VARCHAR(30),
  email VARCHAR(320),
  password VARCHAR(30)
);


CREATE TABLE profiles(
  ID SERIAL PRIMARY KEY,
  username VARCHAR(10),
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  location VARCHAR(30),
  FOREIGN KEY (username) REFERENCES accounts.ID
);


CREATE TABLE exercises(
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  created_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES accounts.ID
);


CREATE TABLE workouts(
  ID SERIAL PRIMARY KEY,
  created_by INTEGER,
  name VARCHAR(30),
  followers INTEGER ARRAY[],
  date_created DATE,
  likes INTEGER,
  list_of_exercises JSON,
  FOREIGN KEY (created_by) REFERENCES accounts.ID
);


CREATE TABLE lineitems(
  ID SERIAL PRIMARY KEY,
  workout_id INTEGER,
  exercise_id INTEGER,
  FOREIGN KEY (workout_id) REFERENCES workouts.ID,
  FOREIGN KEY (exercise_id) REFERENCES exercises.ID
);

# Workout

Site Url: https://limitless-sea-87001.herokuapp.com/


## Authentication
Uses JSON web tokens for authentication 

The user must retrieve the token from a sucessful sign-in request and then use the token as header in all future requests
to the API to access protected routes.

The API assumes that the client will send the JWT token in the Authorization Header as a Bearer Token.

For example: To access a protected route the user must send a request with headers: 
  key=Authorization, value=bearer token
  
#### Here is an example of my test header:
               [
                  {"key":"Content-Type","value":"application/json"}, 
                  {"key":"Authorization","value":"bearer   eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlhdCI6MTUyMTQ0ODY1NjAwMX0.GxLzq3IdU52wkKl6DDtwQpgdPkBO-vbJrLHwi24Ji38"} 
               ]

## Authentication Routes
Below are the routes used to access the Sign-up and Sign-in operations related to workouts

### Signup for an account 
To create a workout you must send a HTTP POST request to route: https://limitless-sea-87001.herokuapp.com/sign-up

The body of the request should contain the desired username, email, and password of the account in JSON notation
#### For example:
           {
              "username": "james",
              "email": "james.gomatos@gmail.com",
              "password: "dog"
           }



### Signin to account (retrieve the json-web token to access the protected routes)

To create a workout you must send a HTTP POST request to route: https://limitless-sea-87001.herokuapp.com/sign-in

The body of the request should contain the username and password of the account in JSON notation
#### For example:
           {
              "username": "james",
              "password: "dog"
           }
           
## Workout Routes

Below are the routes used to access the CRUD operations related to workouts

### Create a workout

To create a workout you must send a HTTP POST request to route: https://limitless-sea-87001.herokuapp.com/create/workout

The body of the request should contain the name of the workout in JSON notation
#### For example:
           {
              "name": "Best Workout"
           }

### Delete a workout

To delete a workout you must send a HTTP DELETE request to the route: https://limitless-sea-87001.herokuapp.com/delete/workout/:id

where :id is the id of the desired workout to be deleted. 

The body of the request shouldn't contain anything.

### Get a list that contains the names of the logged-in user's created workouts and the workouts followed by the logged-in user.

Send a HTTP GET request to the route: https://limitless-sea-87001.herokuapp.com/workouts

The body of the request shouldn't contain anything.

### Get a list of the exercises in a workout

Send a HTTP GET request to the route: https://limitless-sea-87001.herokuapp.com/workout/:id

Where :id is the id of the workout to be viewed.

The body of the request shouldn't contain anything.

### Get a list of the most liked workouts 

Send a HTTP GET request to the route: https://limitless-sea-87001.herokuapp.com/workouts/most-liked

The body of the request shouldn't contain anything/

### Follow a workout 
Send A HTTP POST request to the route: https://limitless-sea-87001.herokuapp.com/follow/workout/:id


### Unfollow a workout

Send a HTTP DELETE request to the route: https://limitless-sea-87001.herokuapp.com/unfollow/workout/:id


## Lineitem Routes
Below are the routes used to access the Read and Delete operations related to lineitems 


### Add A Exercise Or Lineitem To A Workout

Send a HTTP POST request to the route: https://limitless-sea-87001.herokuapp.com/add/line-item

The body of the request should contain the workout_id and the exercise_id in JSON notation
#### For example:
           {
                "workout_id": 1,
                "exercise_id": 2
           }
           
### Remove A Exercise Or Lineitem From A Workout

Send a HTTP DELETE request to the route: https://limitless-sea-87001.herokuapp.com/delete/line-item

The body of the request should contain the workout_id and the exercise_id in JSON notation
#### For example:
           {
                "workout_id": 1,
                "exercise_id": 2
           }
           
           
## Exercise Routes

Below are the routes used to access the Read operations related to Exercise.

### Get a list of the different exercise categories 

Send a HTTP Get request to the route: https://limitless-sea-87001.herokuapp.com/exercise/categories

### Get a list of the different exercises in the yoga category

Send a HTTP Get request to the route: https://limitless-sea-87001.herokuapp.com/exercise/yoga

### Get a list of the different exercises in the balance category

Send a HTTP Get request to the route: https://limitless-sea-87001.herokuapp.com/exercise/balance

### Get a list of the different exercises in the weightlifting category

Send a HTTP Get request to the route: https://limitless-sea-87001.herokuapp.com/exercise/weightlifting

### Get a list of the different exercises in the weightlifting category that target muscle_group:chest

Send a HTTP Get request to the route: https://limitless-sea-87001.herokuapp.com/exercise/weightlifting/chest

### Get a list of the different exercises in the weightlifting category that taget muscle_group:legs

Send a HTTP Get request to the route: https://limitless-sea-87001.herokuapp.com/exercise/weightlifting/legs

### Get a list of the different exercises in the weightlifting category that taget muscle_group:biceps

Send a HTTP Get request to the route: https://limitless-sea-87001.herokuapp.com/exercise/weightlifting/biceps

### Get a list of the different exercises in the weightlifting category that taget muscle_group:shoulders

Send a HTTP Get request to the route: https://limitless-sea-87001.herokuapp.com/exercise/weightlifting/shoulders


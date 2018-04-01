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
  {"key":"Content-Type","value":"application/json","description":""}, 
  {"key":"Authorization","value":"bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlhdCI6MTUyMTQ0ODY1NjAwMX0.GxLzq3IdU52wkKl6DDtwQpgdPkBO-vbJrLHwi24Ji38"} 
]

## Workout Routes

Below are the routes used to acess the CRUD operations related to workouts

### Create a workout

To create a workout you must send a HTTP POST request to route: https://limitless-sea-87001.herokuapp.com/create/workout

The body of the request should contain the name of the workout in JSON notation
#### For example:
           {
              "name": "Best Workout"
           }


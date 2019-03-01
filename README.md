# Highscores API


## SETUP

Create your own '.env' file. Copy over the contents of '.env.dist'. Ask Adam to provide you with the environment values

Use 'npm install' to install the dependencies in package.json

Use 'npm start' to run this server on port 3001

## Usage

```js
POST '/users/login'
```
Use this route to log in with "username" and "password" in the POST body

```js
POST '/users/logout'
```
Use this route to log out

```js
GET '/users/status'
```
Use this route to check if anyone is currently logged in

```js
POST '/users/register'
```
Use this route to create a new user with "username" and "password" in the POST body

```js
GET '/scores/highscores'
```
Use this route to get the top 10 high scores

```js
GET '/scores/user/:username'
```
Use this route to get all the scores for a given user

```js
POST '/scores/record'
```
Use this route record a new score in the database for the logged in user (A user must be logged in, or else you'll get an error)





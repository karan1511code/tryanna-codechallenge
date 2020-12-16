The App uses Node Js to serve as the backend with Express JS built to serve API requests.

Pre-requisites :

npm
Node

The Dependencies are :

"dependencies": {
"cors": "^2.8.5",
"express": "^4.17.1",
"node-fetch": "^2.6.1"
}

how to install npm : https://www.npmjs.com/get-npm

how to install node : https://nodejs.org/en/download/

how to install nodemon : $ npm i nodemon

how to install express : $ npm i express

how to install node-fetch : $ npm i node-fetch

how to install cors : $ npm i cors

API Endpoint1 : /api/recommendation/highest_rated

API Endpoint2 : /api/recommendation/highest_rated?earliest={date}

github Link: https://github.com/karan1511code/tryanna-codechallenge

Heroku App Link: https://tryanna-code-challenge.herokuapp.com/api/recommendation/highest_rated

Heroku App Link: https://tryanna-code-challenge.herokuapp.com/api/recommendation/highest_rated?earliest=2019-02-20

To start server :$ nodemon server.js

You can change the date as you wish. If the date is invalid or beyond range it throws a status 500 message


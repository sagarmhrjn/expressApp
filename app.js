// console.log('It is working');

/* Require any module or file that we wanna use*/
var express = require('express');

var app = express();

/* So basically middleware is a function executed in the middle after the incoming request then produces an output which could be the final output passed or could be used by the next middleware until the cycle is completed, meaning we can have more than one middleware and they will execute in the order they are declared. */

/* Checking Middleware */
var logger = function (req, res, next) {
    console.log("Middleware is working...")
    next();
};
// To use our middleware
app.use(logger);

// Using app.get because we wanna handle the get request
app.get('/', function (req, res) {
    res.send('Hello World');
});

// To run our application we need to listen to a port
app.listen(5000, function () {
    console.log('Server started on 5000..');
});
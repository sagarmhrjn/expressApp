// console.log('It is working');

/* Require any module or file that we wanna use*/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

/* Static user info */
var users = [
    {
        first_name: 'Sagar',
        last_name: 'Maharjan',
        email: 'sagarmaharjan31@gmail.com'
    },
    {
        first_name: 'Jenish',
        last_name: 'Maharjan',
        email: 'jensmaharjan331@gmail.com'
    },
    {
        first_name: 'Rikee',
        last_name: 'Maharjan',
        email: 'rikeemaharjan231@gmail.com'
    },
    {
        first_name: 'Azay',
        last_name: 'Maharjan',
        email: 'ajitmaharjan3161@gmail.com'
    },
]

/* Middleware for template/view engine */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Middleware for body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Middleware for public/static folder */
app.use(express.static(path.join(__dirname, 'public')));

/* Global vars */
app.use(function (req, res, next) {
    res.locals.errors = null;
    next();
});

/* Middleware for express-validator */
app.use(expressValidator());

/* Using app.get because we wanna handle the get request */
app.get('/', function (req, res) {
    // res.send('Hello World');
    // res.json(users);
    res.render('index', {
        title: 'Employees',
        users: users
    });
});

/* Using app.post because we wanna handle the post request */
app.post('/users/add', function (req, res) {
    // console.log(req.body.first_name);
    // Setting rules for a field
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();

    // Validation Errors
    var errors = req.validationErrors();

    if (errors) {
        console.log('ERRORS!');
        res.render('index', {
            title: 'Employees',
            users: users,
            errors: errors
        });
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        console.log(newUser);
    }
});

/* To run our application we need to listen to a port */
app.listen(5000, function () {
    console.log('Server started on 5000..');
});
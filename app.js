// console.log('It is working');

/* Require any module or file that we wanna use*/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// /* Static user info
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

// Using app.get because we wanna handle the get request
app.get('/', function (req, res) {
    // res.send('Hello World');
    // res.json(users);
    res.render('index', {
        title: 'Employees',
        users: users
    });
});

// To run our application we need to listen to a port
app.listen(5000, function () {
    console.log('Server started on 5000..');
});
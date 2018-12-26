// console.log('It is working');

/* Require any module or file that we wanna use*/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

/* Database: mongojs module */
var mongojs = require('mongojs');
var db = mongojs('myClients', ['users']);
var ObjectId = mongojs.ObjectId;

var app = express();


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

/* GET request: home route */
app.get('/', function (req, res) {
    // find everything
    db.users.find(function (err, docs) {
        // docs is an array of all the documents in mycollection
        res.render('index', {
            title: 'Clients',
            users: docs
        });
    });
});

/* POST request: Add client route */
app.post('/users/add', function (req, res) {
    // console.log(req.body.first_name);
    // Setting rules for a field
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();

    // Validation Errors
    var errors = req.validationErrors();

    if (errors) {
        db.users.find(function (err, users) {
            res.render('index', {
                title: 'Clients',
                users: users,
                errors: errors
            });
        });
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        db.users.insert(newUser, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.redirect('/')
        });
    }
});

/* GET request for edit route */
app.get('/user/edit/:id', function (req, res) {
    db.users.findOne({ _id: ObjectId(req.params.id) }, function (err, user) {
        // console.log(user);
        if (err) {
            console.log(err);
        }
        res.render('edit_users', {
            title: 'Edit a client',
            user: user
        });
    });
});

/* POST request for edit route */
app.post('/user/edit/:id', function (req, res) {
    // console.log('Submitted');
    // console.log(req.body.first_name);
    // return;

    let user = {};
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    // console.log(user);

    let query = { _id: ObjectId(req.params.id) }  // where _id matches req.params.id
    // console.log(query);

    // Setting rules for a field
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();

    // Validation Errors
    var errors = req.validationErrors();

    if (errors) {
        db.users.findOne({ _id: ObjectId(req.params.id) }, function (err, user) {
            res.render('edit_users', {
                title: 'Edit a client',
                user: user,
                errors: errors
            });
        });
    } else {
        db.users.update(query, user, function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                res.redirect('/');
            }
        });
    }
});

/* DELETE route */
app.delete('/users/delete/:id', function (req, res) {
    // console.log(req.params.id);
    db.users.remove({ _id: ObjectId(req.params.id) }, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

/* To run our application we need to listen to a port */
app.listen(5000, function () {
    console.log('Server started on 5000..');
});
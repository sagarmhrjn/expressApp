// console.log('It is working');

/* Require any module or file that we wanna use*/
var express = require('express');

var app = express();

app.listen(5000, function () {
    console.log('Server started on 5000..');
});
var express = require("express");
var bodyParser = require('body-parser');
var  user = require('./route');

var app = express();

user.configure(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
module.exports = app;

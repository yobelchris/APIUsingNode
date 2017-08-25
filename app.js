var express = require("express");
var bodyParser = require('body-parser');
var route = require('./route');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
route.configure(app);
module.exports = app;

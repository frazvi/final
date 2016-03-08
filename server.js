var express = require ('express');
var bodyParser = require ('body-parser');
var logger = require ('morgan');
var mongoose = require ('mongoose');

// Create express app object
var app = express ();

// App config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(_dirname + '/public'));

// Routes
app.get('/' function (req, res) {
	res.sendFile('/index.html', {root: '.public'});
})
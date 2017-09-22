//Express
var express = require('express');
var app = express();

//Morgan
var morgan = require('morgan');

var fs = require('fs');
var http = require('http');
var path = require('path');

app.use(express.static('public'));
app.use(morgan('commin'));

mongoose = require('mongoose'),
Resource = require('./model.js'), //created model loading here
bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api', function(req, res) {
  res.json(Resource.get());
  console.log("A GET request has been made")
});

app.post('/api', function(req, res) {
  feedbackData.unshift(req.body);
  fs.writeFile('/data/dataset.json', JSON.stringify(feedbackData), 'utf8', function(err) {
    console.log(err);
  });
  res.json(feedbackData);
});

app.put('/api/:id', function(req, res) {
  console.log("A PUT request has been made");
})

app.delete('/api/:id', function(req, res) {
  Resource.delete(req.params.id);
  console.log(`Deleted resource list item \`${req.params.id}\``);
  res.status(204).end();
})

app.use(function(req, res) {
  res.status(404).send(`We aplogize. But the url ${req.originalUrl} was not found`)
});

//Port Information
var port = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080);
console.log('todo list RESTful API server started on: ' + port);

exports.app = app;










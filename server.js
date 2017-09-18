var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
mongoose = require('mongoose'),
Task = require('./model.js'), //created model loading here
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', {
  useMongoClient: true
}); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/todoListRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send(`We aplogize. But the url ${req.originalUrl} was not found`)
  });

console.log('todo list RESTful API server started on: ' + port);

exports.app = app;








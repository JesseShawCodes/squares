var express = require('express');
var app = express();
var port = process.env.PORT || 8080ç;
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

console.log('todo list RESTful API server started on: ' + port);

exports.app = app;
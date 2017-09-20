var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var path = require('path');
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

http.createServer(function(req, res) {
  
    console.log(`${req.method} request for ${req.url}`);
  
    if (req.url === "/") {
      fs.readFile("./public/index.html", "UTF-8", function(err, html) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
      });
  
    } else if (req.url.match(/.css$/)) {
  
      var cssPath = path.join(__dirname, 'public', req.url);
      var fileStream = fs.createReadStream(cssPath, "UTF-8");
  
      res.writeHead(200, {"Content-Type": "text/css"});
  
      fileStream.pipe(res);
  
    } else if (req.url.match(/.jpg$/)) {
  
      var imgPath = path.join(__dirname, 'public', req.url);
      var imgStream = fs.createReadStream(imgPath);
  
      res.writeHead(200, {"Content-Type": "image/jpeg"});
  
      imgStream.pipe(res);
  
    } else {
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.end("404 File Not Found");
    }
  
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/todoListRoutes'); //importing route
// routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send(`We aplogize. But the url ${req.originalUrl} was not found`)
});


console.log('Capstone 2 server started on: ' + port);

exports.app = app;








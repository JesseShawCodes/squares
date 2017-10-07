'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const morgan = require('morgan');
const passport = require('passport');

const {DATABASE_URL, PORT} = require('./config/config');
const {Resources} = require('./models/model');
const {User} = require('./users/models')

mongoose.Promise = global.Promise;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(DATABASE_URL, function(err, db) {
  console.log("Connected succesfully to Mongo server");
  db.close;
})

const app = express();

//User Routers 

const {router: usersRouter} = require('./users');
const {router: authRouter, basicStrategy, jwtStrategy} = require('./auth');


// Logging
app.use(morgan('common'));

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
      return res.send(204);
  }
  next();
});

app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);


// A protected endpoint which needs a valid JWT to access it
app.get(
  '/api/protected',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
      return res.json({
          data: 'rosebud'
      });
  }
);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

////////////////////////////////
////////List of Users///////////
////////////////////////////////

app.get('/api/users', (req, res) => {
  User
    .find()
    .then(post => res.json({sorry: 'Users do not have access to this page'}))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Internal Server Error'});
    });
});

////////////////////////////////
////////User by ID//////////////
////////////////////////////////

app.get('/api/users/:id', (req, res) => {
  User
    .findById(req.params.id)
    .then(post => res.json({userInformation: 'Sorry, you are not allowed access to this information'}))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Sorry. That user could not be located'});
    });
});

////////////////////////////////
//////User Links Get Request////
////////////////////////////////

app.get('/api/users/:id/links', (req, res) => {
  let userId = req.params.id;
  let ret = [];
  let rej = [];
  // console.log(`User with ID ${userId} is attempting to Post`);
  User
    .findById(userId)
    .catch(err => {
      console.error(err);
      res.status(404).json({error: 'Sorry. That user ID could not be found.'});
    })
  Resources
    .find()
    .then(post => {
      for (var i = 0; i < post.length; i++) {
        console.log(post[i].author);
        if (post[i].author = userId) {
          // console.log(`${post[i].author} is the author id`);
          // console.log(`${userId} is the author ID post`);
          // console.log(`value added`);
          ret.push(post[i]);
        }
        else {
          // console.log('value rejected');
          rej.push(post[i]);
        }
      }
      // console.log(ret);
      res.json(ret);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});


app.post('/api/users/:id/', (req, res) => {
  let id = req.params.id;
  const requiredFields = ['title', 'content', 'url'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Resources
    .create({
      title: req.body.title,
      content: req.body.content,
      url: req.body.url,
      author: id
    })
    .then(resourcePost => res.status(201).json(resourcePost.apiGet()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });
    console.log("A post has been submitted");
});

app.delete('/api/:id', (req, res) => {
  Resources
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Internal Server Error'});
    });
  console.log(`A Delete Request has been made`);
});


app.put('/api/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['title', 'content', 'url'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Resources
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

app.post('/users')

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to the database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

http.createServer(function(req, res) {
  
    console.log(`${req.method} request for ${req.url}`);
  
    if (req.url === "/") {
      console.log(`Home page should be loaded`);
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

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};
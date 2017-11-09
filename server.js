const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
const db = mongoose.connection;

const routes = require('./routes/index');
const users = require('./routes/users');

//Init Express
const app = express();

//view Engine
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Body Parser Middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public'))); 

//express session
app.use(session({
    secret: 'SECRET',
    saveUninitialized: true,
    resave: true
}));


//passport initialization
app.use(passport.initialize());
app.use(passport.session()); 

//express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

    while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param: formParam,
        msg: msg,
        value: value
    };
    }
}));

//Connect flash
app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



app.use('/', routes);
app.use('/users', users);

app.get('/testit', function(req, res) {
  console.log("Testing");
});


app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function() {
    console.log('Server started at '+app.get('port'));
})
const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongo = require('mongodb').mongo;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var User =  require('../models/user');

//register route
router.get('/register', function(req, res) {
    console.log("Register page was rendered");
    res.render('register');
});

//login route

router.get('/login', (req, res) => {
    res.render('./app', {
      smallheader: `
      <section class="small-header-logo">
          <img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text">
      </section>
    `,
      masthead: ``,
      bgprimary: ``,
      login: `
          <div class="login">
          <label>
          <h1>Login</h1>
          <form class="loginform" action="/login" method="post">
              <label>Username</label>
              <input class="form-control" placeholder="username" name="username" type="text">
              <label>Password</label>
              <input class="form-control" placeholder="password" name="password" type="password" value="">
              <div class="submit">
              <input type="submit" value="Log In">
              </div>
          </form>
          </label>
          <div class="loginerror hidden">You did not enter a correct username and/or password</div>
          <div class="testlogin">
          <span>To test this application, use the following:</span>
          <span>Login: demo</span>
          <span>Password: p@$$word2017</span>
          </div>
          <div class="newuser">
              <span>New User? Click Below to Register</span>
              <button class="registerbutton">Register</button>
          </div>
          </div>
      `,
      register: `
      <div class="register hidden">
        <h1>Register</h1>
        <form class="registerform">
            <label>Username</label>
            <input type="text" class="usernameregister" name="username">
            <label>Password</label>
            <input type="text" class="passwordregister" name="password">
            <span class="passwarning1 hidden">Password must have a minimum of 10 characters</span>
            <label>Confirm Password</label>
            <input type="text" class="passwordconfirm" name="passwordconfirm">
            <span class="passwarning2 hidden">Your passwords do not match</span>
            <label>First Name</label>
            <input type="text" class="firstname" name="firstname">
            <label>Last Name</label>
            <input type="text" class="lastname" name="lastname">
            <div class="submit">
            <input type="submit">
            </div>
        </form>
        <section>
            <span>Already registered? Click below to login</span>
            <button class="showlogin">Login</button>
        </section>
      </div>
      `,
      inputform: ``,
      readmore: ``,
      editform: ``,
      GridContent: ``,
      contact: ``
    })
});
  

//register route
router.post('/register', function(req, res) {
    console.log("New user is being registered"); 
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let confirm = req.body.confirm;

    //Validation 
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirm', 'Passwords do not match').equals(req.body.password);
    let errors = req.validationErrors();
    if(errors) {
        res.render('register', {
            errors: errors
        });
    }
    else {
        console.log("No Errors");
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });
        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });
        req.flash('success_msg', 'You are registerd and can now login');
        res.redirect('/users/login');
    }
});

/*
passport.use(new localStrategy(
    function(username, password, done) {
        console.log("Local Strategy was executed");
        User.find(`{'username': '${username}'}`);

        User.getUserByUsername(username, function(err, user) {
            // console.log(`username is ${username}`);
            // console.log(`User.password is ${User.password}`);
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: "unknown user"});
            }
        })

        console.log(User.getUserByUsername(username));
        User.comparePassword(password, User.password, function(err, isMatch) {
            // console.log(`User.password is ${User.password}`);
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            }
            else {
                return done(null, false, {message: "Invalid Password"});
            }
        })
    }
));
*/

passport.use(new localStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (user) {
            let userPassword = user.password; 
        }
        if (err) { 
            return done(err); 
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
            // console.log(`User.password is ${User.password}`);
            if (err) { 
                return done(err); 
            }
            if (isMatch) {
                console.log("It's a match");
                return done(null, user);
            }
            else {
                console.log("Invalid Password");
                return done(null, false, {message: "Invalid Password"});
            }
        })
      });
    }
  ));

//Local Strategy

passport.deserializeUser(function(id, done) {
    console.log("Deserializer was used");    
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
});

passport.serializeUser(function(user, done) {
    console.log("Serializer was used");
    return done(null, user.id);
});


//Post Request to Login
router.post('/login',
    passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}), 
    function(req, res) {
        console.log("User attempted login");
        res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router; 
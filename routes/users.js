const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var User =  require('../models/user');

console.log("User route loaded");

//login route

router.get('/login', (req, res) => {
    console.log("User is on login page")
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
    console.log("User has attempted to register");
    var username = req.body.username;
    var password = req.body.password;
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    console.log(username);
    var newuser = new User();
    newuser.username = username;
    newuser.password = password;
    newuser.firstName = firstName;
    newuser.lastame = lastName;
    console.log(newuser);
    newuser.save(function(err, save) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    })
})

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
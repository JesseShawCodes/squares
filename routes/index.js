
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

var User =  require('../models/user');
var Resources = require('../models/model');


router.get('/', (req, res) => {
    res.render('./app', {
      smallheader: `
        <section class="small-header-logo">
            <img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text">
        </section>
        <section class="right-elements">
            <a href="/login">
            <span class="login-here">Login</span>
            <i class="fa fa-plus-circle hidden" aria-hidden="true" onclick="showSubmit()"></i>
            </a>
        </section>
      `,
      masthead: `
        <section class="masthead">
            <div class="header-content">
              <div class="header-content-inner">
                  <img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text">
                  <div id="headingbackground">
                      <h1 id="homeheading">Your projects resource storage database</h1>
                  </div>
                <hr>
                <p></p>
              </div>
            </div>
        </section>
      `,
      bgprimary: `
          <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto text-center">
              <h2 class="section-heading text-white">How to use the application</h2>
              <hr class="light">
              <div class="directions">
              <p class="text-faded">This app is an online resource database to save resources for your project team and yourself.</p>
              </div>
              <!--
              <a class="btn btn-default btn-xl js-scroll-trigger" href="app.html">Click Here to try out the app!</a>
              -->
            </div>
          </div>
        </div>
      `,
      login: ``,
      register: ``,
      inputform: ``,
      readmore: ``,
      editform: ``,
      GridContent: ``,
      contact: `
          <footer>
          <div class="container">
              <div class="row">
                  <div class="col-lg-8 mx-auto text-center">
                      <h2 class="section-heading">Questions about the App?</h2>
                      <hr class="primary">
                      <p class="contactp">If you have any questions regarding this project, feel free to contact Jesse Shaw at any of the points of contact below:</p>
                  </div>
              </div>
          <div class="contactpoints">
              <div class="col-lg-4 ml-auto text-center">
                  <i class="fa fa-phone fa-3x sr-contact"></i>
                  <p><a href="tel:410-703-6125">410-703-6125</a></p>
              </div>
              <div class="col-lg-4 mr-auto text-center">
                  <i class="fa fa-envelope-o fa-3x sr-contact"></i>
                      <p>
                          <a href="mailto:your-email@your-domain.com">jdshaw1987@gmail.com</a>
                      </p>
              </div>
              <div class="col-lg-4 mr-auto text-center">
                  <i class="fa fa-github fa-3x sr-contact"></i>
                      <p>
                          <a href="https://github.com/thejesseshaw">GitHub</a>
                      </p>
              </div>  
              <div class="col-lg-4 mr-auto text-center">
                  <a href="index.html">
                      <img src="/Images/Logo/JPG/Logo3.jpg" alt="Squares Logo">
                  </a>
              </div>
          </div>
          </div>
      </footer>
      `
    });
    console.log("Landing Page loaded");
});

///Login Page///

router.get('/login', (req, res) => {
    console.log("Register");
    res.render('./app', {
      smallheader: `
      <section class="small-header-logo">
          <a href="/"><img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text"></a>
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
              <input type="text" class="username" name="username"/>
              <label>Password</label>
              <input type="text" class="password" name="password"/>
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
              <a href="/register"><button class="registerbutton">Register</button></a>
          </div>
          </div>
      `,
      register: `
      `,
      inputform: ``,
      readmore: ``,
      editform: ``,
      GridContent: ``,
      contact: ``
    })
});

///Register Page///

router.get('/register', (req, res) => {
    res.render('./app', {
      smallheader: `
      <section class="small-header-logo">
          <a href="/"><img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text"></a>
      </section>
    `,
      masthead: ``,
      bgprimary: ``,
      login: `
      `,
      register: `
      <div class="register">
        <h1>Register</h1>
        <form class="registerform">
            <label>Username</label>
            <input type="text" class="usernameregister" name="username">
            <label>Password</label>
            <input type="text" class="passwordregister" name="password" autocomplete="off">
            <span class="passwarning1 hidden">Password must have a minimum of 10 characters</span>
            <label>Confirm Password</label>
            <input type="text" class="passwordconfirm" name="confirm"  autocomplete="off">
            <span class="passwarning2 hidden">Your passwords do not match</span>
            <label>First Name</label>
            <input type="text" class="firstname" name="firstname">
            <label>Last Name</label>
            <input type="text" class="lastname" name="lastname">
            <div class="submitsection">
            <button type="submit" class="submit">Submit</button>
            </div>
        </form>
        <section>
            <span>Already registered? Click below to login</span>
            <a href="/login"><button class="showlogin">Login</button></a>
        </section>
      </div>
      `,
      inputform: ``,
      readmore: ``,
      editform: ``,
      GridContent: ``,
      contact: ``
    })
    console.log("Register")
});

//register route

router.post('/register', function(req, res) {
    console.log("User has attempted to register via index route");
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, 10);
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    var newuser = new User();
    newuser.username = username;
    newuser.password = password;
    newuser.firstName = firstName;
    newuser.lastName = lastName;
    let userId = newuser._id;
    // console.log(newuser);
    User.create(newuser, function(err, user) {
        if(err) {
            return err;
        }
        else {
            res.status(201).send();
        }
    });
})

module.exports = router;
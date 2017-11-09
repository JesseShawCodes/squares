
const express = require('express');
const router = express.Router();

var User =  require('../models/user');
var Resources = require('../models/model');

console.log("index route loaded");

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
    console.log("User has attempted to register");
    var username = req.body.username;
    var password = req.body.password;
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;

    var newuser = new User();
    newuser.username = username;
    newuser.password = password;
    newuser.firstName = firstName;
    newuser.lastame = lastName;
    newuser.save(function(err, save) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    })
    User.create(newuser, function (err, user) {
        if (err) {
          return next(err)
        } else {
          return res.redirect('/profile');
        }
    });
})

////////////////////////////////
////////List of Users///////////
////////////////////////////////


router.get('/app/:id', (req, res) => {
    let userId = req.params.id;
    let ret = [];
    let rej = [];
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
          if (post[i].image == undefined) {
            post[i].image = "/Images/Logo/JPG/Logo3.jpg";
          }
          if (post[i].author == userId) {
            let postSection = `
          <section class="resource" id="${post[i]._id}">
            <span><h1>${post[i].title}</h1></span> 
            <span>${post[i].content}...</span>
            <img src="${post[i].image}" alt="${post[i].title} resource">
            <section class="clickableitems">
            <span class="link"><button onclick="readMore('${post[i]._id}')">Click Here To Read More</button></span>
            <span class="link"><a href='${post[i].link}' target="_blank"><button>Visit Resource</button></a></span>
            <section class="delete-request" onclick="deleteResource('${post[i]._id}', '${post[i].author}');"><button>Delete</button></section>
            <section class="edit-request" onclick="editResource('${post[i]._id}', '${post[i].author}');"><button>Edit</button></section>
            </section class="clickableitems">
          </section>
          `
            ret.push(postSection);
          }
          else {
            rej.push(post[i]);
          }
        }
        // console.log(ret);
        var gridItems = ret.join('');
        res.render('./app', {
          masthead: ``,
          bgprimary: ``,
          login: ``,
          register: ``,
          GridContent: `
          <div class="grid" onload="startMasonry()">
          ${gridItems}
          </div>
          `,
          smallheader: `            
          <section class="small-header-logo">
              <a href="/">
              <img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text">
              </a>
          </section>
          <section class="right-elements">
              <section class="plus-sign">
                      <i class="fa fa-plus-circle" aria-hidden="true" onclick="showSubmit()"></i>
              </section>
              <a href="/">
              <span class="login-here">Logout</span>
              </a>  
          </section>`,
          inputform: `            
          <div class="formsection">
          <label>
              <h1 class="greeting"></h1>
          <form class="resoure-submit" onsubmit="submitIt(event, '${userId}') & setTimeout(function () { window.location.reload(); }, 1000)">
              <label for="title">Title</label>
              <input type="text" class="title">
              <label for="description">Description</label>
              <textarea type="text" class="description"></textarea>
              <label for="link">Link</label>
              <input type="text" class="link">
              <div class="submit">
              <input type="submit">
              </div>
          </form>
          </label>
          </div>
              `,
          readmore: `            
            <div class="readmore hidden">
            <form>
                <section class="readmorecontent">
                    <h2 class="title"></h2>
                    <p class="description-readmore"></p>
                    <img class="sourceimage">
                    <a class="link-readmore"></a>
                </section>
                    <input type="button" value="Close" onclick="closeReadMore()">
            </form>
            </div>
          `,
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
            `,
          editform: `            
            <div class="editformsection">
            <form class="editform hidden">
                <h1>Edit Resource</h1>
                <label>Title</label>
                <input type="text" class="title edit-title">
                <label>Description</label>
                <textarea type="text" class="description edit-description"></textarea>
                <label>Link</label>
                <input type="text" class="link edit-link">
                <div class="submit">
                <input type="submit">
                <!--
                <input type="button" value="Close" onclick="closeEdit()">
                -->
                </div>
            </form>
            </div>
          `
        })
        // res.json(ret);
        // res.render('./app.ejs');
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went horribly awry'});
      });
});
  
router.get('/api/users', (req, res) => {
    User
      .find()
      .then(post => res.json({sorry: 'Users do not have access to this page'}))
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
      });
});
  
router.get('/api/links', (req, res) => {
    Resources
    .find()
    .then(posts => {
      res.json({
        posts: posts.map(post => post.apiGet())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Internal Server Error'});
    });
});
  
////////////////////////////////
////////User by ID//////////////
////////////////////////////////
  
router.get('/api/users/:id', (req, res) => {
    User
      .findById(req.params.id)
      .then(post => res.json(post.apiRepr()))
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Sorry. That user could not be located'});
      })
});
  
////////////////////////////////
//////User Links Get Request////
////////////////////////////////
  
router.get('/api/users/:id/links', (req, res) => {
    let userId = req.params.id;
    let ret = [];
    let rej = [];
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
          if (post[i].author == userId) {
            ret.push(post[i]);
          }
          else {
            rej.push(post[i]);
          }
        }
        res.json(ret);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went horribly awry'});
      });
});
  
router.post('/api/users/:id/', (req, res) => {
    let id = req.params.id;
    const requiredFields = ['title', 'content', 'link'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    // getImage(req.body.link);
    let link = req.body.link;
    console.log(link)
    var imageLink = "Empty Link";
    metaget.fetch(req.body.link, function (err, meta_response) {
      if(err){
          console.log(err);
      }
      else {
          // let imgageLink = meta_response['og:image'];
          imageLink = meta_response['og:image'];
      }
      Resources
      .create({
        title: req.body.title,
        content: req.body.content,
        link: req.body.link,
        author: id,
        image: imageLink
      })
      .then(resourcePost => res.status(201).json(resourcePost.apiGet()))
      .catch(err => {
          console.error(err);
          res.status(500).json({error: 'Something went wrong'});
      });
    });
    console.log("A post has been submitted");
});
  
router.delete('/api/:id', (req, res) => {
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
  
  
router.put('/api/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
      res.status(400).json({
        error: 'Request path id and request body id values must match'
      });
    }
  
    const updated = {};
    const updateableFields = ['title', 'content', 'link'];
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
  
router.use('*', function(req, res) {
    res.status(404).json({message: 'Not Found'});
});

module.exports = router;
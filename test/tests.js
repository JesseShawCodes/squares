const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

var should = chai.should();
const {app, runServer, closeServer} = require('../server');
var storage = server.storage;

chai.use(chaiHttp);

//Tests

describe('index page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });
});



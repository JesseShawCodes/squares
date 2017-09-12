
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app} = require('../server');

const should = chai.should();

chai.use(chaiHttp);


// var expect = require('chai').expect;

describe('Capstone 2 functions', function() {
    it('should return appropriate status', function() {
        return chai.request(app)
            .get('/')
            .then(function(res) {
                res.should.have.status(200);
            })
    });
});
const apps = require('supertest');
const assert = require('assert');
const app = require('../server');
var should = require('chai').should();
var expect = require('chai').expect();
//import { ensureToken }  from '../server';
//
describe('POST /auth/signup', function () {
    let 	comfirm = {
        "id" :  1,
        "email" : "myemail@this.come",
    "name" : "this",
    "lname" : "lastname",
    "address" : "address"
}
    it('respond with json containing the registered', function (done) {
        apps(app)
            .post('/auth/signup')
            .send(comfirm)
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});
describe('GET /car/:carid', function () {
    it('respond with json The car was not found', function (done) {
        apps(app)
            .get('/car/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('The car was not found', done()) 
    });
});
describe('GET /car', function () {
let noquerycar =[];
    it('respond with json The car was not found', function (done) {
        apps(app)
            .get('/car')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('no car ad to display', done()) 
    });
});



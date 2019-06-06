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
    
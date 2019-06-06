const apps = require('supertest');
const assert = require('assert');
const app = require('../fortest');
var should = require('chai').should();
var expect = require('chai').expect();
//import { ensureToken }  from '../server';
//

describe('POST /auth/signup endpoint', function () {
    let 	comfirms = {
        "email" : "testemail" ,
         "first_name" : "test firstname",
         "last_name" : "testlast" ,
          "password" : "thepassword",
           "address" : "testaddress"
        }
    it('respond with json containing the registered', function (done) {
        apps(app)
            .post('/auth/signup')
            .send(comfirms)
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    
});
describe('POST /auth/signup endpoint', function () {
    let 	comfirms = {
        "email" : "testemail" ,
         "first_name" : "test firstname",
         "last_name" : "testlast" ,
          "password" : "thepassword",
           "address" : "testaddress"
        }
    it('respond with json containing  error msg email is taken', function (done) {
        apps(app)
            .post('/auth/signup')
            .send(comfirms)
            .set('Accept', 'application/json')
            .expect(409, done);
    });
    
});
describe('POST /auth/signin endpoint', function () {
    let 	comfirms = {"user" : "testemail" , "pass" : "thepassword"}
    it('respond with json details of user', function (done) {
        apps(app)
            .post('/auth/signin')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(200, done);
    });
    
});
describe('POST /auth/signin endpoint', function () {
    let 	comfirms = {"user" : "testemail" , "pass" : "wrongpassword"}
    it('unauthorize error', function (done) {
        apps(app)
            .post('/auth/signin')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(401, done);
    });
    
});
describe('GET /car/:carid endpoint', function () {
    it('respond with json The car was not found', function (done) {
        apps(app)
            .get('/car/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('The car was not found', done()) 
    });
});
describe('GET /car endpoint', function () {
    it('respond with json The car was not found', function (done) {
        apps(app)
            .get('/car')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('no car ad to display', done()) 
    });
});

describe('POST /car endpoint', function () {
    let 	comfirms = {
        "pcman" : "car manufacturer" ,
         "pcmodel" : "carmodel",
         "pccolor" : "color" ,
          "pces" : "21000",
           "pprice" : "1000",
           "stateocar" : "new" ,
            "pcpics" : "fromcloud",
            "pcposter":"emailofposter"}
    it('respond with json containing Car posted successfully', function (done) {
        apps(app)
            .post('/car')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(200, done);
    });
    
});
describe('PATCH /car/:carid/price endpoint', function () {
    let 	comfirms = {
        "owneremail" : "emailofposter",
        "dnewprice" : "2000"
    }
    it('respond with json containing The price have been changed', function (done) {
        apps(app)
            .patch('/car/1/price')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(200, done);
    });
    
});
describe('GET /car/:carid endpoint', function () {
    it('respond with json of the car details', function (done) {
        apps(app)
            .get('/car/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('The car was not found', done()) 
    });
});
describe('GET /allcars endpoint', function () {
    
        it('respond with allcars ', function (done) {
            apps(app)
                .get('/allcars')
                .expect('Content-Type', /json/)
                .expect(200, done()) //expecting HTTP status code
        });
    });
    describe('GET /allusers endpoint', function () {
        
            it('respond with all users ', function (done) {
                apps(app)
                    .get('/allusers')
                    .expect('Content-Type', /json/)
                    .expect(200, done()) //expecting HTTP status code
            });
        });
        describe('GET /me endpoint', function () {
            
                it('respond with json containing user data ', function (done) {
                    apps(app)
                        .get('/me')
                        .expect("Authorization", "Bearer ")
                        .expect(200, done()) //expecting HTTP status code
                });
            });
            describe('POST /order endpoint', function () {
                let 	comfirms = {
                    "poid" : "1" ,
                     "popoid" : "1",
                     "poprice" : "1000" ,
                      "stateocarp" : "pending",
                       "popprice" : "1000"
                }
                it('respond with json containing order sent successfully', function (done) {
                    apps(app)
                        .post('/order')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .expect(200, done);
                });
                
            });
            describe('PATCH /order/:orderrid/price', function () {
                let 	comfirms ={"newpoprice" : "2000"}
                it('respond with json containing The order price have been changed', function (done) {
                    apps(app)
                        .patch('/order/1/price')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .expect(200)
                        .expect({
                            "status" : 200,
                            "data" : {
                            "id" : 1,
                            "car_id" : "1",
                            "status" : "pending",
                            "old_price_offered" : "1000",
                            "new_price_offered" : "2000"
                            },
                            "message" : "Your order price have been updated successfully"
                            }, done);
                });
                
            });
            describe('POST /flag endpoint', function () {
                let 	comfirms = {
                    "repby" : "reporter@.com",
                "car_id" : "1",
                "rereason" : "fraud",
                "redes" : "fraud"
            }
                it('respond with json containing your report is sent successfully', function (done) {
                    apps(app)
                        .post('/flag')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .expect(200,done)
                        
                });
                
            });
           
            describe('GET /car', function () {
                it('respond with json of the car with status available', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'status' : 'sold'})
                        .expect(404) //expecting HTTP status code
                        .expect('The car was not found', done()) 
                });
            });
            describe('GET /car', function () {
                it('respond with json of the car with status available', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'min_price' : '100'})
                        .expect(404, done()); //expecting HTTP status code
                        
                });
            });
            describe('delete /car/:carid', function () {
                it('respond with json delete succesfull', function (done) {
                    apps(app)
                        .delete('/car/1')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(404) //expecting HTTP status code
                        .expect('The car was not found', done()) 
                        
                });
            });
            
    


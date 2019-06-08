const apps = require('supertest');
const assert = require('assert');
const app = require('../server.js');
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
    let 	notcomfirms = {"user" : "testemaioool" , "pass" : "thepassword"}
    it('respond with json details of user', function (done) {
        apps(app)
            .post('/auth/signin')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(200, done);
    });
    it('respond with 404 unexistence email', function (done) {
        apps(app)
            .post('/auth/signin')
            .send(notcomfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(404, done);
    });
});
describe('POST /auth/signin with wrong password', function () {
    let 	comfirms = {"user" : "testemail" , "pass" : "thepa"}
    it('respond with 401 unauthorised', function (done) {
        apps(app)
            .post('/auth/signin')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(401, done);
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
    it('respond The car was not found', function (done) {
        apps(app)
            .get('/car/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done) //expecting HTTP status code
            
    });
});
describe('GET /car endpoint', function () {
    it('respond with json The car was not found', function (done) {
        apps(app)
            .get('/car')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect({
                "status":404,
                "msg":"no car ad to display"
            }, done) 
    });
});

describe('POST /car endpoint', function () {
    let 	comfirms = {
        "pcman" : "carmanufacturer" ,
         "pcmodel" : "carmodel",
         "pccolor" : "color" ,
          "pces" : "21000",
           "pprice" : "1000",
           "stateocar" : "new" ,
            "pcpics" : "fromcloud",
            "pcposter":"emailofposter",
            "pcowner" : 1
        }
    it('respond with json containing Car posted successfully', function (done) {
        apps(app)
            .post('/car')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(200, done);
    });
    
});
describe('POST /car endpoint', function () {
    let 	comfirms = {
        "pcman" : "carmanufacturers" ,
         "pcmodel" : "carmodels",
         "pccolor" : "colors" ,
          "pces" : "21001",
           "pprice" : "2000",
           "stateocar" : "new" ,
            "pcpics" : "fromclouds",
            "pcposter":"emailofposter",
            "pcowner" : 1
        }
    it('respond with json containing Car posted successfully', function (done) {
        apps(app)
            .post('/car')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(200, done);
    });
    
});
describe('GET /car no query get all endpoint', function () {
    it('respond with json of all car', function (done) {
        apps(app)
            .get('/car')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
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

describe('GET /car/:carid unexistence car endpoints', function () {
    it('respond with json of the car details', function (done) {
        apps(app)
            .get('/car/3')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect({"error" : "The car was not found"	}, done) 
    });
});
describe('GET /car/:carid  existing car endpoint', function () {
    it('respond json of car with id \"1\"', function (done) {
        apps(app)
            .get('/car/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done) //expecting HTTP status code
            
    });
});
describe('GET /allcars endpoint', function () {
    
        it('respond with allcars ', function (done) {
            apps(app)
                .get('/allcars')
                .expect('Content-Type', /json/)
                .expect(200, done) //expecting HTTP status code
        });
    });
    describe('GET /allusers endpoint', function () {
        
            it('respond with all users ', function (done) {
                apps(app)
                    .get('/allusers')
                    .expect('Content-Type', /json/)
                    .expect(200, done) //expecting HTTP status code
            });
        });
        describe('GET /me endpoint', function () {
            
                it('respond with 403 ', function (done) {
                    apps(app)
                        .get('/me')
                        .set("Authorization", "Bearer ")
                        .expect('Forbidden', done) //expecting HTTP status code
                });
            });
            describe('GET /me endpoint', function () {
            
                it('respond with 403 ', function (done) {
                    apps(app)
                        .get('/me')
                        .set("Authorization", "Bearer 7o757ygvhvhgfiuytuyguyhgiuftyfgufg")
                        .expect(403, done) //expecting HTTP status code
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
                it('respond with json containing error message', function (done) {
                    apps(app)
                        .patch('/order/0/price')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .expect(404, done);
                        
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
            
           
            describe('GET /car with status query', function () {
                it('respond with json of the car not found', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'status' : 'sold'})
                        .expect({
                            "status":404,
                            "msg":"no result for this request"
                        }, done) //expecting HTTP status code
                       
                });
            });
            describe('GET /car with body_type query', function () {
                it('respond with json of the car not found', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'body_type' : 'f545vfcx'})
                        .expect({
                            "status":404,
                            "msg":"no result for this request"
                        }, done) //expecting HTTP status code
                       
                });
            });
            describe('GET /car with min_price query', function () {
                it('respond with json no result found', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'min_price' : '10000000000000000000000000000'})
                        .expect({
                            "status":404,
                            "msg":"no result for this request"
                        }, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with max_price query', function () {
                it('respond with json of not found', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'max_price' : '1'})
                        .expect({
                            "status":404,
                            "msg":"no result for this request"
                        }, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with manufacturer query', function () {
                it('respond with json of not found', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'manufacturer' : '1sd3223cdfe3'})
                        .expect({
                            "status":404,
                            "msg":"no result for this request"
                        }, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with state query', function () {
                it('respond with json of not found', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'state' : 'invalidstate'})
                        .expect({
                            "status":404,
                            "msg":"no result for this request"
                        }, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with correct body_type query', function () {
                it('respond with json of the cars with body type given', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'body_type' : 'color'})
                        .expect(200, done); //expecting HTTP status code
                        
                       
                });
                it('respond with bad request due to typo', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'body_tpe' : 'color'})
                        .expect(400, done); //expecting HTTP status code
                });
                it('respond with bad request due to typo for max price', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'max_price' : 'color'})
                        .expect(400, done); //expecting HTTP status code
                });
                it('respond with bad request due to typo for min price', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'min_price' : 'color'})
                        .expect(400, done); //expecting HTTP status code
                });
            
            });
            
            describe('GET /car with state query', function () {
                it('respond with json with new cars', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'state' : 'new'})
                        .expect(200, done); //expecting HTTP status code
                        
                });

            });
            describe('GET /car multiple conflicting queries', function () {
                it('respond with 404 not found state:true body_type:false', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'state' : 'new'})
                        .query({'body_type' : 'bluu'})
                        .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found state:false body_type:true', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'body_type' : 'color'})
                        .query({'state' : 'grr'})
                        
                        .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found status:false body_type:true', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'status' : 'no'})
                        .query({'state' : "new"})
                       
                        
                         .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found status:true min_price:false', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'min_price' : "10000000000000000"})
                        .query({'body_type' : 'color'})
                                               
                        .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found status:true min_price:false', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'body_type' : 'bee'})
                        .query({'min_price' : "10"})
                        
                                               
                        .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found status:true min_price:false', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'max_price' : "1"})
                        .query({'state' : 'new'})
                        
                        
                        
                        .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found ', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'min_price' : "11000000000000000000000000000"})
                        .query({'state' : 'new'})
                        
                        
                        
                        .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found ', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'state' : 'newold'})
                        .query({'max_price' : "1100000000000"})
                         
                        .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found ', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'manufacturer' : "wrong"})
                        .query({'max_price' : "1100000000000"})
                         
                          .expect(404, done); //expecting HTTP status code
                        
                });
               
                

            });
            describe('GET /car with status available query', function () {
                it('respond with json with available cars', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'status' : 'available'})
                        .expect(200, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with correct min_price query', function () {
                it('respond with json with cars price above 100', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'min_price' : '100'})
                        .expect(200, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with correct max_price query', function () {
                it('respond with json with cars price below 7000', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'max_price' : '7000'})
                        .expect(200, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with correct manufacturer query', function () {
                it('respond with json with cars the manufacture \"carmanufacturer\"', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'manufacturer' : 'carmanufacturer'})
                        .expect(200, done); //expecting HTTP status code
                        
                });
            });
            describe('PATCH /car/:carid/status endpoint', function () {
                
                it('respond with json containing The status of car changed to sold', function (done) {
                    apps(app)
                        .patch('/car/1/status')
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .expect(200, done);
                });
                
            });
            describe('PATCH /car/0/status nonexistence car  endpoint', function () {
                
                it('respond with json containing The status error', function (done) {
                    apps(app)
                        .patch('/car/0/status')
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .expect(404, done);
                });
                
            });
            describe('GET /car with status sold query', function () {
                it('respond with json with sold cars', function (done) {
                    apps(app)
                        .get('/car')
                        .query({'status' : 'sold'})
                        .expect(200, done); //expecting HTTP status code
                        
                });
            });
            describe('delete /car/:carid', function () {
                it('respond with json delete succesfull', function (done) {
                    apps(app)
                        .delete('/car/1')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200, done) //expecting HTTP status code
                       
                        
                });
                it('try to delete nonexisting car respond with 404 not found', function (done) {
                    apps(app)
                        .delete('/car/10')
                        .expect('Content-Type', /json/)
                        .expect(404, done) //expecting HTTP status code
                       
                        
                });
            });
            describe('PATCH /car/:carid/price nonexistence carid endpoint', function () {
                let 	comfirms = {
                    "owneremail" : "emailofposter",
                    "dnewprice" : "2000"
                }
                it('respond with json 404 not found', function (done) {
                    apps(app)
                        .patch('/car/1/price')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .expect({
                            "status" : 404,
                            "error" : "404 not found",
                            "message" : "Oops cant find this ad or have been sold"
                            }, done);
                });
                
            });

            //export COVERALLS_REPO_TOKEN=uXXej4MsUdasVhX6yL01XTtWMJR82UyJo

    


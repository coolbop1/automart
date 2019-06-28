const apps = require('supertest');
const assert = require('assert');
const app = require('../server.js');
var should = require('chai').should();
var expect = require('chai').expect();
//import { ensureToken }  from '../server';
//
describe('delete all test inputs', function () {
    it('respond with json delete succesfull', function (done) {
        apps(app)
           .get('/api/v1/user/truncateuser')
            .expect(200 ,done)
    });
    
    it('respond with json delete succesfull', function (done) {
        apps(app)
           .get('/api/v1/user/truncatepostad')
            .expect(200 ,done)
    });
     it('respond with json delete succesfull', function (done) {
        apps(app)
           .get('/api/v1/user/truncateorders')
            .expect(200 ,done)
    });
     it('respond with json delete succesfull', function (done) {
        apps(app)
           .get('/api/v1/user/truncatereports')
            .expect(200 ,done)
    });
    
})
describe('POST /auth/signup endpoint', function () {
    let 	comfirms = {
        
         "first_name" : "test firstname",
         "last_name" : "testlast" ,
         "email" : "domrand9@gmail.com" ,
         "address" : "testaddress",
          "password" : "thepassword"
           
        }
    it('respond with json containing the registered', function (done) {
        apps(app)
            .post('/api/v1/auth/signup')
            .send(comfirms)
            .set('Accept', 'application/json')
            .expect(201, done);
    });
    
});
describe('POST /auth/signup endpoint', function () {
    let 	comfirms = {
        "email" : "domrand9@gmail.com",
         "first_name" : "test firstname",
         "last_name" : "testlast",
          "password" : "thepassword",
           "address" : "testaddress"
        }
        let comfirmsy = {
            "email" : "","first_name" : "","last_name" : "","password" : "","address" : "testaddress"
            }
    it('respond with json containing  error msg email is taken', function (done) {
        apps(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/json')
            .send(comfirms)
            .expect(409, done);
    });
    it('respond with json containing  cant be empty', function (done) {
        apps(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/json')
            .send(comfirmsy)
            .expect(409, done);
    });
    
});
describe('POST /auth/signin endpoint', function () {
    let 	comfirms = {"email" : "domrand9@gmail.com" , "password" : "thepassword"}
    
    it('respond with json details of user', function (done) {
        apps(app)
            .post('/api/v1/auth/signin')
            .set("Content-Type", "application/json; charset=UTF-8")
            .send(comfirms)
            .expect(200, done);
    });
})
describe('authorized test', function () {
    let 	comfirms = {"email" : "domrand9@gmail.com" , "password" : "thepassword"}
    before(function(done){
        apps(app)
        .post('/api/v1/auth/signin')
        .send(comfirms)
        .end(function(err, res){
            token = res.body.data.token;
            done();
        })
        
    })
    describe('GET /car endpoint', function () {
        it('respond with json The car was not found', function (done) {
            apps(app)
                .get('/api/v1/car')
                .set('Accept', 'application/json')
                .set("Authorization", "Bearer "+token)
                .expect(404, done) 
        });
    });
    describe('POST /me endpoint', function () {
        let 	comfirmsy = {"email" : "" , "password" : ""}
    let 	notcomfirms = {"email" : "testemaioool@email.coml" , "password" : "thepassword"}
    it('respond with authorized ', function (done) {
        apps(app)
            .get('/api/v1/me')
            .set("Authorization", "Bearer "+token)
            .expect('Content-Type', /json/, done) //expecting HTTP status code
    });
    it('respond with not authorized ', function (done) {
        apps(app)
            .get('/api/v1/me')
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(403, done);
    });
    it('respond with 404 unexistence email', function (done) {
        apps(app)
            .post('/api/v1/auth/signin')
            .send(notcomfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(404, done);
    });
    it('respond with 409 conflict', function (done) {
        apps(app)
            .post('/api/v1/auth/signin')
            .send(comfirmsy)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(409, done);
    });
});
describe('POST /auth/signin with wrong password', function () {
    let 	comfirms = {"email" : "domrand9@gmail.com" , "password" : "thepassssss"}
    it('respond with 401 unauthorised', function (done) {
        apps(app)
            .post('/api/v1/auth/signin')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(401, done);
    });
    
});
describe('POST /auth/signin endpoint', function () {
    let 	comfirms = {"email" : "domrand9@gmail.com" , "password" : "wrongpassword"}
    it('unauthorize error', function (done) {
        apps(app)
            .post('/api/v1/auth/signin')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .expect(401, done);
    });
    
});
describe('GET /car/:carid endpoint', function () {
    it('respond The car was not found', function (done) {
        apps(app)
            .get('/api/v1/car/0')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer "+token)
            .expect(404, done) //expecting HTTP status code
            
    });
    
});
describe('GET /car endpoint', function () {
    it('respond with json The car was not found', function (done) {
        apps(app)
            .get('/api/v1/car')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer "+token)
            .expect(404, done) 
    });
});


describe('POST /car endpoint', function () {
    let 	comfirms = {
        "manufacturer" : "carmanufacturers" ,
         "model" : "carmodels",
         "body_type" : "colors" ,
          "engine_size" : "21001",
           "price" : "2000",
           "state" : "new" ,
            "pics" : "fromclouds",
            
        }
        let 	comfirmsy = {
            "manufacturer" : "" ,
             "model" : "carmodels",
             "body_type" : "colors" ,
              "engine_size" : "21001",
               "price" : "2000",
               "state" : "new" ,
                "pics" : "fromclouds",
                
            }
    it('respond with json containing Car posted successfully', function (done) {
        apps(app)
            .post('/api/v1/car')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .set("Authorization", "Bearer "+token)
            .expect(201, done);
    });
    it('respond with json conflict', function (done) {
        apps(app)
            .post('/api/v1/car')
            .send(comfirmsy)
            .set("Content-Type", "application/json; charset=UTF-8")
            .set("Authorization", "Bearer "+token)
            .expect(409, done);
    });
    describe('GET /car/:carid endpoint', function () {
        it('respond with json of  the car', function (done) {
            apps(app)
                .get('/api/v1/car/1')
                .set('Accept', 'application/json')
                .set("Authorization", "Bearer "+token)
                .expect(200, done) //expecting HTTP status code
                
        });
    });
    
});
describe('GET /car no query get all endpoint', function () {
    it('respond with json of all car', function (done) {
        apps(app)
            .get('/api/v1/car')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer "+token)
            .expect('Content-Type', /json/)
            .expect(200, done); 
    });
});
describe('PATCH /car/:carid/price endpoint', function () {
    let 	comfirms = {
        "price" : "2000"
    }
    let 	comfirmsy = {
        "price" : ""
    }
    it('respond with json containing The car does not belong to you', function (done) {
        apps(app)
            .patch('/api/v1/car/1/price')
            .send(comfirms)
            .set("Content-Type", "application/json; charset=UTF-8")
            .set("Authorization", "Bearer "+token)
            .expect(200, done);
    });
    it('respond with 409 conflict', function (done) {
        apps(app)
            .patch('/api/v1/car/1/price')
            .send(comfirmsy)
            .set("Content-Type", "application/json; charset=UTF-8")
            .set("Authorization", "Bearer "+token)
            .expect(409, done);
    });
    
});

describe('GET /car/:carid unexistence car endpoints', function () {
    it('respond with json of the car details', function (done) {
        apps(app)
            .get('/api/v1/car/0')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer "+token)
            .expect('Content-Type', /json/)
            .expect(404, done) 
    });
});
describe('GET /car/:carid  existing car endpoint', function () {
    it('respond json of car with id \"1\"', function (done) {
        apps(app)
            .get('/api/v1/car/2')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer "+token)
            .expect('Content-Type', /json/)
            .expect(404, done) //expecting HTTP status code
            
    });
    
});
describe('GET /allcars endpoint', function () {
    
        it('respond with allcars ', function (done) {
            apps(app)
                .get('/api/v1/allcars')
                .expect('Content-Type', /json/)
                .expect(200, done) //expecting HTTP status code
        });
    });
    describe('GET /allusers endpoint', function () {
        
            it('respond with all users ', function (done) {
                apps(app)
                    .get('/api/v1/allusers')
                    .expect(200, done) //expecting HTTP status code
            });
        });
        describe('GET /me endpoint', function () {
            
                it('respond with 403 ', function (done) {
                    apps(app)
                        .get('/api/v1/me')
                        .set("Authorization", "Bearer ")
                        .expect('Forbidden', done) //expecting HTTP status code
                });
            });
            describe('GET /me endpoint', function () {
            
                it('respond with 403 ', function (done) {
                    apps(app)
                        .get('/api/v1/me')
                        .set("Authorization", "Bearer 7o757ygvhvhgfiuytuyguyhgiuftyfgufg")
                        .expect(403, done) //expecting HTTP status code
                });
            });
            describe('POST /order endpoint', function () {
                let 	comfirms = {
                    "car_id" : 1 ,
                     "order_price" : "1000" ,
                      "status" : "pending",
                       "amount" : "1000"
                }
                let 	comfirmsy = {
                    "car_id" : "" ,
                     "order_price" : "1000" ,
                      "status" : "pending",
                       "amount" : "1000"
                }
                it('respond with json containing order sent successfully', function (done) {
                    apps(app)
                        .post('/api/v1/order')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(201, done);
                });
                it('respond with conflict', function (done) {
                    apps(app)
                        .post('/api/v1/order')
                        .send(comfirmsy)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(409, done);
                });
                it('respond with conflict', function (done) {
                    apps(app)
                        .post('/api/v1/order')
                        .send(comfirmsy)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer 3435"+token)
                        .expect(403, done);
                });
                it('respond with allorders ', function (done) {
                    apps(app)
                        .get('/api/v1/allorders')
                        .expect('Content-Type', /json/)
                        .expect(200, done) //expecting HTTP status code
                });
                
            });
            describe('PATCH /order/:orderrid/price', function () {
                let 	comfirms ={"order_price" : "2000"}
                let 	comfirmsy ={"order_price" : ""}
                it('respond with json containing The order price have been changed', function (done) {
                    apps(app)
                        .patch('/api/v1/order/3/price')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done);
                });
                it('respond with json containing The order price have been changed', function (done) {
                    apps(app)
                        .patch('/api/v1/order/1/price')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(200, done);
                });
                it('respond with json containing error message', function (done) {
                    apps(app)
                        .patch('/api/v1/order/0/price')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done);
                        
                });
                it('respond with 409 conflict', function (done) {
                    apps(app)
                        .patch('/api/v1/order/0/price')
                        .send(comfirmsy)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(409, done);
                        
                });
                it('respond with unauthorized', function (done) {
                    apps(app)
                        .patch('/api/v1/order/3/price')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .expect(403, done);
                });
            });
            describe('POST /flag endpoint', function () {
                let 	comfirms = {
                "car_id" : 1,
                "reason" : "fraud",
                "description" : "fraud"
            }
            let 	comfirmsy = {
            "car_id" : 1,
            "reason" : "",
            "description" : "fraud"
        }
                it('respond with json containing your report is sent successfully', function (done) {
                    apps(app)
                        .post('/api/v1/flag')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(201,done)
                        
                });
                it('respond with json 409 conflict', function (done) {
                    apps(app)
                        .post('/api/v1/flag')
                        .send(comfirmsy)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(409,done)
                        
                });
                it('respond with  unauthorized', function (done) {
                    apps(app)
                        .post('/api/v1/flag')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .expect(403,done)
                        
                });
            
            it('respond with json 409 conflict', function (done) {
                    apps(app)
                        .post('/api/v1/flag')
                        .send(comfirmsy)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer 3343"+token)
                        .expect(403,done)
                        
                });
            });
            describe('GET /car with status query', function () {
                it('respond with json of the car not found', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'status' : 'sold'})
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done) //expecting HTTP status code
                       
                });
            });
            describe('GET /car with body_type query', function () {
                it('respond with json of the car not found', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'body_type' : 'f545vfcx'})
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done) //expecting HTTP status code
                       
                });
            });
            
            describe('GET /car with max_price query', function () {
                it('respond with json of not found', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'max_price' : '1'})
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with manufacturer query', function () {
                it('respond with json of not found', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'manufacturer' : '1sd3223cdfe3'})
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with state query', function () {
                it('respond with json of not found', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'state' : 'invalidstate'})
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with correct body_type query', function () {
               
                it('respond with bad request due to typo', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'body_tpe' : 'color'})
                        .set("Authorization", "Bearer "+token)
                        .expect(400, done); //expecting HTTP status code
                });
                it('respond with bad request due to typo for max price', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'max_price' : 'color'})
                        .set("Authorization", "Bearer "+token)
                        .expect(400, done); //expecting HTTP status code
                });
                it('respond with bad request due to typo for min price', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'min_price' : 'color'})
                        .set("Authorization", "Bearer "+token)
                        .expect(400, done); //expecting HTTP status code
                });
            
            });
            
            describe('GET /car with state query', function () {
                it('respond with json with new cars', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'state' : 'new'})
                        .set("Authorization", "Bearer "+token)
                        .expect(200, done); //expecting HTTP status code
                        
                });

            });
            describe('GET /car never repeat output', function () {
                
                it('respond with only 1', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'status' : 'available'})
                        .query({'state' : 'new'})
                        .set("Authorization", "Bearer "+token)
                        .expect(200, done); //expecting HTTP status code
                        
                       
                });
                
                it('respond with only 1', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'status' : 'available'})
                        .query({'min_price' : '1'})
                        .set("Authorization", "Bearer "+token)
                        .expect(200, done); //expecting HTTP status code
                        
                       
                });
                
            
        });
            describe('GET /car multiple conflicting queries', function () {
                it('respond with 404 not found state:true body_type:false', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'state' : 'new'})
                        .query({'body_type' : 'bluu'})
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found state:false body_type:true', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'body_type' : 'color'})
                        .query({'state' : 'grr'})
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found status:false body_type:true', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'status' : 'no'})
                        .query({'state' : "new"})
                        .set("Authorization", "Bearer "+token)                        
                         .expect(404, done); //expecting HTTP status code
                        
                });
                
                it('respond with 404 not found status:true min_price:false', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'body_type' : 'bee'})
                        .query({'min_price' : "10"})                       
                        .set("Authorization", "Bearer "+token)                   
                        .expect(404, done); //expecting HTTP status code
                        
                });
                it('respond with 404 not found status:true min_price:false', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'max_price' : 1})
                        .query({'state' : 'new'})
                        .set("Authorization", "Bearer "+token)                    
                        .expect(404, done); //expecting HTTP status code
                        
                });
               
               
                

            });
            describe('GET /car with status available query', function () {
                it('respond with json with available cars', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'status' : 'available'})
                        .set("Authorization", "Bearer "+token)
                        .expect(200, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with correct min_price query', function () {
                it('respond with json with cars price above 100', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'min_price' : '100'})
                        .set("Authorization", "Bearer "+token)
                        .expect(200, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with correct max_price query', function () {
                it('respond with json with cars price below 7000', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'max_price' : '7000'})
                        .set("Authorization", "Bearer "+token)
                        .expect(200, done); //expecting HTTP status code
                        
                });
            });
            describe('GET /car with correct manufacturer query', function () {
                it('respond with json with cars the manufacture \"carmanufacturer\"', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'manufacturer' : 'carmanufacturer'})
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done); //expecting HTTP status code
                        
                });
            });
            describe('PATCH /car/:carid/status endpoint', function () {
                it('respond with json containing The status of car changed to sold', function (done) {
                    apps(app)
                        .patch('/api/v1/car/1/status')
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(200, done);
                });
                it('respond with 403 unuthorized car not your', function (done) {
                    apps(app)
                        .patch('/api/v1/car/1/status')
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .expect(403, done);
                });
                it('respond with json containing The status of car changed to sold', function (done) {
                    apps(app)
                        .patch('/api/v1/car/0/status')
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done);
                });
                
            });
            describe('PATCH /car/0/status nonexistence car  endpoint', function () {
                
                it('respond with json containing The status error', function (done) {
                    apps(app)
                        .patch('/api/v1/car/0/status')
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done);
                });
                
            });
            describe('GET /car with status sold query', function () {
                it('respond with json with sold cars', function (done) {
                    apps(app)
                        .get('/api/v1/car')
                        .query({'status' : 'sold'})
                        .set("Authorization", "Bearer "+token)
                        .expect(200, done); //expecting HTTP status code
                        
                });
            });
            describe('delete /car/:carid', function () {
                it('respond with json delete succesfull', function (done) {
                    apps(app)
                        .delete('/api/v1/car/1')
                        .set('Accept', 'application/json')
                        .set("Authorization", "Bearer "+token)
                        .expect('Content-Type', /json/)
                        .expect(200, done) //expecting HTTP status code
                       
                        
                });
                it('try to delete nonexisting car respond with 404 not found', function (done) {
                    apps(app)
                        .delete('/api/v1/car/b')
                        .expect('Content-Type', /json/)
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done) //expecting HTTP status code
                       
                        
                });
            });
            describe('POST /auth/signin endpoint', function () {
    let 	comfirms = {"new_password" : "thepassword" , "current_password" : "thepassword"}
    let 	comfirmsy = {"new_password" : "thepassword" , "current_password" : "thepasword"}
    let 	comfirmsyu = {"new_password" : "thep" , "current_password" : "thep"}
    
    it('respond with not found', function (done) {
        apps(app)
            .post('/api/v1/user/domrand9@gmail.com/reset_password')
            .set("Content-Type", "application/json; charset=UTF-8")
            .send(comfirmsy)
            .expect(404, done);
    });
    it('respond with not found', function (done) {
        apps(app)
            .post('/api/v1/user/domrand9@gmail.com/reset_password')
            .set("Content-Type", "application/json; charset=UTF-8")
            .send(comfirmsyu)
            .expect(409, done);
    });
    it('respond with not found', function (done) {
        apps(app)
            .post('/api/v1/user/theemail@gmail.com/reset_password')
            .set("Content-Type", "application/json; charset=UTF-8")
            .send(comfirms)
            .expect(404, done);
    });
    it('respond with not found', function (done) {
        apps(app)
            .post('/api/v1/user/domrad9@gmail.com/reset_password')
            .set("Content-Type", "application/json; charset=UTF-8")
            .send(comfirms)
            .expect(404, done);
    });
     it('respond password changed', function (done) {
        apps(app)
            .post('/api/v1/user/domrand9@gmail.com/reset_password')
            .set("Content-Type", "application/json; charset=UTF-8")
            .send(comfirms)
            .expect(200, done);
    });
    
    it('send email to user', function (done) {
        apps(app)
            .post('/api/v1/user/domra9@gmail.com/reset_password')
            .set("Content-Type", "application/json; charset=UTF-8")
            .send()
            .expect(404, done);
    });
 it('really send email to user', function (done) {
        apps(app)
            .post('/api/v1/user/domrand9@gmail.com/reset_password')
            .set("Content-Type", "application/json; charset=UTF-8")
            .send()
            .expect(200, done);
    });
})
describe('error test', function () {
    before(function(done){
        apps(app)
        .get('/api/v1/testerr')
        .end(function(err, res){
            done();
        })
        
    })
    it('return error', function (done) {
        apps(app)
            .post('/api/v1/user/domrand9@gmail.com/reset_password')
            .set("Content-Type", "application/json; charset=UTF-8")
            .send()
            .expect(400, done);
    });
    
    })
            describe('PATCH /car/:carid/price nonexistence carid endpoint', function () {
                let 	comfirms = {
                    "price" : "2000"
                }
                it('respond with json 404 not found', function (done) {
                    apps(app)
                        .patch('/api/v1/car/0/price')
                        .send(comfirms)
                        .set("Content-Type", "application/json; charset=UTF-8")
                        .set("Authorization", "Bearer "+token)
                        .expect(404, done);
                });
                
            });
            describe('delete all test inputs', function () {
                it('respond with json delete succesfull', function (done) {
                    apps(app)
                       .get('/api/v1/user/truncateuser')
                       .set("Authorization", "Bearer "+token)
                        .expect(200 ,done)
                });
                
                it('respond with json delete succesfull', function (done) {
                    apps(app)
                       .get('/api/v1/user/truncatepostad')
                       .set("Authorization", "Bearer "+token)
                        .expect(200 ,done)
                });
                 it('respond with json delete succesfull', function (done) {
                    apps(app)
                       .get('/api/v1/user/truncateorders')
                       .set("Authorization", "Bearer "+token)
                        .expect(200 ,done)
                });
                 it('respond with json delete succesfull', function (done) {
                    apps(app)
                       .get('/api/v1/user/truncatereports')
                       .set("Authorization", "Bearer "+token)
                        .expect(200 ,done)
                });
                 it('test production enviroment in flag routes', function (done) {
                    apps(app)
                       .get('/api/v1/fenv')
                  
                        .expect(200 ,done)
                });
                it('test test enviroment in flag route', function (done) {
                    apps(app)
                       .get('/api/v1/ffenv')
                  
                        .expect(200 ,done)
                });
                it('test production enviroment in car routes', function (done) {
                    apps(app)
                       .get('/api/v1/cenv')
                  
                        .expect(200 ,done)
                });
                it('test test enviroment in car route', function (done) {
                    apps(app)
                       .get('/api/v1/ccenv')
                  
                        .expect(200 ,done)
                });
                it('test production enviroment in order routes', function (done) {
                    apps(app)
                       .get('/api/v1/oenv')
                  
                        .expect(200 ,done)
                });
                it('test test enviroment in order route', function (done) {
                    apps(app)
                       .get('/api/v1/ooenv')
                  
                        .expect(200 ,done)
                });
                it('test production enviroment in order routes', function (done) {
                    apps(app)
                       .get('/api/v1/uenv')
                  
                        .expect(200 ,done)
                });
                it('test test enviroment in order route', function (done) {
                    apps(app)
                       .get('/api/v1/uuenv')
                  
                        .expect(200 ,done)
                });
                it('test offline enviroment in order route', function (done) {
                    apps(app)
                       .get('/api/v1/oooenv')
                  
                        .expect(200 ,done)
                });
                it('test offline enviroment in flag route', function (done) {
                    apps(app)
                       .get('/api/v1/offenv')
                  
                        .expect(200 ,done)
                });
                it('test test enviroment in car route', function (done) {
                    apps(app)
                       .get('/api/v1/occenv')
                  
                        .expect(200 ,done)
                });
                it('test offline enviroment in user route', function (done) {
                    apps(app)
                       .get('/api/v1/ouuenv')
                  
                        .expect(200 ,done)
                });
            })
        });
            //export COVERALLS_REPO_TOKEN=uXXej4MsUdasVhX6yL01XTtWMJR82UyJo
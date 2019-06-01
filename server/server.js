let allusers = [];
let allcars = [];
console.log('starting server');
const express = require('express');
//const jwt = require('jwt-simple');
const app = express(); app.set('jwtTokenSecret', 'ourlittlesecret');
//const jwt = require('jsonwebtoken');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');
const bcrypt = require('bcryptjs');
//var config = require('../config.js').get(process.env.NODE_ENV);


const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ 
extended: true }));//middleware

app.use(bodyParser.text({ type: "application/json" }));
const Joi = require('joi')

 app.use(express.static("../docs"));
 
 //app.use(morgan("dev"));

app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    next();

});

 
 app.get('/see', (req,res) =>{
 	let tid = req.headers['x-access-token'];;
 	res.send(tid);
 });
 
 
 app.get("/all",(req, res) =>{
 	res.send(allcars);
 });
//handles sign up
 app.post("/auth/signup", (req, res) => { 

var hashedPassword = bcrypt.hashSync(req.body.password, 8);
 	let postit ={

 		"id" : allusers.length + 1,
 		"email" : req.body.email,
 		"first_name" : req.body.first_name,
 		"last_name" : req.body.last_name,
 		"password" : hashedPassword,
 		"address" : req.body.address
 	}
 	 	
 	const emailvali = allusers.find(u => u.email === req.body.email);
 	if(emailvali){
 		let reply = {
 		"email" : emailvali.email
 	}
 	res.status(404).send(reply)
return;
 }
  	let 	comfirm = {
 			"id" : allusers.length + 1,
 			"email" : req.body.email,
 		"name" : req.body.first_name,
 		"lname" : req.body.last_name,
 		"address" : req.body.address
 	}
 	allusers.push(postit);
 			let token = jwt.sign({user : comfirm}, 'ourlittlesecret', { expiresIn: '24h' })//expires in 24 hours }
 	res.json({
 		"status" : 200,
 		"data" :{
 		"token" : token,
 		"id" : allusers.length + 1,
 		"first_name" : req.body.first_name,
 		"last_name" : req.body.last_name,
		"email" : req.body.email
 		}
 	})
 	console.log(postit);
 });
 
 
 
 app.post("/auth/signin", (req, res) => { 
 	const confirm = allusers.find(u => u.email == req.body.user);
 	if(confirm){
 		var passwordIsValid = bcrypt.compareSync(req.body.pass, confirm.password); 
 		if (!passwordIsValid){
 			console.log('cant login')
 			 return res.status(401).send({ auth: false, token: null 	});
 		
 		}
 	let 	comfirm = {
 			"id" : confirm.id,
 			"email" : confirm.email,
 		"name" : confirm.first_name,
 		"lname" : confirm.last_name,
 		"address" : confirm.address
 	}
 console.log(comfirm)
 		let token = jwt.sign({user : comfirm}, 'ourlittlesecret', { expiresIn: '24h' })//expires in 24 hours }

 		res.json({ 
							 	"status" : 200,
							"data" : {
							"token" : token,
							"id": confirm.id, // user id
							"first_name": confirm.first_name,
							"last_name": confirm.last_name,
							"email": confirm.email
							},
								"message": 'Welcome back '+confirm.first_name+'<br/> Logged in successful!'
 		});
 		
 				let reply = {
 			"auth" : true,
 			"token" :token,
 			"id" : confirm.id,
 			"email" : confirm.email,
 		"name" : confirm.first_name,
 		"lname" : confirm.last_name,
 		"address" : confirm.address
 	}
 
 		
 	} else {
 		let reply = {
 		"back" : "Invalid username or password please try again pass: "
 	}
 			res.status(404).send(reply)
 			console.log(reply);
 	}
 });
  
  
  
  
  ///////////post car end point///////////////////
  app.post("/car", (req, res) => {
  	 	let postcarform = {
 		"id" : allcars.length + 1,
 		"email" : req.body.pcposter,
 		"created_on" : new Date(),
 		"manufacturer" : req.body.pcman,
 		"model" : req.body.pcmodel,
 		"price" : req.body.pprice,
 		"state" : req.body.stateocar,
 		"engine_size" : req.body.pces,
 		"color" : req.body.pccolor,
 		"pics" : req.body.pcpics
 	}
 	allcars.push(postcarform);
 	console.log(postcarform)
  	res.json({
  		"status":200,
  		"data":{
 		"id" : allcars.length + 1,
 		"email" : req.body.pcposter,
 		"created_on" : new Date(),
 		"manufacturer" : req.body.pcman,
 		"model" : req.body.pcmodel,
 		"price" : req.body.pprice,
 		"state" : req.body.stateocar,
 		"engine_size" : req.body.pces,
 		"color" : req.body.pccolor,
 		"pics" : req.body.pcpics
 	},
 	"message" : "Car posted successfully"
  	});
  })
/////////////////////////



///////////purchase///////////////////
app.post("/car", (req, res) => {
	let postcarform = {
  "id" : allcars.length + 1,
  "email" : req.body.pcposter,
  "created_on" : new Date(),
  "manufacturer" : req.body.pcman,
  "model" : req.body.pcmodel,
  "price" : req.body.pprice,
  "state" : req.body.stateocar,
  "engine_size" : req.body.pces,
  "color" : req.body.pccolor,
  "pics" : req.body.pcpics
}
allcars.push(postcarform);
console.log(postcarform)
res.json({
   "status":200,
   "data":{
  "id" : allcars.length + 1,
  "email" : req.body.pcposter,
  "created_on" : new Date(),
  "manufacturer" : req.body.pcman,
  "model" : req.body.pcmodel,
  "price" : req.body.pprice,
  "state" : req.body.stateocar,
  "engine_size" : req.body.pces,
  "color" : req.body.pccolor,
  "pics" : req.body.pcpics
},
"message" : "Car posted successfully"
});
})
/////////////////////////
 
 
 
 
  
  
  
  
  
 //handles get login
 app.get("/login/:user/:pass", (req, res) => {
 	const confirm = allusers.find(u => u.email == req.params.user);
 	if(confirm){
 		
 		var passwordIsValid = bcrypt.compareSync(req.params.pass, confirm.password); 
 		if (!passwordIsValid){
 			console.log('cant login')
 			 return res.status(401).send({ auth: false, token: null 	});
 		
 		}
 		
 		let token = jwt.sign({user : confirm}, config.secret, { expiresIn: '24h' })//expires in 24 hours }
 		res.json({ 
 		success: true, 
 		message: 'Authentication successful!', 
 		token: token 
 		});
 		
 				let reply = {
 			"auth" : true,
 			"token" :token,
 			"id" : confirm.id,
 			"email" : confirm.email,
 		"name" : confirm.first_name,
 		"lname" : confirm.last_name,
 		"address" : confirm.address
 	}
 
 		
 	} else {
 		let reply = {
 		"back" : "Invalid username or password please try again"
 	}
 			res.status(404).send(reply)
 			console.log(reply);
 	}
 })
 
 
 
 
 
 
 
 
 
 
 app.get('/me', ensureToken, function(req, res) { 
 
 jwt.verify(req.token, 'ourlittlesecret', function(err, data) { if (err) { res.sendStatus(403); } else{res.json({ description:data}); } });
});
 
 
 function ensureToken(req, res, next) { 
 const bearerHeader = req.headers["authorization"];
 if (typeof bearerHeader !== 'undefined') {  
 const berarer = bearerHeader.split(" "); 
 const bearerToken = berarer[1]; 
 req.token = bearerToken;
  next();
  } else { 
  res.sendStatus(403); 
  
  }

}


 
 
 
 
 
 
 
 app.listen(port,(req, res) => {
	console.log(`::listening on ${port}::`)
});
 
 
 
 
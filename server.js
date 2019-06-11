let allusers = [];
//console.log('starting server');
const express = require("express");
const Joi = require("joi");
//const jwt = require('jwt-simple');
const app = express(); 
app.set("jwtTokenSecret", "ourlittlesecret");
//const jwt = require('jsonwebtoken');
let jwt = require("jsonwebtoken");
//let config = require('./config');
//let middleware = require('./middleware');
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ 
	extended: true }));//middleware

app.use(bodyParser.text({ type: "application/json" }));

app.use(express.static("./documentation"));
//app.use(morgan("dev"));

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
	next();
});

app.get("/api/v1/allusers",(req, res) =>{res.status(200).send(allusers);});

 

//@codeCoverageIgnoreEnd
 
//handles sign up
app.post("/api/v1/auth/signup", (req, res) => { 
	const schema ={
		first_name : Joi.string().trim().min(3),
		last_name : Joi.string().trim().min(3),
		email : Joi.string().trim().min(3),
		address : Joi.string().trim().min(3),
		password : Joi.string().trim().min(6)
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	}
   
   var hashedPassword = bcrypt.hashSync(req.body.password, 8);
		let postit ={
   
			"id" : allusers.length + 1,
			"email" : req.body.email,
			"first_name" : req.body.first_name,
			"last_name" : req.body.last_name,
			"password" : hashedPassword,
			"address" : req.body.address,
			"is_admin" : "false"
		}
			 
		const emailvali = allusers.find(u => u.email === req.body.email);
		if(emailvali){
			let reply = {
			"msg" : "email is taken"
		}
		res.status(409).json(reply)
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
		res.status(201).json({
			"status" : 201,
			"data" :{
			"token" : token,
			"id" : allusers.length + 1,
			"first_name" : req.body.first_name,
			"last_name" : req.body.last_name,
		   "email" : req.body.email
			}
		})
		//console.log(postit);
	});
////////////sign in////////////
app.post("/api/v1/auth/signin", (req, res) => {
	const schema ={
		email : Joi.string().trim().min(3),
		password : Joi.string().trim().min(6)
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
 	const confirm = allusers.find(u => u.email == req.body.email);
 	if(confirm){
 		var passwordIsValid = bcrypt.compareSync(req.body.password, confirm.password); 
 		if (!passwordIsValid){
			//console.log('cant login')
			return res.status(401).send({ auth: false, token: null 	});
 		
 		}
 	let 	comfirm = {
			"id" : confirm.id,
			"email" : confirm.email,
 		"name" : confirm.first_name,
 		"lname" : confirm.last_name,
 		"address" : confirm.address
 	};
		//console.log(comfirm)
 		let token = jwt.sign({user : comfirm}, "ourlittlesecret", { expiresIn: "24h" });//expires in 24 hours }

 		res.status(200).json({ 
	 	"status" : 200,
			"data" : {
				"token" : token,
				"id": confirm.id, // user id
				"first_name": confirm.first_name,
				"last_name": confirm.last_name,
				"email": confirm.email
			},
			"message": "Welcome back "+confirm.first_name+"<br/> Logged in successful!"
 		});
 		
 	let reply = {
			"auth" : true,
			"token" :token,
			"id" : confirm.id,
			"email" : confirm.email,
 		"name" : confirm.first_name,
 		"lname" : confirm.last_name,
 		"address" : confirm.address
 	};
 
	 //console.log(reply);
 	} else {
 		let reply = {
 		"msg" : "Invalid username or password please try again"
 	};
		res.status(404).send(reply);
		//console.log(reply);
 	}
});
 







app.get("/api/v1/me", ensureToken, function(req, res) { 
 
	jwt.verify(req.token, "ourlittlesecret", function(err, data) { if (err) { res.sendStatus(403); } else{res.status(200).json({ description:data}); } });
});
 
 
function ensureToken(req, res, next) { 
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {  
		const berarer = bearerHeader.split(" "); 
		const bearerToken = berarer[1]; 
		req.token = bearerToken;
		next();} else {  res.sendStatus(403); }

}

app.listen(port,(req, res) => {
	//console.log(`::listening on ${port}::`)
});
 
const cars = require("./routes/cars");
app.use("/", cars);
const orders = require("./routes/orders");
app.use("/", orders);
const flags = require("./routes/flags");
app.use("/", flags);
 
 
module.exports = app;
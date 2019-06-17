/*const Pool = require ('pg').Pool;
const pool = new Pool({
	user: 'andela',
	host: '127.0.0.1',
	database: 'andela',
	password: '',
	port: '5432'
});
*/



const Pool = require ('pg').Pool;
const pool = new Pool({
	user: 'gkhfnrideiyyoi',
	host: 'ec2-23-21-91-183.compute-1.amazonaws.com',
	database: 'ddelc2mc1p0din',
	password: '75f800626b4be7b6fe829d59277b3a5aca40c09ac1538bf69cbde20997d957ba',
	port: '5432',
	ssl: true
});

	


	
 pool.connect()
 //pool.query("CREATE TABLE allusers( ID SERIAL PRIMARY KEY, email VARCHAR(500), first_name VARCHAR(500), last_name VARCHAR(500), password VARCHAR(500), address VARCHAR(500), is_admin VARCHAR(500))")


/*pool.query("select * from allusers where id = $1",[5],(err, res)=>{
	delete from allusers where email = bidoritunmise@gmail.com
	console.log(res.rows);
	//pool.end();
});*/
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
//const port = process.env.PORT || 3000;
const port = 3000;
var bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ 
	extended: true }));//middleware

app.use(bodyParser.text({ type: "application/json" }));

app.use(express.static("./home"));
app.use("/documentation", express.static(__dirname + "/documentation"))
app.use("/UI", express.static(__dirname + "/docs"))
//app.use(morgan("dev"));

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
	next();
});

app.get("/api/v1/allusers",(req, res) =>{res.status(200).send(allusers);});

var allusers = [];

//@codeCoverageIgnoreEnd
//handles sign up
app.post("/api/v1/auth/signup", (req, res) => { 

			
			
				 pool.connect()
				pool.query("select * from allusers where email = $1 ",[req.body.email],(err,ress)=>{
					//console.log(ress.rows.length)
					if(ress.rows.length >= 1 && req.body.email){
						let reply = {
							"msg" : "email is taken please try another"
						}			
						res.status(409).json(reply)
						return;			
					}else{
						nextValidate();
					}

				})
						
			function nextValidate(){	
					const schema = {
						first_name : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(3),
						last_name : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(3),
						email : Joi.string().trim().email().required(),
						address : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(3),
						password : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(6)
					}
					
					const valid = Joi.validate(req.body,schema);
					if(valid.error){
					let msgclean = valid.error.details[0].message.replace("/^[,. a-z0-9A-Z]+$/","");
					let reply = {
						"msg" : msgclean
					}	
					res.status(409).send(reply);
					return;
					}
				
					var hashedPassword = bcrypt.hashSync(req.body.password, 8);
						let postit ={
				
							"email" : req.body.email,
							"first_name" : req.body.first_name,
							"last_name" : req.body.last_name,
							"password" : hashedPassword,
							"address" : req.body.address,
							"is_admin" : "false"
						}
						let 	comfirm = {
					"email" : req.body.email,
							"name" : req.body.first_name,
							"lname" : req.body.last_name,
							"address" : req.body.address
						}
						 pool.query("INSERT INTO allusers (email, first_name, last_name, password, address, is_admin) VALUES ($1,$2,$3,$4,$5,$6)",[req.body.email,req.body.first_name,req.body.last_name,hashedPassword,req.body.address,"false"],(err,result)=>{
				
						let token = jwt.sign({user : comfirm}, 'ourlittlesecret', { expiresIn: '24h' })//expires in 24 hours }
						res.status(201).json({
							"status" : 201,
							"data" :{
							"token" : token,
							"id" : allusers.length + 1,
							"first_name" : req.body.first_name,
							"last_name" : req.body.last_name,
						"email" : req.body.email
							},
							"message":"Welcome!! "+req.body.first_name+" registration successful. <br/>Preparing dashboard in 2 sec..." 
						})
								
					})
					//console.log(postit);
}
			
		
	
				
			
	

		
});
	
	
	
	////////// for testing-----delete user endpoint----///
	app.get("/api/v1/user/:email", (req, res) => {
		pool.query("DELETE FROM  allusers WHERE email='testemail@email.coml'",(error,result)=>{
			
				res.status(200).send({"see":"deleted"});
		
		 });
		//console.log(ress)
		
		

	});


	///////////////////////////////////////////////////////
	
	
	
	
	
	
	
////////////sign in////////////
app.post("/api/v1/auth/signin", (req, res) => {
	const schema ={
		email : Joi.string().trim().email().required(),
		password : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(6)
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
	// const confirm = allusers.find(u => u.email == req.body.email);
	 pool.connect()
	 pool.query("select * from allusers where email = $1",[req.body.email],(err,ress)=>{
		 //console.log(ress.rows.length)
		 if(ress.rows.length >= 1){
			//console.log(ress.rows[0].password);
				nextValidate(ress.rows);
					
		 }else {
			let reply = {
			"msg" : "Invalid username or password please try again"
		};
		   res.status(404).send(reply);
		   return
		}

	 })
 	function nextValidate(thepassword){
 		var passwordIsValid = bcrypt.compareSync(req.body.password, thepassword[0].password); 
 		if (!passwordIsValid){
			//console.log('cant login')
			return res.status(401).send({ auth: false, token: null 	});
 		
 		}
 	let 	comfirm = {
			"id" : thepassword[0].ID,
			"email" : thepassword[0].email,
 		"name" : thepassword[0].first_name,
 		"lname" : thepassword[0].last_name,
 		"address" : thepassword[0].address
 	};
		//console.log(comfirm)
 		let token = jwt.sign({user : comfirm}, "ourlittlesecret", { expiresIn: "24h" });//expires in 24 hours }

 		res.status(200).json({ 
	 	"status" : 200,
			"data" : {
				"token" : token,
				"id": comfirm.id, // user id
				"first_name": comfirm.name,
				"last_name": comfirm.lname,
				"email": comfirm.email
			},
			"message": "Welcome back "+comfirm.name+"<br/> Logged in successful!"
 		});
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

//pool.end();


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
import express from "express";
import  Joi from "joi";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import db from "./config";
let pool;
let conusername ="gkhfnrideiyyoi";
	let condatabase= "ddelc2mc1p0din";
	let conhost="ec2-23-21-91-183.compute-1.amazonaws.com";
	let conpassword="75f800626b4be7b6fe829d59277b3a5aca40c09ac1538bf69cbde20997d957ba";
	let conssl=true;
	let thegmail="automartmail@gmail.com";
	
	setenvparam();
	function changeenv(){
	process.env['NODE_ENV'] = 'test';
	setenvparam();
	}
	function changeenvpro(){
	process.env['NODE_ENV'] = 'production';
	setenvparam();
	}
	function changeenvoff(){
	process.env['NODE_ENV'] = 'offline';
	setenvparam();
	}
	function changeenverr(){
	process.env['NODE_ENV'] = 'errors';
	testgmail();
	}
	
	function setenvparam(){
if (process.env.NODE_ENV && process.env.NODE_ENV === "test" ) {conusername="tovlhixtdmbgcz";condatabase="dfvspqpvd9vmc6";conhost='ec2-23-21-91-183.compute-1.amazonaws.com';conpassword='f48766c6c29f9b25108448b51c39d55084235c27d9352129da35c9cddbb78823';conssl=true;thegmail="automartcontacts@gmail.com"}
else if(process.env.NODE_ENV === "offline"){conusername="andela";condatabase="andela";conhost="localhost";conpassword="";conssl=false;thegmail="automartmail@gmail.com";}
else{
conusername ="gkhfnrideiyyoi";condatabase= "ddelc2mc1p0din";conhost="ec2-23-21-91-183.compute-1.amazonaws.com";conpassword="75f800626b4be7b6fe829d59277b3a5aca40c09ac1538bf69cbde20997d957ba";conssl=true;thegmail="automartcontacts@gmail.com";
}

pool = db.getPool(conusername,condatabase,conhost,conpassword,conssl);
//console.log(conusername)
}




	//connection();
 //pool();
function testgmail(){
	 thegmail="testgmail@gmail.com"
	}
	



//console.log(thegmail);

//console.log('starting server');

//const jwt = require('jwt-simple');
const app = express(); 
app.set("jwtTokenSecret", "ourlittlesecret");
//const jwt = require('jsonwebtoken');

//let config = require('./config');
//let middleware = require('./middleware');

const port = process.env.PORT || 3000;
//const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ 
	extended: true }));//middleware

app.use(bodyParser.text({ type: "application/json" }));

app.use(express.static("./src/home"));
app.use("/documentation", express.static("./src/documentation"));
app.use("/UI", express.static("./docs"));
//app.use(morgan("dev"));

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
	next();
});

app.get("/api/v1/allusers",(req, res) =>{  pool.query("SELECT * FROM allusers",(error,result)=>{res.status(200).send(result.rows);});});


app.get("/api/v1/uenv", (req, res) => {
	changeenv();
	
		res.status(200).send("ok");
	
	
})
app.get("/api/v1/uuenv", (req, res) => {
	changeenvpro();
	
		res.status(200).send("ok");
	
})
app.get("/api/v1/ouuenv", (req, res) => {
	changeenvoff();
	
		res.status(200).send("ok");
	
})
app.get("/api/v1/testerr", (req, res) => {
	changeenverr();
		res.status(200).send({"this":"error"});
	
})
//@codeCoverageIgnoreEnd
//handles sign up
app.post("/api/v1/auth/signup", (req, res) => { 
	
	pool.query("select * from allusers where email = $1 ",[req.body.email],(err,ress)=>{
		//console.log(ress.rows.length)
		if(ress.rows.length >= 1 && req.body.email){
			let reply = {
				"status":409,
				"error" : "email is taken please try another"
			};			
			res.status(409).json(reply);
			return;			
		}else{
			nextValidate();
		}

	});
						
	function nextValidate(){	
		const schema = {
			first_name : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(3),
			last_name : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(3),
			email : Joi.string().trim().email().required(),
			address : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(3),
			password : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(6)
		};
					
		const valid = Joi.validate(req.body,schema);
		if(valid.error){
			let msgclean = valid.error.details[0].message.replace("/^[,. a-z0-9A-Z]+$/","");
			let reply = {
				"status":409,
				"error" : msgclean
			};	
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
		};
						
						 pool.query("INSERT INTO allusers (email, first_name, last_name, password, address, is_admin) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ",[req.body.email,req.body.first_name,req.body.last_name,hashedPassword,req.body.address,"false"],(err,result)=>{
						 	let recentid = result.rows[0].id;
						 	let 	comfirm = {
						 		"id":recentid,
				"email" : req.body.email,
				"name" : req.body.first_name,
				"lname" : req.body.last_name,
				"address" : req.body.address,
				"is_admin" : "false"
			};
				
			let token = jwt.sign({user : comfirm}, "ourlittlesecret", { expiresIn: "24h" });//expires in 24 hours }
			res.status(201).json({
				"status" : 201,
				"data" :{
					"token" : token,
					"first_name" : req.body.first_name,
					"last_name" : req.body.last_name,
					"email" : req.body.email
				},
				"message":"Welcome!! "+req.body.first_name+" registration successful. <br/>Preparing dashboard in 2 sec..." 
			});
								
		});
		//console.log(postit);
	}
			
		
});
	
	
	
	
	
	app.post("/api/v1/user/:email/reset_password", (req, res) => {
		if((req.body.current_password === "" || req.body.new_password === "") ||(typeof req.body.current_password == "undefined" || typeof req.body.new_password == "undefined")){
			
			pool.query("select * from allusers where email=$1",[req.params.email],(err,ress)=>{
		if(ress.rows.length > 0){
			function makeid(length) { var result = ''; var characters = 'abcdefghijklmnopqrstuvwxyz'; var charactersLength = characters.length; for ( var i = 0; i < length; i++ ) { result += characters.charAt(Math.floor(Math.random() * charactersLength)); } return result; } 
			var thenewp = makeid(6);
							var hashedPassword = bcrypt.hashSync(thenewp, 8);
 cccontinue(thenewp,hashedPassword)
		}
		else
		cstop();
	})
			

		function cccontinue(genpassword,hgenpassword){
			//sending mail////
				var transporter =nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: thegmail,
    pass: 'new password'
  }
});

	
var mailOptions = {
  from: 'AUTOMART',
  to: req.params.email,
  subject: 'Password Request',
	 html: '<h3>AutoMart Password Retrieval</h3><p>New password : '+genpassword+'</p>'
};

transporter.sendMail(mailOptions,function(error, info){
	if(info || process.env.NODE_ENV === "offline" ){
	pool.query("update allusers set password = $1 where email = $2 RETURNING * ",[hgenpassword,req.params.email],(error,result)=>{
		
  //  console.log('Email sent: ' + info.response);
res.status(200).send({
		"status":200,
		"message":"A password have been sent to your email : "+req.params.email})
		});
		
	}else{
		
		res.status(400).send({
		"status":400,
		"error":"An error occured couldnt send password to your email.please try again"})
		
	}
	
	
	
	
	
	});

//{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}
			
			}
		
		
		}else{
			console.log(req.body.new_password)
		const schema ={
		current_password : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(6),
		new_password : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(6),
		
	};
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
		let reply = {
			"status":409,
			"error" : valid.error.details[0].message
		};	
		res.status(409).send(reply);
		return;
	} 

	pool.query("select * from allusers where email=$1",[req.params.email],(err,ress)=>{
		if(ress.rows.length > 0){
					var passwordIsValid = bcrypt.compareSync(req.body.current_password, ress.rows[0].password); 
 		if (passwordIsValid){
			ccontinue();
			}
			else
		cstop();
		}
		else
		cstop();
	})
	function ccontinue(){
			var hashedPassword = bcrypt.hashSync(req.body.new_password, 8);
	pool.query("update allusers set password = $1 where email = $2 RETURNING * ",[hashedPassword,req.params.email],(error,result)=>{
			res.status(200).send({
		"status":200,
		"message":"Password have been changed successfully"
		});
		
	})
	}
	
	
	
	
	
		}
		
		
		
		
		
		
		function cstop(){
		res.status(404).send({
		"status":404,
		"error":"The account was not found.Cant change password"
		
		});
		return
	}
	
	
//	pool.query("truncate table allusers restart identity",(error,result)=>{ });
	})
	
	
	
////////// for testing-----delete user endpoint----///
app.get("/api/v1/user/truncateuser", (req, res) => {
	
	pool.query("truncate table allusers restart identity",(error,result)=>{
			 });
			 res.status(200).send({"see":"deleted"});
});
app.get("/api/v1/user/truncatepostad", (req, res) => {
		
	pool.query("truncate table postads restart identity",(error,result)=>{		
		 });
		 res.status(200).send({"see":"deleted"});
});
app.get("/api/v1/user/truncateorders", (req, res) => {
		
	pool.query("truncate table orders restart identity",(error,result)=>{
		
		 });
		 res.status(200).send({"see":"deleted"});
});
app.get("/api/v1/user/truncatereports", (req, res) => {
		
	pool.query("truncate table reports restart identity",(error,result)=>{
				 });
				 res.status(200).send({"see":"deleted"});
});

///////////////////////////////////////////////////////
	
	
	
	
	
	
	
////////////sign in////////////
app.post("/api/v1/auth/signin", (req, res) => {
	const schema ={
		email : Joi.string().trim().email().required(),
		password : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(6)
		
	};
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
		let reply = {
			"status":409,
			"error" : valid.error.details[0].message
		};	
		res.status(409).send(reply);
		return;
	} 
	
	
	 pool.query("select * from allusers where email = $1",[req.body.email],(err,ress)=>{
		 //console.log(ress.rows.length)
		 if(ress.rows.length > 0){
			//console.log(ress.rows[0].password);
			nextValidate(ress.rows);
					
		 }else {
			let reply = {
				"status":404,
				"error" : "Invalid username or password please try again"
			};
		   res.status(404).send(reply);
		   return;
		}

	 });
 	function nextValidate(thepassword){
 		var passwordIsValid = bcrypt.compareSync(req.body.password, thepassword[0].password); 
 		if (!passwordIsValid){
			//console.log('cant login')
			let reply = {
				"status":401,
				"error" : "Invalid password, please check and try again"
			};
		   res.status(401).send(reply);
		   return;
 		
 		}
 	let 	comfirm = {
			"id" : thepassword[0].id,
			"email" : thepassword[0].email,
 		"name" : thepassword[0].first_name,
 		"lname" : thepassword[0].last_name,
 		"address" : thepassword[0].address
 	};
		//console.log(comfirm)
 		let token = jwt.sign({user : comfirm}, "ourlittlesecret", { expiresIn: "24h" });//expires in 24 hours }
 		//console.log(comfirm)

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

 
	jwt.verify(req.token, "ourlittlesecret", function(err, data) { if (err) { res.sendStatus(403); } else{res.status(200).json({ status:200,description:data}); } });
});
 
 
function ensureToken(req, res, next) { 
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {  
		const berarer = bearerHeader.split(" "); 
		const bearerToken = berarer[1]; 
		req.token = bearerToken;
		next();} else {  res.status(403).json({
		"status":403,
		"error":"Opps!! you are not authorized to perform this operation,please login to get authorized token"}); }

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
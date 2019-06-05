let allusers = [];
let allcars = [];
let allorders =[];
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

 app.use(express.static("./docs"));
 
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
 
 app.get("/allorders",(req, res) =>{
	res.send(allorders);
});
 app.get("/allusers",(req, res) =>{
	res.send(allusers);
});
 app.get("/allcars",(req, res) =>{
 	res.send(allcars);
 });
 
 
 
 
 
 
 
 
 
 
 
 app.delete("/car/:carid",(req, res) =>{
	 let todelete = req.params.carid;
	 const checktodelete = allcars.find(del => del.id == todelete)
	 if(checktodelete){
		var index = allcars.indexOf(checktodelete);
		allcars.splice(index, 1);
		res.status(200).json({
			"status" : 200,
			"data" : "Car Ad successfully deleted"
			})
	 }else{
		res.status(404).json({
			"status" : 400,
			"error" : "Car Ad not found"
			})
	 }
 });
 
 
 
 
 
 
 
 
 
 
app.get("/car",(req, res) =>{
	let alltoquery=[];
	let seniorresult = [];
	let nofit = [];
			
	if(Object.keys(req.query).length > 0){
		let allthequeries = Object.keys(req.query).length;
		let thequery = Object.keys(req.query);
		for(let z=0; z < allthequeries; z++){
			alltoquery.push(thequery[z]);
		}
		if(nofit.length == 0){
			var preresult = allcars;
		}
		else {
			var preresult = seniorresult;		
		}
		//checking each car 
		for(let b=0; b < preresult.length; b++){
						
			for(let p =0; p < allthequeries; p++){
				//status query start	
				if(b == (preresult.length - 1))
						nofit.push(1);					
				if(alltoquery[p] == "status"){
					let looktru = preresult[b].status;
					if(looktru == req.query.status){
						let findid = allusers.find(d => d.email == preresult[b].email);
						let qstatus = {
							"id" : preresult[b].id,
							"owner" : findid.id,
							"email" : preresult[b].email,
							"created_on" : preresult[b].created_on,
							"state" : preresult[b].state,
							"status" : preresult[b].status,
							"price" : preresult[b].price,
							"manufacturer" : preresult[b].manufacturer,
							"model" : preresult[b].model,
							"body_type" : preresult[b].color,
							"engine_size" : preresult[b].engine_size,
							"pics" : preresult[b].pics
						}
						var checkin	= seniorresult.find(y => y.id == preresult[b].id);
						if(!checkin)
						seniorresult.push(qstatus);
						
														
					}else{
						//seniorresult = [];
						//break;	
						}

						var checkout	= seniorresult.find(l => l.status != req.query.status);
						if(checkout){
						var index = seniorresult.indexOf(checkout);
						seniorresult.splice(index, 1);
						}																					
					}else if(alltoquery[p] == "min_price" ){
					let looktru = parseInt(preresult[b].price);
					if(looktru >= parseInt(req.query.min_price) && !isNaN(req.query.min_price)){
						let findid = allusers.find(d => d.email == preresult[b].email);
						let qstatus = {
							"id" : preresult[b].id,
							"owner" : findid.id,
							"email" : preresult[b].email,
							"created_on" : preresult[b].created_on,
							"state" : preresult[b].state,
							"status" : preresult[b].status,
							"price" : preresult[b].price,
							"manufacturer" : preresult[b].manufacturer,
							"model" : preresult[b].model,
							"body_type" : preresult[b].color,
							"engine_size" : preresult[b].engine_size,
							"pics" : preresult[b].pics
						}
						var checkin	= seniorresult.find(y => y.id == preresult[b].id);
						if(!checkin)
						seniorresult.push(qstatus);								
					}else if(isNaN(req.query.min_price)){
						seniorresult = [];
						res.status(400).send('wrong value formart for min_price');
						
						break
					}else{
						//seniorresult = [];
						//break;	
						}
						var checkout	= seniorresult.find(l => parseInt(l.price) < parseInt( req.query.min_price));
						if(checkout){
						var index = seniorresult.indexOf(checkout);
						seniorresult.splice(index, 1);
						}				
				}else if(alltoquery[p] == "max_price"){
					let looktru = parseInt(preresult[b].price);
					if(looktru <= parseInt(req.query.max_price) && !isNaN(req.query.max_price)){
						let findid = allusers.find(d => d.email == preresult[b].email);
						let qstatus = {
							"id" : preresult[b].id,
							"owner" : findid.id,
							"email" : preresult[b].email,
							"created_on" : preresult[b].created_on,
							"state" : preresult[b].state,
							"status" : preresult[b].status,
							"price" : preresult[b].price,
							"manufacturer" : preresult[b].manufacturer,
							"model" : preresult[b].model,
							"body_type" : preresult[b].color,
							"engine_size" : preresult[b].engine_size,
							"pics" : preresult[b].pics
						}
						var checkin	= seniorresult.find(y => y.id == preresult[b].id);
						if(!checkin)
						seniorresult.push(qstatus);								
					}else if(isNaN(req.query.max_price)){
						seniorresult = [];
						res.status(400).send('wrong value formart for max_price');
						break
					}else{
						//seniorresult = [];
						//break;	
						}
						var checkout	= seniorresult.find(l => parseInt(l.price) > parseInt(req.query.max_price));
						if(checkout){
						var index = seniorresult.indexOf(checkout);
						seniorresult.splice(index, 1);
						}
				}else{
					res.status(400).send('bad request');
				}
			}
		}
		for(let q =0; q < allthequeries; q++){
			if(alltoquery[q] == "status"){
				for(let w =0; w < seniorresult.length; w++){
				var checkedout	= seniorresult.find(n => n.status != req.query.status );
				if(checkedout){
					var index = seniorresult.indexOf(checkedout);
					seniorresult.splice(index, 1);
					}
				}
				}
				if(alltoquery[q] == "min_price"){
					for(let w =0; w < seniorresult.length; w++){
					var checkedout	= seniorresult.find(n => parseInt(n.price) < parseInt(req.query.min_price) );
					if(checkedout){
						var index = seniorresult.indexOf(checkedout);
						seniorresult.splice(index, 1);
						}
					}
					}
					if(alltoquery[q] == "max_price"){
						for(let w =0; w < seniorresult.length; w++){
						var checkedout	= seniorresult.find(n => parseInt(n.price) > parseInt(req.query.max_price) );
						if(checkedout){
							var index = seniorresult.indexOf(checkedout);
							seniorresult.splice(index, 1);
							}
						}
						}
			

		}	
		if(seniorresult.length > 0){										
		res.status(200).json({
			"status":200,
			"data":	seniorresult
			});
		}else{
			res.status(404).json({
				"status":404,
				"msg":"no result for this request"
			});
		}
	}else{
		res.status(400).json({
			"status":400,
			"error":"no request"
		});
	}
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
 	res.status(200).json({
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

 		res.status(200).json({ 
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
		 "pics" : req.body.pcpics,
		 "status" : "available"
 	}
 	allcars.push(postcarform);
 	console.log(postcarform)
  	res.status(200).json({
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
		 "pics" : req.body.pcpics,
		 "status" : "unsold"
 	},
 	"message" : "Car posted successfully"
  	});
  })
/////////////////////////



///////////purchase///////////////////
app.post("/order", (req, res) => {
	let purchaseorderform = {
					"id" : allorders.length + 1,
					"buyer" : req.body.popoid, 
					"car_id" : req.body.poid,
					"amount" : req.body.popprice,
					"price_offered" : req.body.poprice, 
					"status" : req.body.stateocarp,
					"created_on" : new Date()
					}
	
allorders.push(purchaseorderform);
console.log(purchaseorderform)
res.status(200).json({
"status" : 200,
"data" : {
"id" : allorders.length + 1,
"car_id" : req.body.poid,
"created_on" : new Date(),
"status" : req.body.stateocarp,
"price" : req.body.popprice,
"price_offered" : req.body.poprice
},
"message" : "Your offer have been sent to the seller and still pending, Please check your order dashboard to see when it is accepted"
});
})
/////////////////////////







///////////edit purchase order price///////////////////
app.patch("/order/:orderrid/price", (req, res) => {
	const checkfororder = allorders.find(u => u.id == req.params.orderrid && u.status == "pending");
	if(checkfororder){
		const old_price = checkfororder.price_offered
		checkfororder.price_offered = req.body.newpoprice;
		console.log(req.body.newpoprice)
		
		let editorderform = {
					"id" : checkfororder.id,
					"buyer" : checkfororder.buyer, 
					"car_id" : checkfororder.car_id,
					"amount" : checkfororder.amount,
					"new_price_offered" : checkfororder.price_offered,
					"old_price_offered" : old_price,
					"status" : checkfororder.status
					}

console.log(editorderform);
res.status(200).json(	{
"status" : 200,
"data" : {
"id" : checkfororder.id,
"car_id" : checkfororder.car_id,
"status" : checkfororder.status,
"old_price_offered" : old_price,
"new_price_offered" : checkfororder.price_offered
},
"message" : "Your order price have been updated successfully"
})
	} else {
	
res.status(404).send({
"status" : 404,
"error" : "404 not found",
"message" : "Oops cant find this order"
});
}
})
/////////////////////////




///////////mark carf as sold///////////////////
app.patch("/car/:carid/status", (req, res) => {
	const checkforcar = allcars.find(u => u.id == req.params.carid && u.status == "available");
	if(checkforcar){
		checkforcar.status = "sold";
		console.log("marked");
		console.log({
			"id" : checkforcar.id,
			"email" : req.body.owneremail,
			"created_on" :new Date(),
			"manufacturer" : checkforcar.manufacturer,
			"model" : checkforcar.model,
			"price" : checkforcar.price,
			"state" : checkforcar.state,
			"status" : checkforcar.status
			})
res.status(200).json({
	"status" : 200,
	"data" : {
	"id" : checkforcar.id,
	"email" : req.body.owneremail,
	"created_on" :new Date(),
	"manufacturer" : checkforcar.manufacturer,
	"model" : checkforcar.model,
	"price" : checkforcar.price,
	"state" : checkforcar.state,
	"status" : checkforcar.status
	},
"message" : "The ad have been marked as sold."
})
	} else {
	
res.status(404).send({
"status" : 404,
"error" : "404 not found",
"message" : "Oops cant find this ad"
});
}
})
/////////////////////////





///////////seller edit price///////////////////
app.patch("/car/:carid/price", (req, res) => {
	const checkforcar = allcars.find(u => u.id == req.params.carid && u.status == "available");
	if(checkforcar){
		checkforcar.price = req.body.dnewprice;
		console.log("marked");
		console.log({
			"id" : checkforcar.id,
			"email" : req.body.owneremail,
			"created_on" :new Date(),
			"manufacturer" : checkforcar.manufacturer,
			"model" : checkforcar.model,
			"price" : checkforcar.price,
			"state" : checkforcar.state,
			"status" : checkforcar.status
			})
res.status(200).json({
	"status" : 200,
	"data" : {
	"id" : checkforcar.id,
	"email" : req.body.owneremail,
	"created_on" :new Date(),
	"manufacturer" : checkforcar.manufacturer,
	"model" : checkforcar.model,
	"price" : checkforcar.price,
	"state" : checkforcar.state,
	"status" : checkforcar.status
	},
"message" : "The price have been changed successfully."
})
	} else {
	
res.status(404).send({
"status" : 404,
"error" : "404 not found",
"message" : "Oops cant find this ad or have been sold"
});
}
})
/////////////////////////
 
 
 
 
 
 
  //handles view single car
 app.get("/car/:carid", (req, res) => {
 	const confirmcar = allcars.find(u => u.id == req.params.carid);
 	if(confirmcar){
 		const confirmowner = allusers.find(t => t.email == confirmcar.email)
 		res.status(200).json({
 			"status" : 200,
 			"data" : {
				"id" : confirmcar.id,
				"owner" : confirmowner.id,
				"created_on" : confirmcar.created_on,
				"state" : confirmcar.state,
				"status" : confirmcar.status,
				"price" : confirmcar.price,
				"manufacturer" : confirmcar.manufacturer,
				"model" : confirmcar.model,
				"body_type" : confirmcar.color,
				"pics" : confirmcar.pics
				}
 		})
 			
 		
 	} else {
 	
 			res.status(404).send({
 				"error" : "The car was not found"
 			})
 			
 	}
 })
 
 
 
  
  
  
  
  
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
 
 
 
 
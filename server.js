let allusers = [];
let allcars = [];
let allorders =[];
let allreports=[];
//console.log('starting server');
const express = require("express");
const Joi = require("joi");
//const jwt = require('jwt-simple');
const app = express(); app.set("jwtTokenSecret", "ourlittlesecret");
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
app.get("/allorders",(req, res) =>{res.status(200).send(allorders);});
app.get("/allusers",(req, res) =>{res.status(200).send(allusers);});
app.get("/allcars",(req, res) =>{res.status(200).send(allcars); });
 
////delete car ad/////////
app.delete("/car/:carid",(req, res) =>{
	 let todelete = req.params.carid;
	 const checktodelete = allcars.find(del => del.id == todelete);
	 if(checktodelete){
		var index = allcars.indexOf(checktodelete);
		allcars.splice(index, 1);
		res.status(200).json({
			"status" : 200,
			"data" : "Car Ad successfully deleted"
		});
	 }else{
		res.status(404).json({
			"status" : 400,
			"error" : "Car Ad not found"
		});
	 }
});
///////////////////car search query//////////////////
 
app.get("/car",(req, res) =>{/* istanbul ignore next */
	let alltoquery=[];
	let seniorresult = [];
	let nofit = [];
	let noquerycar =[];

	if(Object.keys(req.query).length > 0){
		let allthequeries = Object.keys(req.query).length;
		let thequery = Object.keys(req.query);
		for(let z=0; z < allthequeries; z++){
			alltoquery.push(thequery[z]);
		}
		//if(nofit.length == 0){var preresult = allcars;	}else {var preresult = seniorresult;}
		//checking each car 
		var preresult = allcars;
		for(let b=0; b < preresult.length; b++){

			for(let p =0; p < allthequeries; p++){
				//status query start	
				if(b == (preresult.length - 1))
					nofit.push(1);		
				if(alltoquery[p] == "status"){
					let looktru = preresult[b].status;
					if(looktru == req.query.status){
						//let findid = allusers.find(d => d.email == preresult[b].email);
						let qstatus = {
							"id" : preresult[b].id,
							"owner" : preresult[b].owner,
							"email" : preresult[b].email,
							"created_on" : preresult[b].created_on,
							"state" : preresult[b].state,
							"status" : preresult[b].status,
							"price" : preresult[b].price,
							"manufacturer" : preresult[b].manufacturer,
							"model" : preresult[b].model,
							"body_type" : preresult[b].body_type,
							"engine_size" : preresult[b].engine_size,
							"pics" : preresult[b].pics
						};
						var checkin	= seniorresult.find(y => y.id == preresult[b].id);
						if(!checkin)
							seniorresult.push(qstatus);

		
					}else{
						//seniorresult = [];
						//return;	
					}

					var checkout	= seniorresult.find(l => l.status != req.query.status);
					if(checkout){
						var index = seniorresult.indexOf(checkout);
						seniorresult.splice(index, 1);
					}
				}else if(alltoquery[p] == "min_price" ){
					let looktru = parseInt(preresult[b].price);
					if(looktru >= parseInt(req.query.min_price) && !isNaN(req.query.min_price)){
						//let findid = allusers.find(d => d.email == preresult[b].email);
						let qstatus = {
							"id" : preresult[b].id,
							"owner" :preresult[b].owner,
							"email" : preresult[b].email,
							"created_on" : preresult[b].created_on,
							"state" : preresult[b].state,
							"status" : preresult[b].status,
							"price" : preresult[b].price,
							"manufacturer" : preresult[b].manufacturer,
							"model" : preresult[b].model,
							"body_type" : preresult[b].body_type,
							"engine_size" : preresult[b].engine_size,
							"pics" : preresult[b].pics
						};
						var checkin	= seniorresult.find(y => y.id == preresult[b].id);
						if(!checkin)
							seniorresult.push(qstatus);		
					}else if(isNaN(req.query.min_price)){
						seniorresult = [];
						res.status(400).send("wrong value formart for min_price");

						return;
					}else{
						//seniorresult = [];
						//return;	
					}
					var checkout	= seniorresult.find(l => parseInt(l.price) < parseInt( req.query.min_price));
					if(checkout){
						var index = seniorresult.indexOf(checkout);
						seniorresult.splice(index, 1);
					}	
				}else if(alltoquery[p] == "max_price"){
					let looktru = parseInt(preresult[b].price);
					if(looktru <= parseInt(req.query.max_price) && !isNaN(req.query.max_price)){
						//let findid = allusers.find(d => d.email == preresult[b].email);
						let qstatus = {
							"id" : preresult[b].id,
							"owner" :preresult[b].owner, 
							"email" : preresult[b].email,
							"created_on" : preresult[b].created_on,
							"state" : preresult[b].state,
							"status" : preresult[b].status,
							"price" : preresult[b].price,
							"manufacturer" : preresult[b].manufacturer,
							"model" : preresult[b].model,
							"body_type" : preresult[b].body_type,
							"engine_size" : preresult[b].engine_size,
							"pics" : preresult[b].pics
						};
						var checkin	= seniorresult.find(y => y.id == preresult[b].id);
						if(!checkin)
							seniorresult.push(qstatus);		
					}else if(isNaN(req.query.max_price)){
						seniorresult = [];
						res.status(400).send("wrong value formart for max_price");
						return;
					}else{
						//seniorresult = [];
						//return;	
					}
					var checkout	= seniorresult.find(l => parseInt(l.price) > parseInt(req.query.max_price));
					if(checkout){
						var index = seniorresult.indexOf(checkout);
						seniorresult.splice(index, 1);
					}
				}else if(alltoquery[p] == "manufacturer"){
					let looktru = preresult[b].manufacturer;
					if(looktru == req.query.manufacturer){
						//let findid = allusers.find(d => d.email == preresult[b].email);
						let qstatus = {
							"id" : preresult[b].id,
							"owner" : preresult[b].owner,
							"email" : preresult[b].email,
							"created_on" : preresult[b].created_on,
							"state" : preresult[b].state,
							"status" : preresult[b].status,
							"price" : preresult[b].price,
							"manufacturer" : preresult[b].manufacturer,
							"model" : preresult[b].model,
							"body_type" : preresult[b].body_type,
							"engine_size" : preresult[b].engine_size,
							"pics" : preresult[b].pics
						};
						var checkin	= seniorresult.find(y => y.id == preresult[b].id);
						if(!checkin)
							seniorresult.push(qstatus);		
		
					}else{
						//seniorresult = [];
						//return;	
					}
					var checkout	= seniorresult.find(l => l.manufacturer != req.query.manufacturer);
					if(checkout){
						var index = seniorresult.indexOf(checkout);
						seniorresult.splice(index, 1);
					}
				}else if(alltoquery[p] == "state"){
					let looktru = preresult[b].state;
					if(looktru == req.query.state){
						//let findid = allusers.find(d => d.email == preresult[b].email);
						let qstatus = {
							"id" : preresult[b].id,
							"owner" : preresult[b].owner,
							"email" : preresult[b].email,
							"created_on" : preresult[b].created_on,
							"state" : preresult[b].state,
							"status" : preresult[b].status,
							"price" : preresult[b].price,
							"manufacturer" : preresult[b].manufacturer,
							"model" : preresult[b].model,
							"body_type" : preresult[b].body_type,
							"engine_size" : preresult[b].engine_size,
							"pics" : preresult[b].pics
						};
						var checkin	= seniorresult.find(y => y.id == preresult[b].id);
						if(!checkin)
							seniorresult.push(qstatus);		
		
					}else{
						//seniorresult = [];
						//return;	
					}
					var checkout	= seniorresult.find(l => l.state != req.query.state);
					if(checkout){
						var index = seniorresult.indexOf(checkout);
						seniorresult.splice(index, 1);
					}
				}else if(alltoquery[p] == "body_type"){
					let looktru = preresult[b].body_type;
					if(looktru == req.query.body_type){
						//let findid = allusers.find(d => d.email == preresult[b].email);
						let qstatus = {
							"id" : preresult[b].id,
							"owner" : preresult[b].owner,
							"email" : preresult[b].email,
							"created_on" : preresult[b].created_on,
							"state" : preresult[b].state,
							"status" : preresult[b].status,
							"price" : preresult[b].price,
							"manufacturer" : preresult[b].manufacturer,
							"model" : preresult[b].model,
							"body_type" : preresult[b].body_type,
							"engine_size" : preresult[b].engine_size,
							"pics" : preresult[b].pics
						};
						var checkin	= seniorresult.find(y => y.id == preresult[b].id);
						if(!checkin){
							seniorresult.push(qstatus);
						}	
		
					}else{
						//seniorresult = [];
						//return;	
					}
					var checkout	= seniorresult.find(l => l.body_type != req.query.body_type);
					if(checkout){
						var index = seniorresult.indexOf(checkout);
						seniorresult.splice(index, 1);
					}
				}else{
					res.status(400).send("bad request");
					return;
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
			if(alltoquery[q] == "manufacturer"){
				for(let w =0; w < seniorresult.length; w++){
					var checkedout	= seniorresult.find(n => n.manufacturer != req.query.manufacturer );
					if(checkedout){
						var index = seniorresult.indexOf(checkedout);
						seniorresult.splice(index, 1);
					}
				}
			}
			if(alltoquery[q] == "state"){
				for(let w =0; w < seniorresult.length; w++){
					var checkedout	= seniorresult.find(n => n.state != req.query.state );
					if(checkedout){
						var index = seniorresult.indexOf(checkedout);
						seniorresult.splice(index, 1);
					}
				}
			}
			if(alltoquery[q] == "body_type"){
				for(let w =0; w < seniorresult.length; w++){
					var checkedout	= seniorresult.find(n => n.body_type != req.query.body_type );
					if(checkedout){
						var index = seniorresult.indexOf(checkedout);  seniorresult.splice(index, 1);
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
		for(let v =0; v < allcars.length; v++){
			//let findid = allusers.find(d => d.email == allcars[v].email);
			let allnoqcar = {
				"id" : allcars[v].id,
				"owner" : allcars[v].owner,
				"email" : allcars[v].email,
				"created_on" : allcars[v].created_on,
				"state" : allcars[v].state,
				"status" : allcars[v].status,
				"price" : allcars[v].price,
				"manufacturer" : allcars[v].manufacturer,
				"model" : allcars[v].model,
				"body_type" : allcars[v].body_type,
				"engine_size" : allcars[v].engine_size,
				"pics" : allcars[v].pics
				
			};
			noquerycar.push(allnoqcar);
		}
		if(noquerycar.length > 0){	
			res.status(200).json({
				"status":200,
				"data":	noquerycar
			});
		}else{
			res.status(404).json({
				"status":404,
				"msg":"no car ad to display"
			});
		}

		//res.status(400).json({
		//	"status":400,
		//	"error":"no request"
		//});
	}
});
//@codeCoverageIgnoreEnd
 
//handles sign up
app.post("/auth/signup", (req, res) => { 
	const schema ={
		first_name : Joi.string().min(3),
		last_name : Joi.string().min(3),
		email : Joi.string().min(3),
		address : Joi.string().min(3),
		password : Joi.string().min(6)
		
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
		//console.log(postit);
	});
////////////sign in////////////
app.post("/auth/signin", (req, res) => {
	const schema ={
		email : Joi.string().min(3),
		password : Joi.string().min(6)
		
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
 
///////////post car end point///////////////////
app.post("/car", (req, res) => {
	const schema ={
		email : Joi.string().min(1),
		owner : Joi.string().min(1),
		manufacturer : Joi.string().min(1),
		model : Joi.string().min(2),
		price : Joi.string().min(1),
		state : Joi.string().min(1),
		engine_size : Joi.string().min(1),
		body_type : Joi.string().min(2),
		pics : Joi.string().min(2),
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
  	 	let postcarform = {
 		"id" : allcars.length + 1,
		 "email" : req.body.pcposter,
		 "owner" : req.body.owner,
 		"created_on" : new Date(),
 		"manufacturer" : req.body.manufacturer,
 		"model" : req.body.model,
 		"price" : req.body.price,
 		"state" : req.body.state,
 		"engine_size" : req.body.engine_size,
 		"body_type" : req.body.body_type,
		 "pics" : req.body.pcpics,
		 "status" : "available"
 	};
 	allcars.push(postcarform);
 	//console.log(postcarform)
  	res.status(200).json({"status":200,"data":{"id" : allcars.length + 1,"email" : req.body.pcposter,"created_on" : new Date(),"manufacturer" : req.body.pcman,"model" : req.body.pcmodel,"price" : req.body.pprice,"state" : req.body.state,"engine_size" : req.body.pces,"body_type" : req.body.pccolor,"pics" : req.body.pcpics,"status" : "available"},"message" : "Car posted successfully"});
});
/////////////////////////

///////////purchase///////////////////
app.post("/order", (req, res) => {
	const schema ={
		buyer : Joi.string().min(1),
		car_id : Joi.string().min(1),
		amount : Joi.string().min(1),
		order_price : Joi.string().min(3),
		status : Joi.string().min(3)
		
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
	let purchaseorderform = {
		"id" : allorders.length + 1,
		"buyer" : req.body.buyer, 
		"car_id" : req.body.car_id,
		"amount" : req.body.amount,
		"price_offered" : req.body.order_price, 
		"status" : req.body.status,
		"created_on" : new Date()
	};
	
	allorders.push(purchaseorderform);
	//console.log(purchaseorderform)
	res.status(200).json({
		"status" : 200,
		"data" : {
			"id" : allorders.length + 1,
			"car_id" : req.body.poid,
			"created_on" : new Date(),
			"status" : req.body.statep,
			"price" : req.body.popprice,
			"price_offered" : req.body.poprice
		},
		"message" : "Your offer have been sent to the seller and still pending, Please check your order dashboard to see when it is accepted"
	});
});
/////////////////////////

///////////edit purchase order price///////////////////
app.patch("/order/:orderrid/price", (req, res) => {
	const schema ={
		
		order_price : Joi.string().min(3),
		
		
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
	const checkfororder = allorders.find(u => u.id == req.params.orderrid && u.status == "pending");
	if(checkfororder){
		const old_price = checkfororder.price_offered;
		checkfororder.price_offered = req.body.order_price;
		//console.log(req.body.newpoprice)
		
		let editorderform = {
			"id" : checkfororder.id,
			"buyer" : checkfororder.buyer, 
			"car_id" : checkfororder.car_id,
			"amount" : checkfororder.amount,
			"new_price_offered" : checkfororder.price_offered,
			"old_price_offered" : old_price,
			"status" : checkfororder.status
		};

		//console.log(editorderform);
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
		});
	} else {
	
		res.status(404).send({
			"status" : 404,
			"error" : "404 not found",
			"msg" : "Oops cant find this order"
		});
	}
});
/////////////////////////

///////////mark carf as sold///////////////////
app.patch("/car/:carid/status", (req, res) => {
	
	const checkforcar = allcars.find(u => u.id == req.params.carid && u.status == "available");
	if(checkforcar){
		checkforcar.status = "sold";
		
		res.status(200).json({
			"status" : 200,
			"data" : {
				"id" : checkforcar.id,
				"email" : req.body.email,
				"created_on" :new Date(),
				"manufacturer" : checkforcar.manufacturer,
				"model" : checkforcar.model,
				"price" : checkforcar.price,
				"state" : checkforcar.state,
				"status" : checkforcar.status
			},
			"message" : "The ad have been marked as sold."
		});
	} else {
		res.status(404).send({
			"status" : 404,
			"error" : "404 not found","message" : "Oops cant find this ad"});
	}
});
/////////////////////////

///////////seller edit price///////////////////
app.patch("/car/:carid/price", (req, res) => {
	const schema ={
		email : Joi.string().min(1),
		price : Joi.string().min(1),
		
		
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
	const checkforcar = allcars.find(u => u.id == req.params.carid && u.status == "available");
	if(checkforcar){
		checkforcar.price = req.body.price;
		//console.log("marked");
		
		res.status(200).json({
			"status" : 200,
			"data" : {
				"id" : checkforcar.id,
				"email" : req.body.email,
				"created_on" :new Date(),
				"manufacturer" : checkforcar.manufacturer,
				"model" : checkforcar.model,
				"price" : checkforcar.price,
				"state" : checkforcar.state,
				"status" : checkforcar.status
			},
			"message" : "The price have been changed successfully."
		});
	} else {
	
		res.status(404).send({
			"status" : 404,
			"error" : "404 not found",
			"msg" : "Oops cant find this ad or have been sold"
		});
	}
});
/////////////////////////

//handles view single car
app.get("/car/:carid", (req, res) => {
 	const confirmcar = allcars.find(u => u.id == req.params.carid);
 	if(confirmcar){
 		
 		res.status(200).json({ "status" : 200, "data" : {"id" : confirmcar.id,	"owner" : confirmcar.owner,"created_on" : confirmcar.created_on,"state" : confirmcar.state,"status" : confirmcar.status,"price" : confirmcar.price,"manufacturer" : confirmcar.manufacturer,"model" : confirmcar.model,"body_type" : confirmcar.body_type,"pics" : confirmcar.pics}});
 
 		
 	} else {res.status(404).send({"error" : "The car was not found"	});
 
 	}
});
 
///////////flag car as frad endpoint///////////////////
app.post("/flag", (req, res) => {
	const schema ={
		car_id : Joi.string().min(1),
		reason : Joi.string().min(1),
		description : Joi.string().min(1),
		reporter_email : Joi.string().min(1),
		
		
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	}
	let reportform = {
		"id" : allreports.length + 1,
		"car_id" : req.body.car_id,
		"created_on" : new Date(),
		"reason" : req.body.reason, 
		"description" : req.body.description,
		"reporter" : req.body.repby
	};
	allreports.push(reportform);
	//console.log(reportform)
	res.status(200).json({
		"status":200,
		"data":{
			"id" : allreports.length + 1,
			"car_id" : req.body.car_id,
			"created_on" : new Date(),
			"reason" : req.body.reason, 
			"description" : req.body.description,
			"reporter" : req.body.repby
		},
		"message" : "Thanks, your report is sent. It will be investigated and acted upon accordingly"
	});
});
/////////////////////////

app.get("/me", ensureToken, function(req, res) { 
 
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
 
 
 
module.exports = app;
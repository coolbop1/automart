
const Pool = require ("pg").Pool;
let conusername ="gkhfnrideiyyoi";
	let condatabase= "ddelc2mc1p0din";
	let conhost="ec2-23-21-91-183.compute-1.amazonaws.com";
	let conpassword="75f800626b4be7b6fe829d59277b3a5aca40c09ac1538bf69cbde20997d957ba";
	let conssl=true;
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
function setenvparam(){
if (process.env.NODE_ENV && process.env.NODE_ENV === "test" ) {conusername="tovlhixtdmbgcz";condatabase="dfvspqpvd9vmc6";conhost='ec2-23-21-91-183.compute-1.amazonaws.com';conpassword='f48766c6c29f9b25108448b51c39d55084235c27d9352129da35c9cddbb78823';conssl=true;}
else if(process.env.NODE_ENV === "offline"){conusername="andela";condatabase="andela";conhost="localhost";conpassword="";conssl=false;}
else{
conusername ="gkhfnrideiyyoi";condatabase= "ddelc2mc1p0din";conhost="ec2-23-21-91-183.compute-1.amazonaws.com";conpassword="75f800626b4be7b6fe829d59277b3a5aca40c09ac1538bf69cbde20997d957ba";conssl=true;
}

//console.log(conusername)
}

	const pool = new Pool({
		user: conusername,
		host: conhost,
		database: condatabase,
		password: conpassword,
		port: "5432",
		ssl: conssl
	});
	pool.connect();



const express = require("express");
const Joi = require("joi");

const route = express.Router();
let jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

route.use(express.json());
route.use(bodyParser.urlencoded({ 
	extended: true }));//middleware

    route.use(bodyParser.text({ type: "application/json" }));

    route.use(bodyParser.text({ type: "application/json" }));
route.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
	next();
});

    route.get("/api/v1/oenv", (req, res) => {
	changeenv();
	
		res.status(200).send("ok");
	
	
})
route.get("/api/v1/ooenv", (req, res) => {
	changeenvpro();
	
		res.status(200).send("ok");
	
})
route.get("/api/v1/oooenv", (req, res) => {
	changeenvoff();
	
		res.status(200).send("ok");
	
})



    route.get("/api/v1/allorders",(req, res) =>{  pool.query("SELECT * FROM orders",(error,result)=>{res.status(200).send(result.rows);})});

///////////purchase///////////////////
route.post("/api/v1/order", ensureToken, (req, res) => {
	let { user } = req.token;
	const schema ={
		car_id : Joi.number().min(0).required(),
		amount : Joi.number().min(0).required(),
		order_price : Joi.number().min(0).required(),
		status : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(3)
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"status":409,
		"error" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
	
	
	let pdate = new Date();
	//allorders.push(purchaseorderform);
	//console.log(purchaseorderform)
	pool.query("insert into orders (buyer, car_id, amount, price_offered, status, created_on) values ($1,$2,$3,$4,$5,$6) RETURNING *",[user.id,parseInt(req.body.car_id),parseInt(req.body.amount),parseInt(req.body.order_price),req.body.status,pdate],(error,result)=>{
		//console.log(error,result);
		res.status(201).json({
		"status" : 201,
		"data" : {
			"id" : result.rows[0].id,
			"car_id" : result.rows[0].car_id,
			"created_on" : result.rows[0].created_on,
			"status" : result.rows[0].status,
			"price" : result.rows[0].amount,
			"price_offered" : result.rows[0].price_offered
		},
		"message" : "Your offer have been sent to the seller and still pending, Please check your order dashboard to see when it is accepted"
	});
		
	})
	
});
/////////////////////////

///////////edit purchase order price///////////////////
route.patch("/api/v1/order/:orderrid/price", ensureToken, (req, res) => {
	let { user } = req.token;
	const schema ={
		order_price : Joi.number().min(0).required()
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"status":409,
		"error" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
	pool.query("update orders set price_offered=$1 where id=$2 and status=$3 and buyer=$4 RETURNING *",[req.body.order_price,req.params.orderrid,"pending",user.id],(error,result)=>{
		if(result.rows.length > 0){
			//console.log(req.body.newpoprice)
			
			let editorderform = {
				"id" : result.rows[0].id,
				"buyer" : result.rows[0].buyer, 
				"car_id" : result.rows[0].car_id,
				"amount" : result.rows[0].amount,
				"new_price_offered" : result.rows[0].order_price,
				"status" : result.rows[0].status
			};
	
			//console.log(editorderform);
			res.status(200).json(	{
				"status" : 200,
				"data" : editorderform,
				"message" : "Your order price have been updated successfully"
			});
		} else {
		
			res.status(404).json({
				"status" : 404,
				"error" : "Oops cant find this order or does not belong to you"
			});
		}
	});
});
/////////////////////////
function ensureToken(req, res, next) { 
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {  
		const berarer = bearerHeader.split(" "); 
		const bearerToken = berarer[1]; 
		req.token = bearerToken;
		jwt.verify(req.token, "ourlittlesecret", function(err, data) {
			 if (err) {res.status(403).json({
				status:403,
			"error":"Opps!! you are not authorized to perform this operation,please login to get authorized token"}); 
	
	 	}else{
			req.token=data;
			next();
		}; });
		} else {  res.status(403).json({
			status:403,
		"error":"Opps!! you are not authorized to perform this operation,please login to get authorized token"}); }

}







module.exports = route;
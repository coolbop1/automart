import express from "express";
import  Joi from "joi";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser"
import db from "../config";
import confirm from "../controllers";
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
	
	
	function setenvparam(){
if (process.env.NODE_ENV && process.env.NODE_ENV === "test" ) {conusername="tovlhixtdmbgcz";condatabase="dfvspqpvd9vmc6";conhost='ec2-23-21-91-183.compute-1.amazonaws.com';conpassword='f48766c6c29f9b25108448b51c39d55084235c27d9352129da35c9cddbb78823';conssl=true;}
else if(process.env.NODE_ENV === "offline"){conusername="andela";condatabase="andela";conhost="localhost";conpassword="";conssl=false;}
else{
conusername ="gkhfnrideiyyoi";condatabase= "ddelc2mc1p0din";conhost="ec2-23-21-91-183.compute-1.amazonaws.com";conpassword="75f800626b4be7b6fe829d59277b3a5aca40c09ac1538bf69cbde20997d957ba";conssl=true;
}

pool = db.getPool(conusername,condatabase,conhost,conpassword,conssl);
//console.log(conusername)
}





const route = express.Router();


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
route.post("/api/v1/order", confirm.ensureToken, (req, res) => {
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
route.patch("/api/v1/order/:orderrid/price", confirm.ensureToken, (req, res) => {
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


route.get("/api/v1/order",confirm.ensureToken,(req,res)=>{
	let buyerquery;
	let sellerquery;
	let statusquery;
	let statusequery;
	
	if(typeof req.query.buyer !== "undefined"){
		buyerquery = parseInt(req.query.buyer);
	}else{
		buyerquery = null;
	}
	if(typeof req.query.seller !== "undefined"){
		sellerquery = parseInt(req.query.seller);
	}else{
		sellerquery = null;
	}
	if(typeof req.query.status !== "undefined"){
		statusquery = req.query.status;
	}else{
		statusquery = null;
	}
	if(typeof req.query.statuses !== "undefined"){
		statusequery = req.query.statuses;
	}else{
		statusequery = null;
	}
	pool.query("select a.*,b.manufacturer,b.model,b.id as carid,b.owner from orders a join postads b on a.car_id=b.id"
	+" where CASE"
	+" WHEN $1::varchar IS NOT NULL THEN a.buyer = $1 ELSE 1=1 END and CASE"
	+" WHEN $2::int IS NOT NULL THEN b.owner = $2 ELSE 1=1 END and CASE"
	+" WHEN $3::varchar IS NOT NULL THEN a.status = $3 ELSE 1=1 END and CASE"
	+" WHEN $4::varchar IS NOT NULL THEN a.status != $4 ELSE 1=1 END",[buyerquery,sellerquery,statusquery,statusequery],(error,result)=>{
		//console.log(error,result);
		if(result.rows.length > 0){
			res.status(200).json({
				"status":200,
				"data":result.rows
			})
		}else{
			res.status(404).json({
				"status":404,
				"error":"could not find order by this buyer"
				})
		}
		
		
	})
	
	
})


route.patch("/api/v1/order/status/:orderid",confirm.ensureToken,(req,res)=>{
	pool.query("update orders set status=$1 where id=$2 and status=$3 RETURNING * ",["accepted",req.params.orderid,"pending"],(err,result)=>{
		console.log(req.params.orderid)
		if(result.rows.length > 0){
			res.status(200).json({
				"status":200,
				"message":"The order have been marked accepted"
				})
			}else{
				res.status(404).json({
				"status":404,
				"error":"Cannot Mark Order as accepted"
				})
			}
		
	})
})














module.exports = route;
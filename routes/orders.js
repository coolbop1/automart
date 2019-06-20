const Pool = require ('pg').Pool;
const pool = new Pool({
	user: 'gkhfnrideiyyoi',
	host: 'ec2-23-21-91-183.compute-1.amazonaws.com',
	database: 'ddelc2mc1p0din',
	password: '75f800626b4be7b6fe829d59277b3a5aca40c09ac1538bf69cbde20997d957ba',
	port: '5432',
	ssl: true
});

	


function connecct(){	
 pool.connect()
}
const express = require("express");
const Joi = require("joi");

const route = express.Router();

var bodyParser = require("body-parser");

route.use(express.json());
route.use(bodyParser.urlencoded({ 
	extended: true }));//middleware

    route.use(bodyParser.text({ type: "application/json" }));

    


    route.get("/api/v1/allorders",(req, res) =>{ connecct(); pool.query("SELECT * FROM orders",(error,result)=>{res.status(200).send(result.rows);})});

///////////purchase///////////////////
route.post("/api/v1/order", (req, res) => {
	connecct();
	const schema ={
		buyer : Joi.number().min(0).required(),
		car_id : Joi.number().min(0).required(),
		amount : Joi.number().min(0).required(),
		order_price : Joi.number().min(0).required(),
		status : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(3)
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
		"buyer" : req.body.buyer, 
		"car_id" : req.body.car_id,
		"amount" : req.body.amount,
		"price_offered" : req.body.order_price, 
		"status" : req.body.status,
		"created_on" : new Date()
	};
	
	let pdate = new Date();
	//allorders.push(purchaseorderform);
	//console.log(purchaseorderform)
	pool.query("insert into orders (buyer, car_id, amount, price_offered, status, created_on) values ($1,$2,$3,$4,$5,$6) RETURNING *",[parseInt(req.body.buyer),parseInt(req.body.car_id),parseInt(req.body.amount),parseInt(req.body.order_price),req.body.status,pdate],(error,result)=>{
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
route.patch("/api/v1/order/:orderrid/price", (req, res) => {
	connecct();
	const schema ={
		
		order_price : Joi.number().min(0).required(),
		
		
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
	pool.query("update orders set price_offered=$1 where id=$2 and status=$3 RETURNING *",[req.body.order_price,req.params.orderrid,"pending"],(error,result)=>{
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
				"error" : "404 not found",
				"msg" : "Oops cant find this order"
			});
		}
	});
	
});
/////////////////////////


module.exports = route;
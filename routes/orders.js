let allorders =[];
const express = require("express");
const Joi = require("joi");

const route = express.Router();

var bodyParser = require("body-parser");

route.use(express.json());
route.use(bodyParser.urlencoded({ 
	extended: true }));//middleware

    route.use(bodyParser.text({ type: "application/json" }));

    


    route.get("/api/v1/allorders",(req, res) =>{res.status(200).send(allorders);});

///////////purchase///////////////////
route.post("/api/v1/order", (req, res) => {
	const schema ={
		buyer : Joi.number().min(0).required(),
		car_id : Joi.number().min(0).required(),
		amount : Joi.number().min(0).required(),
		order_price : Joi.number().min(0).required(),
		status : Joi.string().regex(/^[,. a-z0-9]+$/).trim().min(3)
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
	res.status(201).json({
		"status" : 201,
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
route.patch("/api/v1/order/:orderrid/price", (req, res) => {
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
			"new_price_offered" : req.body.order_price,
			"old_price_offered" : old_price,
			"status" : checkfororder.status
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
/////////////////////////


module.exports = route;
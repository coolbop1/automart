let allreports=[];
const express = require("express");
const Joi = require("joi");

const route = express.Router();

var bodyParser = require("body-parser");

route.use(express.json());
route.use(bodyParser.urlencoded({ 
	extended: true }));//middleware

    route.use(bodyParser.text({ type: "application/json" }));





 
///////////flag car as frad endpoint///////////////////
route.post("/api/v1/flag", (req, res) => {
	const schema ={
		car_id : Joi.number().min(0).required(),
		reason : Joi.string().regex(/^[,. a-z0-9]+$/).trim().min(1),
		description : Joi.string().regex(/^[,. a-z0-9]+$/).trim().min(1),
		reporter_email : Joi.string().trim().email().required(),
		
		
		
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
	res.status(201).json({
		"status":201,
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

module.exports = route;
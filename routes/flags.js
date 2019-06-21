
const Pool = require ("pg").Pool;
let conusername;
	let condatabase;
	let conhost;
	let conpassword;
	let conssl;

if ( process.env.NODE_ENV === "test" ) {conusername="tovlhixtdmbgcz";condatabase="dfvspqpvd9vmc6";conhost='ec2-23-21-91-183.compute-1.amazonaws.com';conpassword='f48766c6c29f9b25108448b51c39d55084235c27d9352129da35c9cddbb78823';conssl=true;}else{conusername="gkhfnrideiyyoi";condatabase="ddelc2mc1p0din";conhost="ec2-23-21-91-183.compute-1.amazonaws.com";conpassword="75f800626b4be7b6fe829d59277b3a5aca40c09ac1538bf69cbde20997d957ba";conssl=true;}


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
route.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
	next();
});




 
///////////flag car as frad endpoint///////////////////
route.post("/api/v1/flag",ensureToken, (req, res) => {
	const schema ={
		car_id : Joi.number().min(0).required(),
		reason : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(1),
		description : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(1),		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"status":409,
		"error" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return ;
    }
    
	let ccdate = new Date();
	let { user } = req.token;
    pool.query("insert into reports (car_id, created_on, reason, description, reporter) values ($1,$2,$3,$4,$5) RETURNING * ",[req.body.car_id,ccdate,req.body.reason,req.body.description,user.email],(error,result)=>{
        let reportform = {
            "id" : result.rows[0].id,
            "car_id" : result.rows[0].car_id,
            "created_on" : result.rows[0].created_on,
            "reason" : result.rows[0].reason, 
            "description" : result.rows[0].description,
            "reporter" : result.rows[0].reporter
        };
        res.status(201).json({
            "status":201,
            "data":reportform,
            "message" : "Thanks, your report is sent. It will be investigated and acted upon accordingly"
        });
    })
	
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
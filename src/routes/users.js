import express from "express";
import  Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import db from "../config";
import confirm from "../middleware/verifytoken";
import validate from "../middleware/validateinput";
import { signup,users,sendPassword,signin } from "../controllers/usercontroller";
import connect from "../server";

const { validateuserinputs,verifynewemail,verifyaction,validateloginputs } = validate;
const { configuser,configdatabase,confighost,configpassword,configssl,thegmail } = connect;
const pool = db.getPool(configuser,configdatabase,confighost,configpassword,configssl);
const route = express.Router();


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

route.post("/api/v1/auth/signup",validateuserinputs,verifynewemail, signup);
route.get("/api/v1/allusers", users);
route.post("/api/v1/user/:email/reset_password", verifyaction,sendPassword)
route.post("/api/v1/auth/signin",validateloginputs, signin);
 

	
////////// for testing-----delete user endpoint----///
route.get("/api/v1/user/truncateuser", (req, res) => {
	
	pool.query("truncate table allusers restart identity",(error,result)=>{
			 });
			 res.status(200).send({"see":"deleted"});
});
route.get("/api/v1/user/truncatepostad", (req, res) => {
		
	pool.query("truncate table postads restart identity",(error,result)=>{		
		 });
		 res.status(200).send({"see":"deleted"});
});
route.get("/api/v1/user/truncateorders", (req, res) => {
		
	pool.query("truncate table orders restart identity",(error,result)=>{
		
		 });
		 res.status(200).send({"see":"deleted"});
});
route.get("/api/v1/user/truncatereports", (req, res) => {
		
	pool.query("truncate table reports restart identity",(error,result)=>{
				 });
				 res.status(200).send({"see":"deleted"});
});

///////////////////////////////////////////////////////
	
	







route.get("/api/v1/me", confirm.ensure, function(req, res) { 

 
	jwt.verify(req.token, "ourlittlesecret", function(err, data) { if (err) { res.sendStatus(403); } else{res.status(200).json({ status:200,description:data}); } });
});
 
 module.exports = {
 	users:route
 }

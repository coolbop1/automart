import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import confirm from "../middleware/verifytoken";
import validate from "../middleware/validateinput";
import { signup,users,sendPassword,signin } from "../controllers/usercontroller";

const { validateuserinputs,verifynewemail,verifyaction,validateloginputs } = validate;

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

route.post("/auth/signup",validateuserinputs,verifynewemail, signup);
route.get("/allusers", users);
route.post("/user/:email/reset_password", verifyaction,sendPassword)
route.post("/auth/signin",validateuserinputs,validateloginputs, signin);
 

route.get("/me", confirm.ensure, function(req, res) { 

 
	jwt.verify(req.token, "ourlittlesecret", function(err, data) { if (err) { res.sendStatus(403); } else{res.status(200).json({ status:200,description:data}); } });
});
//console.log(route.get('env'));
 module.exports = {
 	users:route
 }
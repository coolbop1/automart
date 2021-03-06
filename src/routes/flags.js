import express from "express";
import bodyParser from "body-parser";
import confirm from "../middleware/verifytoken";
import {flaginput} from "../middleware/flaginput";
import {dbwork,setaction} from "../controllers/flagcontroller";

const route = express.Router();


route.use(express.json());
route.use(bodyParser.urlencoded({ 
	extended: true }));

    route.use(bodyParser.text({ type: "application/json" }));
route.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
	next();
});

route.post("/flag",confirm.ensureToken,flaginput,dbwork);
route.delete("/user/truncateuser",setaction);

module.exports = route;
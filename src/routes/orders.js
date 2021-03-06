import express from "express";
import bodyParser from "body-parser";
import confirm from "../middleware/verifytoken";
import inputvaldate from "../middleware/orderinput";
import controller from "../controllers/ordercontroller";

const { postvalidate,getvalidate,pricepatchcheck,statusvalidate } = inputvaldate;
const { orderquery } = controller;


const route = express.Router();


route.use(express.json());
route.use(bodyParser.urlencoded({ 
	extended: true }));

    route.use(bodyParser.text({ type: "application/json" }));

    route.use(bodyParser.text({ type: "application/json" }));
route.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
	next();
});

route.post("/order", confirm.ensureToken,postvalidate,orderquery);
route.get("/allorders",getvalidate,orderquery);
route.patch("/order/:orderrid/price", confirm.ensureToken,pricepatchcheck,orderquery);
route.get("/order",confirm.ensureToken,getvalidate,orderquery)
route.patch("/order/status/:orderid",confirm.ensureToken,statusvalidate,orderquery)


module.exports = route;
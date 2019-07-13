import express from "express";
import bodyParser from "body-parser";
import confirm from "../middleware/verifytoken";
import carinputs from "../middleware/carinputs";
import controller from "../controllers/carcontroller";

const { postcarinputs,carquerycheck,carparamcheck,carstatuscheck,carpricecheck,checktodelete } = carinputs;
const { allcarquery,deletecar } = controller;



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

route.post("/api/v1/car",confirm.ensureToken,postcarinputs,allcarquery);
route.get("/api/v1/car",carquerycheck,allcarquery);
route.get("/api/v1/car/:carid",carparamcheck,allcarquery);
route.get("/api/v1/allcars",allcarquery);
route.patch("/api/v1/car/:carid/status",confirm.ensureToken,carstatuscheck,allcarquery);
route.patch("/api/v1/car/:carid/price",confirm.ensureToken,carpricecheck,allcarquery);
route.delete("/api/v1/car/:carid",confirm.ensureToken,checktodelete,deletecar);


module.exports = route;
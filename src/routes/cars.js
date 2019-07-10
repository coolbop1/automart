import express from "express";
import  Joi from "joi";
import bodyParser from "body-parser";
import db from "../config";
import confirm from "../middleware/verifytoken";
import carinputs from "../middleware/carinputs";
import connect from "../server";
import controller from "../controllers/carcontroller";

const { postcarinputs,carquerycheck } = carinputs;
const { postcar,getcarquery } = controller;
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

route.post("/api/v1/car",confirm.ensureToken,postcarinputs,postcar);
route.get("/api/v1/car",carquerycheck,getcarquery)


 route.get("/api/v1/allcars",(req, res) =>{pool.query("SELECT * FROM postads",(error,result)=>{res.status(200).send({"status":200,data:result.rows}); })});







////delete car ad/////////
route.delete("/api/v1/car/:carid",confirm.ensureToken,(req, res) =>{
    let todelete = req.params.carid;
 
    pool.query("DELETE FROM  postads WHERE id=$1",[todelete],(error,result)=>{
    	if(result){
       res.status(200).json({
           "status" : 200,
           "data" : "Car Ad successfully deleted"
       });
    }else{
       res.status(404).json({
           "status" : 404,
           "error" : "Car Ad not found"
       });
    }
    });
    
    
});
///////////////////car search query//////////////////






//handles view single car
route.get("/api/v1/car/:carid", (req, res) => {
    
    pool.query("select * from postads where id = $1",[req.params.carid],(error,result)=>{
     
            if(result.rows.length > 0)
                res.status(200).json({ "status" : 200, "data" : result.rows});
            else 
                res.status(404).send({"status":404,"error" : "The car was not found"	});
    })
});
///////////////////////////









///////////mark carf as sold///////////////////
route.patch("/api/v1/car/:carid/status",confirm.ensureToken, (req, res) => {
    let { user } = req.token;
	pool.query("update postads set status=$1 where id=$2 and status=$3 and owner=$4 RETURNING *",["sold",req.params.carid,"available",user.id],(error,result)=>{
        
        if(result && result.rows.length > 0){            
            res.status(200).json({
                "status" : 200,
                "data" : {
                    "id" : result.rows[0].id,
                    "email" : result.rows[0].email,
                    "created_on" :new Date(),
                    "manufacturer" : result.rows[0].manufacturer,
                    "model" : result.rows[0].model,
                    "price" : result.rows[0].price,
                    "state" : result.rows[0].state,
                    "status" : result.rows[0].status
                },
                "message" : "The ad have been marked as sold."
            });
        } else {
            res.status(404).send({
                "status" : 404,
                "error" : "Oops cant find this ad or does not belong to you"});
        }
    

    })
	
});
/////////////////////////


///////////seller edit price///////////////////
route.patch("/api/v1/car/:carid/price",confirm.ensureToken, (req, res) => {
    
    let { user } = req.token;
	const schema ={
		price : Joi.number().min(0).required()		
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
    pool.query("update postads set price=$1 where id=$2 and status<>$3 and email=$4 RETURNING * ",[req.body.price,req.params.carid,"sold",user.email],(error,result)=>{
        (error,result)
            if(result.rows.length > 0){ 
            res.status(200).json({
                "status" : 200,
                "data" : {
                    "id" : result.rows[0].id,
                    "email" : result.rows[0].email,
                    "created_on" :new Date(),
                    "manufacturer" : result.rows[0].manufacturer,
                    "model" : result.rows[0].model,
                    "price" : result.rows[0].price,
                    "state" : result.rows[0].state,
                    "status" : result.rows[0].status
                },
                "message" : "The price have been changed successfully."
            });
        } else {
        
            res.status(404).send({
                "status" : 404,
                "error" : "Oops cant find this ad or have been sold or does not belong to you"
            });
        }
    
    
    })
	
	
});
/////////////////////////




module.exports = route;
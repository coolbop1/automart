const Pool = require ('pg').Pool;
const pool = new Pool({
	user: 'gkhfnrideiyyoi',
	host: 'ec2-23-21-91-183.compute-1.amazonaws.com',
	database: 'ddelc2mc1p0din',
	password: '75f800626b4be7b6fe829d59277b3a5aca40c09ac1538bf69cbde20997d957ba',
	port: '5432',
	ssl: true
});

	


	
 pool.connect()

const express = require("express");
const Joi = require("joi");

const route = express.Router();

var bodyParser = require("body-parser");

route.use(express.json());
route.use(bodyParser.urlencoded({ 
	extended: true }));//middleware

    route.use(bodyParser.text({ type: "application/json" }));




 route.get("/api/v1/allcars",(req, res) =>{pool.query("SELECT * FROM postads",(error,result)=>{res.status(200).send(result.rows); })});




///////////post car end point///////////////////
route.post("/api/v1/car", (req, res) => {
	
	const schema ={
		email : Joi.string().trim().email().required(),
		owner : Joi.required(),
		manufacturer : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(1),
		model : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(2),
		price : Joi.number().min(0).required(),
		state : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(1),
		engine_size : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(1),
		body_type : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(2),
		pics : Joi.string().min(2),
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
	let dddate = new Date();
  	 	let postcarform = {
  	 		
		 "email" : req.body.email,
		 "owner" : req.body.owner,
 		"created_on" : new Date(),
 		"manufacturer" : req.body.manufacturer,
 		"model" : req.body.model,
 		"price" : req.body.price,
 		"state" : req.body.state,
 		"engine_size" : req.body.engine_size,
 		"body_type" : req.body.body_type,
		 "pics" : req.body.pics,
		 "status" : "available"
 	};
 	
 	pool.query("INSERT INTO postads (email,owner,created_on,manufacturer,model,price,state,engine_size,body_type,pics,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",[req.body.email,req.body.owner,dddate,req.body.manufacturer,req.body.model,req.body.price,req.body.state,req.body.engine_size,req.body.body_type,req.body.pics,"available"],(error,sussec)=>{
 		
 	
 	//console.log(error,sussec)
 	res.status(201).json({"status":201,"data":{
  		"email" : req.body.email,"created_on" : new Date(),"manufacturer" : req.body.pcman,"model" : req.body.pcmodel,"price" : req.body.pprice,"state" : req.body.state,"engine_size" : req.body.pces,"body_type" : req.body.pccolor,"pics" : req.body.pcpics,"status" : "available"},"message" : "Car posted successfully"});
  	
  	})
});
/////////////////////////


////delete car ad/////////
route.delete("/api/v1/car/:carid",(req, res) =>{
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

route.get("/api/v1/car",(req, res) =>{
		let allthequeries = Object.keys(req.query).length;
      let thequery = Object.keys(req.query);
      if (allthequeries > 0){
       for(let z=0; z < allthequeries; z++){
       	if(thequery[z] == "status" || thequery[z] == "min_price" || thequery[z] == "max_price" || thequery[z] == "manufacturer" || thequery[z] == "body_type" || thequery[z] == "state"){
       		if(z == allthequeries - 1){
       	dmainsearch();
       }
       		}else{
    breakthequery();
                   break;
          
       }
       
       }
       function breakthequery(){
       	res.status(400).send("bad request");
                   return;
       }
       

       function dmainsearch(){
        let theminprice;
        let themaxprice;
        let thesstatus;
        let themanu;
        let thetype;
        let thestate ;
        if(typeof req.query.min_price !== "undefined"){
            if(isNaN(req.query.min_price)){
                res.status(400).send("wrong value formart for min_price");
                return;
            }else
                theminprice = parseInt(req.query.min_price);
        }
        else
        theminprice = null;
        if(typeof req.query.max_price !== "undefined"){
            if(isNaN(req.query.max_price)){
                res.status(400).send("wrong value formart for max_price");
                return;
            }else
                themaxprice = parseInt(req.query.max_price);
        }
        else
        themaxprice = null;
        if(typeof req.query.status !== "undefined")
        thesstatus = req.query.status;
        else
        thesstatus = null;
        if(typeof req.query.body_type !== "undefined")
        thetype = req.query.body_type;
        else
        thetype = null;
        if(typeof req.query.state !== "undefined")
        thestate = req.query.state;
        else
        thestate = null;
        if(typeof req.query.manufacturer !== "undefined")
        themanu = req.query.manufacturer;
        else
        themanu = null;
	pool.query("SELECT * FROM postads"
+" where CASE"
+" WHEN $1::varchar IS NOT NULL THEN status = $1"
+" ELSE 1=1"
+" END and CASE"
+" WHEN $2::int IS NOT NULL THEN price >=$2"
+" ELSE 1=1"
+" END and CASE"
+" WHEN $3::int IS NOT NULL THEN price <= $3"
+" ELSE 1=1"
+" END and CASE"
+" WHEN $4::varchar IS NOT NULL THEN state = $4"
+" ELSE 1=1"
+" END and CASE"
+" WHEN $5::varchar IS NOT NULL THEN body_type = $5"
+" ELSE 1=1"
+" END and CASE"
+" WHEN $6::varchar IS NOT NULL THEN manufacturer = $6"
+" ELSE 1=1"
+" END",[thesstatus,theminprice,themaxprice,thestate,thetype,themanu],(erro,result)=>{
    //console.log(thesstatus,theminprice,themaxprice,thestate,thetype,themanu)
//console.log(erro,result);
    if(result)
    {
        if(result.rows.length > 0){
	        res.status(200).json({
               "status":200,
               "data":	result.rows
           });
           }else{
           	res.status(404).json({
               "status":404,
               "msg":"no result for this request"
           });
           }
        }
	})
    }
}else{
    pool.query("SELECT * FROM postads",(error,result)=>{
       
        if(result.rows.length > 0){
	        res.status(200).json({
               "status":200,
               "data":	result.rows
           });
           }else{
           	res.status(404).json({
               "status":404,
               "msg":"no car ad to display"
           });
           }
        
    })


}
})




//handles view single car
route.get("/api/v1/car/:carid", (req, res) => {
    pool.query("select * from postads where id = $1",[req.params.carid],(error,result)=>{
        if(result){
            if(result.rows.length > 0)
                res.status(200).json({ "status" : 200, "data" : result.rows});
            else 
                res.status(404).send({"error" : "The car was not found"	});
    }
    })
});
///////////////////////////









///////////mark carf as sold///////////////////
route.patch("/api/v1/car/:carid/status", (req, res) => {
	pool.query("update postads set status=$1 where id=$2 and status=$3 RETURNING *",["sold",req.params.carid,"available"],(error,result)=>{
        
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
                "message" : "The ad have been marked as sold."
            });
        } else {
            res.status(404).send({
                "status" : 404,
                "error" : "404 not found","message" : "Oops cant find this ad"});
        }
    

    })
	
});
/////////////////////////


///////////seller edit price///////////////////
route.patch("/api/v1/car/:carid/price", (req, res) => {

	const schema ={
		email : Joi.string().trim().email().required(),
		price : Joi.number().min(0).required(),
		
		
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
    } 
    pool.query("update postads set price=$1 where id=$2 RETURNING * ",[req.body.price,req.params.carid],(error,result)=>{
        
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
                "error" : "404 not found",
                "msg" : "Oops cant find this ad or have been sold"
            });
        }
    
    
    })
	
	
});
/////////////////////////


module.exports = route;
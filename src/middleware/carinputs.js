import  Joi from "joi";
import db from "../config";
import con from "../server";
import badrequest from "../helpers/errors";

const { configuser,configdatabase,confighost,configpassword,configssl } = con;
const pool = db.getPool(configuser,configdatabase,confighost,configpassword,configssl);
    
const { badreq,authError } = badrequest;

module.exports = {
    postcarinputs : function(req,res,next){
        const schema ={
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
            "status":409,
            "error" : valid.error.details[0].message
        }	
        res.status(409).send(reply);
            return;
        }else{
            req.action = "post"
            next();
            
            
        } 
    },
    carquerycheck :function(req,res,next){
        let allthequeries = Object.keys(req.query).length;
      let thequery = Object.keys(req.query);
      if (allthequeries > 0){
       for(let z=0; z < allthequeries; z++){
       	if(thequery[z] == "status" || thequery[z] == "min_price" || thequery[z] == "max_price" || thequery[z] == "manufacturer" || thequery[z] == "body_type" || thequery[z] == "state" || 
thequery[z] == "email"){
       		if(z == allthequeries - 1){
       	next();
       }
       		}else{
    breakthequery();
                   break;
          
       }
       
       }
       function breakthequery(){
       	res.status(400).send(badreq());
                   return;
       }

    }else{
        next();
    }
},
carparamcheck : function(req,res,next){
    if(isNaN(req.params.carid)){
        res.status(400).send(badreq());
    return;
    }else{
        req.action = "get";
        next();
    }
},
carstatuscheck : function(req,res,next){
    if(isNaN(req.params.carid)){
        res.status(400).send(badreq());
    return;
    }else{
        let { user } = req.token;
        pool.query("select * from postads where id=$1 and owner=$2 and status<>$3",[req.params.carid,user.id,"sold"],(err,result)=>{
            if(result.rows.length > 0){
                req.action = "patchstatus";
                next();
            }else{
                res.status(404).send({
                    "status" : 404,
                    "error" : "Oops cant find this ad, have been sold, or does not belong to you"});
                    return;
            }
        })
        
    }
},
carpricecheck : function(req,res,next){
    if(isNaN(req.params.carid)){
        res.status(400).send(badreq());
    return;
    }else{

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
    }else{
        pool.query("select * from postads where id=$1 and owner=$2 and status<>$3",[req.params.carid,user.id,"sold"],(err,result)=>{
            if(result.rows.length > 0){
                req.action = "patchprice";
                next();
            }else{
                res.status(404).send({
                    "status" : 404,
                    "error" : "Oops cant find this ad, have been sold, or does not belong to you"});
                    return;
            }
        })

    } 
        
        
    }
},
checktodelete : function(req,res,next){

    if(isNaN(req.params.carid)){
        res.status(400).send(badreq());
    return;
    }else{
        let { user } = req.token;
        pool.query("select * from postads where id=$1 and owner=$2 ",[req.params.carid,user.id,],(err,result)=>{
            if(result.rows.length > 0){
                next();
            }else{
                res.status(404).send({
                    "status" : 404,
                    "error" : "Oops cant find this ad, or does not belong to you"});
                    return;
            }
        })
    }
}

}
import  Joi from "joi";
import db from "../config";
import con from "../server";

module.exports = {
    postcarinputs : function(req,res,next){
        const schema ={
            id : Joi.number().min(0).required(),
            email : Joi.string().trim().email().required(),
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
       	res.status(400).send({
       		"status":400,
       	"error":"bad request"});
                   return;
       }

    }else{
        next();
    }
}

}
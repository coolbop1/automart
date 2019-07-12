import  Joi from "joi";


module.exports = {
    postvalidate : function (req,res,next){
	const schema ={
		car_id : Joi.number().min(0).required(),
		amount : Joi.number().min(0).required(),
		order_price : Joi.number().min(0).required(),
		status : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(3)
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
        req.action = "post";
        next();
    } 


    },
    getvalidate: function (req,res,next){
        req.action = "getall";
        next();
    },
    pricepatchcheck: function (req,res,next){
	const schema ={
		order_price : Joi.number().min(0).required()
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
        req.action = "patchprice";
        next();
    } 
    },
    statusvalidate: function (req,res,next){
        req.action = "patchstatus";
        next();
    }
}

import  Joi from "joi";


module.exports = {
    postvalidate : function (req,res,next){
	
	if(typeof req.body.car_id == "undefined"){
	let reply = {
		"status":409,
		"error" : "Error!! please fill all required input fields"
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
       // console.log("this is the body"+Object.keys(req.body))
if(typeof req.body.price == "undefined" ){
	let reply = {
		"status":409,
		"error" : "Error!! please fill required input fields "
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
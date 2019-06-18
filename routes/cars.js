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

let allcars = [];//toremovelater
const express = require("express");
const Joi = require("joi");

const route = express.Router();

var bodyParser = require("body-parser");

route.use(express.json());
route.use(bodyParser.urlencoded({ 
	extended: true }));//middleware

    route.use(bodyParser.text({ type: "application/json" }));




 route.get("/api/v1/allcars",(req, res) =>{res.status(200).send(allcars); });




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
  	 		"id": allcars.length + 1,//toremovelater
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
 	allcars.push(postcarform);//toremovelater
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
                theminprice = parseInt(req.query.max_price);
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
               "data":	"notfound"
           });
           }
        }
	})
    }
}else{
    pool.query("SELECT * FROM postads",(error,result)=>{
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
               "data":	"notfound"
           });
           }
        }
    })


}
})


/*
route.get("/api/v1/car",(req, res) =>{
	

   let alltoquery=[];
   let seniorresult = [];
   let nofit = [];
   let noquerycar =[];

   if(Object.keys(req.query).length > 0){
       let allthequeries = Object.keys(req.query).length;
       let thequery = Object.keys(req.query);
       for(let z=0; z < allthequeries; z++){
           alltoquery.push(thequery[z]);
       }
       //if(nofit.length == 0){var preresult = allcars;	}else {var preresult = seniorresult;}
       //checking each car 
       var preresult = allcars;
       for(let b=0; b < preresult.length; b++){

           for(let p =0; p < allthequeries; p++){
               //status query start	
               if(b == (preresult.length - 1))
                   nofit.push(1);		
               if(alltoquery[p] == "status"){
                   let looktru = preresult[b].status;
                   if(looktru == req.query.status){
                       //let findid = allusers.find(d => d.email == preresult[b].email);
                       let qstatus = {
                           "id" : preresult[b].id,
                           "owner" : preresult[b].owner,
                           "email" : preresult[b].email,
                           "created_on" : preresult[b].created_on,
                           "state" : preresult[b].state,
                           "status" : preresult[b].status,
                           "price" : preresult[b].price,
                           "manufacturer" : preresult[b].manufacturer,
                           "model" : preresult[b].model,
                           "body_type" : preresult[b].body_type,
                           "engine_size" : preresult[b].engine_size,
                           "pics" : preresult[b].pics
                       };
                       var checkin	= seniorresult.find(y => y.id == preresult[b].id);
                       if(!checkin)
                           seniorresult.push(qstatus);

       
                   }else{
                       //seniorresult = [];
                       //return;	
                   }

                   var checkout	= seniorresult.find(l => l.status != req.query.status);
                   if(checkout){
                       var index = seniorresult.indexOf(checkout);
                       seniorresult.splice(index, 1);
                   }
               }else if(alltoquery[p] == "min_price" ){
                   let looktru = parseInt(preresult[b].price);
                   if(looktru >= parseInt(req.query.min_price) && !isNaN(req.query.min_price)){
                       //let findid = allusers.find(d => d.email == preresult[b].email);
                       let qstatus = {
                           "id" : preresult[b].id,
                           "owner" :preresult[b].owner,
                           "email" : preresult[b].email,
                           "created_on" : preresult[b].created_on,
                           "state" : preresult[b].state,
                           "status" : preresult[b].status,
                           "price" : preresult[b].price,
                           "manufacturer" : preresult[b].manufacturer,
                           "model" : preresult[b].model,
                           "body_type" : preresult[b].body_type,
                           "engine_size" : preresult[b].engine_size,
                           "pics" : preresult[b].pics
                       };
                       var checkin	= seniorresult.find(y => y.id == preresult[b].id);
                       if(!checkin)
                           seniorresult.push(qstatus);		
                   }else if(isNaN(req.query.min_price)){
                       seniorresult = [];
                       res.status(400).send("wrong value formart for min_price");

                       return;
                   }else{
                       //seniorresult = [];
                       //return;	
                   }
                   var checkout	= seniorresult.find(l => parseInt(l.price) < parseInt( req.query.min_price));
                   if(checkout){
                       var index = seniorresult.indexOf(checkout);
                       seniorresult.splice(index, 1);
                   }	
               }else if(alltoquery[p] == "max_price"){
                   let looktru = parseInt(preresult[b].price);
                   if(looktru <= parseInt(req.query.max_price) && !isNaN(req.query.max_price)){
                       //let findid = allusers.find(d => d.email == preresult[b].email);
                       let qstatus = {
                           "id" : preresult[b].id,
                           "owner" :preresult[b].owner, 
                           "email" : preresult[b].email,
                           "created_on" : preresult[b].created_on,
                           "state" : preresult[b].state,
                           "status" : preresult[b].status,
                           "price" : preresult[b].price,
                           "manufacturer" : preresult[b].manufacturer,
                           "model" : preresult[b].model,
                           "body_type" : preresult[b].body_type,
                           "engine_size" : preresult[b].engine_size,
                           "pics" : preresult[b].pics
                       };
                       var checkin	= seniorresult.find(y => y.id == preresult[b].id);
                       if(!checkin)
                           seniorresult.push(qstatus);		
                   }else if(isNaN(req.query.max_price)){
                       seniorresult = [];
                       res.status(400).send("wrong value formart for max_price");
                       return;
                   }else{
                       //seniorresult = [];
                       //return;	
                   }
                   var checkout	= seniorresult.find(l => parseInt(l.price) > parseInt(req.query.max_price));
                   if(checkout){
                       var index = seniorresult.indexOf(checkout);
                       seniorresult.splice(index, 1);
                   }
               }else if(alltoquery[p] == "manufacturer"){
                   let looktru = preresult[b].manufacturer;
                   if(looktru == req.query.manufacturer){
                       //let findid = allusers.find(d => d.email == preresult[b].email);
                       let qstatus = {
                           "id" : preresult[b].id,
                           "owner" : preresult[b].owner,
                           "email" : preresult[b].email,
                           "created_on" : preresult[b].created_on,
                           "state" : preresult[b].state,
                           "status" : preresult[b].status,
                           "price" : preresult[b].price,
                           "manufacturer" : preresult[b].manufacturer,
                           "model" : preresult[b].model,
                           "body_type" : preresult[b].body_type,
                           "engine_size" : preresult[b].engine_size,
                           "pics" : preresult[b].pics
                       };
                       var checkin	= seniorresult.find(y => y.id == preresult[b].id);
                       if(!checkin)
                           seniorresult.push(qstatus);		
       
                   }else{
                       //seniorresult = [];
                       //return;	
                   }
                   var checkout	= seniorresult.find(l => l.manufacturer != req.query.manufacturer);
                   if(checkout){
                       var index = seniorresult.indexOf(checkout);
                       seniorresult.splice(index, 1);
                   }
               }else if(alltoquery[p] == "state"){
                   let looktru = preresult[b].state;
                   if(looktru == req.query.state){
                       //let findid = allusers.find(d => d.email == preresult[b].email);
                       let qstatus = {
                           "id" : preresult[b].id,
                           "owner" : preresult[b].owner,
                           "email" : preresult[b].email,
                           "created_on" : preresult[b].created_on,
                           "state" : preresult[b].state,
                           "status" : preresult[b].status,
                           "price" : preresult[b].price,
                           "manufacturer" : preresult[b].manufacturer,
                           "model" : preresult[b].model,
                           "body_type" : preresult[b].body_type,
                           "engine_size" : preresult[b].engine_size,
                           "pics" : preresult[b].pics
                       };
                       var checkin	= seniorresult.find(y => y.id == preresult[b].id);
                       if(!checkin)
                           seniorresult.push(qstatus);		
       
                   }else{
                       //seniorresult = [];
                       //return;	
                   }
                   var checkout	= seniorresult.find(l => l.state != req.query.state);
                   if(checkout){
                       var index = seniorresult.indexOf(checkout);
                       seniorresult.splice(index, 1);
                   }
               }else if(alltoquery[p] == "body_type"){
                   let looktru = preresult[b].body_type;
                   if(looktru == req.query.body_type){
                       //let findid = allusers.find(d => d.email == preresult[b].email);
                       let qstatus = {
                           "id" : preresult[b].id,
                           "owner" : preresult[b].owner,
                           "email" : preresult[b].email,
                           "created_on" : preresult[b].created_on,
                           "state" : preresult[b].state,
                           "status" : preresult[b].status,
                           "price" : preresult[b].price,
                           "manufacturer" : preresult[b].manufacturer,
                           "model" : preresult[b].model,
                           "body_type" : preresult[b].body_type,
                           "engine_size" : preresult[b].engine_size,
                           "pics" : preresult[b].pics
                       };
                       var checkin	= seniorresult.find(y => y.id == preresult[b].id);
                       if(!checkin){
                           seniorresult.push(qstatus);
                       }	
       
                   }else{
                       //seniorresult = [];
                       //return;	
                   }
                   var checkout	= seniorresult.find(l => l.body_type != req.query.body_type);
                   if(checkout){
                       var index = seniorresult.indexOf(checkout);
                       seniorresult.splice(index, 1);
                   }
               }else{
                   res.status(400).send("bad request");
                   return;
               }
           }
       }
       for(let q =0; q < allthequeries; q++){
           if(alltoquery[q] == "status"){
               for(let w =0; w < seniorresult.length; w++){
                   var checkedout	= seniorresult.find(n => n.status != req.query.status );
                   if(checkedout){
                       var index = seniorresult.indexOf(checkedout);
                       seniorresult.splice(index, 1);
                   }
               }
           }
           if(alltoquery[q] == "min_price"){
               for(let w =0; w < seniorresult.length; w++){
                   var checkedout	= seniorresult.find(n => parseInt(n.price) < parseInt(req.query.min_price) );
                   if(checkedout){
                       var index = seniorresult.indexOf(checkedout);
                       seniorresult.splice(index, 1);
                   }
               }
           }
           if(alltoquery[q] == "max_price"){
               for(let w =0; w < seniorresult.length; w++){
                   var checkedout	= seniorresult.find(n => parseInt(n.price) > parseInt(req.query.max_price) );
                   if(checkedout){
                       var index = seniorresult.indexOf(checkedout);
                       seniorresult.splice(index, 1);
                   }
               }
           }
           if(alltoquery[q] == "manufacturer"){
               for(let w =0; w < seniorresult.length; w++){
                   var checkedout	= seniorresult.find(n => n.manufacturer != req.query.manufacturer );
                   if(checkedout){
                       var index = seniorresult.indexOf(checkedout);
                       seniorresult.splice(index, 1);
                   }
               }
           }
           if(alltoquery[q] == "state"){
               for(let w =0; w < seniorresult.length; w++){
                   var checkedout	= seniorresult.find(n => n.state != req.query.state );
                   if(checkedout){
                       var index = seniorresult.indexOf(checkedout);
                       seniorresult.splice(index, 1);
                   }
               }
           }
           if(alltoquery[q] == "body_type"){
               for(let w =0; w < seniorresult.length; w++){
                   var checkedout	= seniorresult.find(n => n.body_type != req.query.body_type );
                   if(checkedout){
                       var index = seniorresult.indexOf(checkedout);  seniorresult.splice(index, 1);
                   }
               }
           }
       }	
       if(seniorresult.length > 0){	
           res.status(200).json({
               "status":200,
               "data":	seniorresult
           });
       }else{
           res.status(404).json({
               "status":404,
               "msg":"no result for this request"
           });
       }
   }else{
       for(let v =0; v < allcars.length; v++){
           //let findid = allusers.find(d => d.email == allcars[v].email);
           let allnoqcar = {
               "id" : allcars[v].id,
               "owner" : allcars[v].owner,
               "email" : allcars[v].email,
               "created_on" : allcars[v].created_on,
               "state" : allcars[v].state,
               "status" : allcars[v].status,
               "price" : allcars[v].price,
               "manufacturer" : allcars[v].manufacturer,
               "model" : allcars[v].model,
               "body_type" : allcars[v].body_type,
               "engine_size" : allcars[v].engine_size,
               "pics" : allcars[v].pics
               
           };
           noquerycar.push(allnoqcar);
       }
       if(noquerycar.length > 0){	
           res.status(200).json({
               "status":200,
               "data":	noquerycar
           });
       }else{
           res.status(404).json({
               "status":404,
               "msg":"no car ad to display"
           });
       }

       //res.status(400).json({
       //	"status":400,
       //	"error":"no request"
       //});
   }
});
//handles view single car
route.get("/api/v1/car/:carid", (req, res) => {
    const confirmcar = allcars.find(u => u.id == req.params.carid);
    if(confirmcar){
        
        res.status(200).json({ "status" : 200, "data" : {"id" : confirmcar.id,	"owner" : confirmcar.owner,"created_on" : confirmcar.created_on,"state" : confirmcar.state,"status" : confirmcar.status,"price" : confirmcar.price,"manufacturer" : confirmcar.manufacturer,"model" : confirmcar.model,"body_type" : confirmcar.body_type,"pics" : confirmcar.pics}});

        
    } else {res.status(404).send({"error" : "The car was not found"	});

    }
});
*/


//handles view single car
route.get("/api/v1/car/:carid", (req, res) => {
    const confirmcar = allcars.find(u => u.id == req.params.carid);
    if(confirmcar){
        
        res.status(200).json({ "status" : 200, "data" : {"id" : confirmcar.id,	"owner" : confirmcar.owner,"created_on" : confirmcar.created_on,"state" : confirmcar.state,"status" : confirmcar.status,"price" : confirmcar.price,"manufacturer" : confirmcar.manufacturer,"model" : confirmcar.model,"body_type" : confirmcar.body_type,"pics" : confirmcar.pics}});

        
    } else {res.status(404).send({"error" : "The car was not found"	});

    }
});
///////////////////////////









///////////mark carf as sold///////////////////
route.patch("/api/v1/car/:carid/status", (req, res) => {
	
	const checkforcar = allcars.find(u => u.id == req.params.carid && u.status == "available");
	if(checkforcar){
		checkforcar.status = "sold";
		
		res.status(200).json({
			"status" : 200,
			"data" : {
				"id" : checkforcar.id,
				"email" : req.body.email,
				"created_on" :new Date(),
				"manufacturer" : checkforcar.manufacturer,
				"model" : checkforcar.model,
				"price" : checkforcar.price,
				"state" : checkforcar.state,
				"status" : checkforcar.status
			},
			"message" : "The ad have been marked as sold."
		});
	} else {
		res.status(404).send({
			"status" : 404,
			"error" : "404 not found","message" : "Oops cant find this ad"});
	}
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
	const checkforcar = allcars.find(u => u.id == req.params.carid && u.status == "available");
	if(checkforcar){
		checkforcar.price = req.body.price;
		//console.log("marked");
		
		res.status(200).json({
			"status" : 200,
			"data" : {
				"id" : checkforcar.id,
				"email" : req.body.email,
				"created_on" :new Date(),
				"manufacturer" : checkforcar.manufacturer,
				"model" : checkforcar.model,
				"price" : checkforcar.price,
				"state" : checkforcar.state,
				"status" : checkforcar.status
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
});
/////////////////////////


module.exports = route;
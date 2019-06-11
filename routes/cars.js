let allcars = [];
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
		email : Joi.string().trim().required(1),
		owner : Joi.string().trim().min(1),
		manufacturer : Joi.string().trim().min(1),
		model : Joi.string().trim().min(2),
		price : Joi.string().trim().min(1),
		state : Joi.string().trim().min(1),
		engine_size : Joi.string().trim().min(1),
		body_type : Joi.string().trim().min(2),
		pics : Joi.string().trim().min(2),
		
	}
	const valid = Joi.validate(req.body,schema);
	if(valid.error){
	let reply = {
		"msg" : valid.error.details[0].message
	}	
	res.status(409).send(reply);
		return;
	} 
  	 	let postcarform = {
 		"id" : allcars.length + 1,
		 "email" : req.body.pcposter,
		 "owner" : req.body.owner,
 		"created_on" : new Date(),
 		"manufacturer" : req.body.manufacturer,
 		"model" : req.body.model,
 		"price" : req.body.price,
 		"state" : req.body.state,
 		"engine_size" : req.body.engine_size,
 		"body_type" : req.body.body_type,
		 "pics" : req.body.pcpics,
		 "status" : "available"
 	};
 	allcars.push(postcarform);
 	//console.log(postcarform)
  	res.status(201).json({"status":201,"data":{"id" : allcars.length + 1,"email" : req.body.pcposter,"created_on" : new Date(),"manufacturer" : req.body.pcman,"model" : req.body.pcmodel,"price" : req.body.pprice,"state" : req.body.state,"engine_size" : req.body.pces,"body_type" : req.body.pccolor,"pics" : req.body.pcpics,"status" : "available"},"message" : "Car posted successfully"});
});
/////////////////////////


////delete car ad/////////
route.delete("/api/v1/car/:carid",(req, res) =>{
    let todelete = req.params.carid;
    const checktodelete = allcars.find(del => del.id == todelete);
    if(checktodelete){
       var index = allcars.indexOf(checktodelete);
       allcars.splice(index, 1);
       res.status(200).json({
           "status" : 200,
           "data" : "Car Ad successfully deleted"
       });
    }else{
       res.status(404).json({
           "status" : 400,
           "error" : "Car Ad not found"
       });
    }
});
///////////////////car search query//////////////////

route.get("/api/v1/car",(req, res) =>{/* istanbul ignore next */
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
		email : Joi.string().trim().min(1),
		price : Joi.string().trim().min(1),
		
		
		
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
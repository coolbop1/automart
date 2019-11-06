import db from "../config";
import bcrypt from "bcryptjs";
import error from "../helpers/errors";

const { operationError } = error;
const pool = db.getPool(process.env['USER'],process.env['DATABASE'],process.env['HOST'],process.env['PASS'],Boolean(parseInt(process.env['SSL'])));

module.exports = {
	validateuserinputs: function (req,res,next){
		let reqBody = Object.keys(req.body);
		let errorMessage =[]
		for(let bt = 0; bt < reqBody.length && errorMessage.length < 1; bt++){
			let inputFields = reqBody[bt];
			if(inputFields != "password"){
			if(typeof req.body[reqBody[bt]] === "undefined" || req.body[reqBody[bt]].trim() == "")
				errorMessage.push(reqBody[bt].replace("_"," ")+" is required");
			}else{
				if(typeof req.body[reqBody[bt]] === "undefined" || req.body[reqBody[bt]] == "")
				errorMessage.push(reqBody[bt].replace("_"," ")+" is required");
			}
		}		
		if(errorMessage.length > 0){
			let reply = {"status":409,"error" : errorMessage[0]};res.status(409).send(reply);return;
		}else{			
			for(let te = 0; te < reqBody.length; te++){
				let inputFields = reqBody[te];
				if(inputFields != "password")
				req[inputFields] = req.body[inputFields].trim().toLowerCase();
				else
				req[inputFields] = req.body[inputFields];
			}
			next();
		}},
	verifynewemail: function (req,res,next){
		pool.query("select * from allusers where email = $1 ",[req.email],(err,ress)=>{
		if(ress.rows.length >= 1 && req.email){
			let reply = {
				"status":409,
				"error" : "email is taken please try another"
			};			
			res.status(409).json(reply);
			return;			
		}else{
			next();
		}

		});
		
	},
	validateloginputs : function (req,res,next){
			pool.query("select * from allusers where email = $1",[req.email],(err,ress)=>{
				if(ress.rows.length > 0){
					let passwordIsValid = bcrypt.compareSync(req.password, ress.rows[0].password); 
					if (!passwordIsValid){
					   let reply = {
						   "status":401,
						   "error" : "Invalid password, please check and try again"
					   };
					  res.status(401).send(reply);
					  return;
					}else{
						next();
					}
						   
				}else {
				   let reply = {
					   "status":404,
					   "error" : "Invalid username or password please try again"
				   };
				  res.status(404).send(reply);
				  return;
			   }
	   
			});
		

	},
	verifyaction : function (req,res,next){
		if(typeof req.body.current_password == "undefined" && typeof req.body.new_password == "undefined"){
		pool.query("select * from allusers where email=$1",[req.params.email],(err,ress)=>{
		if(ress.rows.length > 0){
		next();
			}
		else{
			let reply = {
				"status":404,
				"error" : "email not found please try another"
			};
			res.status(404).json(reply);
			return;
		}
			})
		


	
		}else{
				pool.query("select * from allusers where email=$1",[req.params.email],(err,ress)=>{
					if(ress.rows.length > 0){
						let passwordIsValid = bcrypt.compareSync(req.body.current_password, ress.rows[0].password); 
					 if (passwordIsValid){
						next();
						}
						else{
							let reply = {
								"status":400,
								"error" : "invalid password please check and try again"
							};
						res.status(400).json(reply);
						}
					}
					else
					res.status(400).json(operationError());
				})

		}

	}
}
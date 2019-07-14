import  Joi from "joi";
import db from "../config";
import bcrypt from "bcryptjs";
import error from "../helpers/errors";

const { operationError } = error;
const pool = db.getPool(process.env['USER'],process.env['DATABASE'],process.env['HOST'],process.env['PASS'],Boolean(parseInt(process.env['SSL'])));

module.exports = {
	validateuserinputs: function (req,res,next){	
		const schema = {
			first_name : Joi.required(),
			last_name : Joi.required(),
			email : Joi.required(),
			address : Joi.required(),
			password : Joi.required()
		};
					
		const valid = Joi.validate(req.body,schema);
		if(valid.error){
			let msgclean = valid.error.details[0].message.replace("/^[,. a-z0-9A-Z]+$/","");
			let reply = {
				"status":409,
				"error" : msgclean
			};	
			res.status(409).send(reply);
			return;
		}else{
			next();
		}
	},
	verifynewemail: function (req,res,next){
		pool.query("select * from allusers where email = $1 ",[req.body.email],(err,ress)=>{
		if(ress.rows.length >= 1 && req.body.email){
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
		const schema ={
			email : Joi.string().trim().email().required(),
			password : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(6)
			
		};
		const valid = Joi.validate(req.body,schema);
		if(valid.error){
			let reply = {
				"status":409,
				"error" : valid.error.details[0].message
			};	
			res.status(409).send(reply);
			return;
		}else{
			pool.query("select * from allusers where email = $1",[req.body.email],(err,ress)=>{
				if(ress.rows.length > 0){
					let passwordIsValid = bcrypt.compareSync(req.body.password, ress.rows[0].password); 
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

		}
		

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
			const schema ={
				current_password : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(6),
				new_password : Joi.string().regex(/^[,. a-z0-9A-Z]+$/).trim().min(6),
				
			};
			const valid = Joi.validate(req.body,schema);
			if(valid.error){
				let reply = {
					"status":409,
					"error" : valid.error.details[0].message
				};	
				res.status(409).send(reply);
				return;
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
}
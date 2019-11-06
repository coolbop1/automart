import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createuser,allusers,sendingMail,updatepass,login } from "../services/users";

module.exports = {
	signup : function (req, res) { 
	let isadmin;
			
		var hashedPassword = bcrypt.hashSync(req.body.password, 8);
		if(typeof req.body.is_admin !== "undefined")
		isadmin = req.body.is_admin;
		else
		isadmin = "false";
		
		let postit ={
				
			"email" : req.body.email,
			"first_name" : req.body.first_name,
			"last_name" : req.body.last_name,
			"password" : hashedPassword,
			"address" : req.body.address,
			"is_admin" : isadmin
		};
		let inputArr = [req.body.email,req.body.first_name,req.body.last_name,hashedPassword,req.body.address,postit.is_admin];
		let comfirm
		async function createToken() {
		try {
		 comfirm = await createuser(inputArr);
		
		
			//console.log(comfirm)
		let token = jwt.sign({user : comfirm}, "ourlittlesecret", { expiresIn: "24h" });//expires in 24 hours }
		res.status(201).json({
				"status" : 201,
				"data" :{
					"token" : token,
					"first_name" : req.body.first_name,
					"last_name" : req.body.last_name,
					"email" : req.body.email
				},
				"message":"Welcome!! "+req.body.first_name+" registration successful. <br/>Preparing dashboard in 2 sec..." 
			});
		}catch (err) {
			res.status(400).send({
		  "status":400,
		  "error":"An error occured couldnt send password to your email."})
		  }
		}
		createToken();

			return;
},
users : function (req, res) {
	async function getAlluser(){
		try{
	let got = await allusers();
	res.status(200).send(got)
		}catch (err) {
			res.status(400).send({
		  "status":400,
		  "error":"An error occured couldnt send password to your email."})
		  }
	}
	getAlluser();
},
sendPassword: function (req, res){  
	let thenewp;
	let hashedPassword;

		function makeid(length) { var result = ''; var characters = 'abcdefghijklmnopqrstuvwxyz'; var charactersLength = characters.length; for ( var i = 0; i < length; i++ ) { result += characters.charAt(Math.floor(Math.random() * charactersLength)); } return result; } 
		if(typeof req.body.current_password == "undefined" && typeof req.body.new_password == "undefined"){
			thenewp = makeid(6);
		hashedPassword = bcrypt.hashSync(thenewp, 8);
		sendmail()
		}else{
			hashedPassword = bcrypt.hashSync(req.body.new_password, 8);
			changepass()
		}
		async function changepass(){
			try{
				let successfully = await updatepass(req.params.email,hashedPassword);
				res.status(200).send({
					"status":200,
					"message":successfully
					});

			}catch (err) {
				res.status(400).send({
		  "status":400,
		  "error":"An error occured couldnt send password to your email."})
			}
		}
	async function sendmail(){
			try{
		let mailOptions = {
			  from: 'AUTOMART',
			  to: req.params.email,
			  subject: 'Password Request',
			 html: '<h3>AutoMart Password Retrieval</h3><p>New password : '+thenewp+'</p>'

			};
			let successfull = await sendingMail(mailOptions,req.params.email,hashedPassword);
			res.status(200).send({
				"status":200,
				"message":"A password have been sent to your email : "+successfull.userEmail
			})
				
			}catch (err) {
				  res.status(400).send({
            "status":400,
            "error":"An error occured couldnt send password to your email.please try again"})
			  }
		}
		

	
},
		signin: function (req, res){
			async function logining(){
				try{
					
					let successfull = await login(req.body.email);
					let token = jwt.sign({user : successfull}, "ourlittlesecret", { expiresIn: "24h" });//expires in 24 hours }
					
					res.status(200).json({ 
						"status" : 200,
						"data" : {
							"token" : token,
							"id": successfull.id, // user id
							"first_name": successfull.name,
							"last_name": successfull.lname,
							"email": successfull.email
						},
						"message": "Welcome back "+successfull.name+"<br/> Logged in successful!"
					});


				}catch (err) {
					res.status(400).send({
			  "status":400,
			  "error":""+err})
				}

			}
			logining();

		}




}
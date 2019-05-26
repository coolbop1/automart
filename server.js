let allusers = [];
console.log('starting server');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

app.use(express.json());


app.use(bodyParser.text({ type: "application/json" }));
const Joi = require('joi')
app.listen(port,(req, res) => {
	console.log(`::listening on ${port}::`)
});
 app.use(express.static("docs"));
 app.get("/all",(req, res) =>{
 	res.send(allusers);
 });
//handles sign up
 app.post("/auth/signup", (req, res) => { 

/*const schema = {

	 ​email :​ ​Joi.string​().required(), ​
	 first_name ​:​Joi.string​().required(),
	  ​last_name ​:​Joi.string​().required(), 
	  password ​:​ ​Joi.string​().required(),
	   address ​:​ ​Joi.string​().required()
	    //“is_admin” ​:​ ​Boolean​, 

};
const result = Joi.validate(req.body, schema);
if(result.error){
	res.status(400).send(result.error.details[0].message);
	return;
}
*/
 	let postit ={

 		"id" : allusers.length + 1,
 		"email" : req.body.email,
 		"first_name" : req.body.first_name,
 		"last_name" : req.body.last_name,
 		"password" : req.body.password,
 		"address" : req.body.address,
 		

 	}
 	const emailvali = allusers.find(u => u.email === req.body.email);
 	if(emailvali){
 		let reply = {
 		"email" : emailvali.email

 	}
 	res.status(404).send(reply)
return;
 }
 	allusers.push(postit)
 	res.status(200).send(postit);
 });
let allusers = [];
console.log('starting server');
const express = require('express');

const app = express();
//const Joi = require('joi')
const port = process.env.PORT || 3000;

app.use(express.json());
app.listen(port,(req, res) => {
	console.log(`::listening on ${port}::`)
});
 app.use(express.static("docs"));
 app.get("/all",(req, res) =>{
 	res.send(allusers);
 });
//handles sign up 
 app.get("/signup/:username/:password",(req, res) =>{
 	let postit ={
 		"regid" : allusers.length + 1,
 		"username" : req.params.username,
 		"password" : req.params.password
 	}
 	allusers.push(postit)
 	res.status(200).send('Registration is succesful');
 });
 
 //handles login
 app.get("/login/:user/:pass", (req, res) => {
 	const confirm = allusers.find((u => u.username == req.params.user) && (p => p.password == req.params.pass));
 	
 	if(confirm){
 		res.status(200).send("login sucesful")
 	} else {
 			res.status(404).send("cant login")
 	}
 })
 
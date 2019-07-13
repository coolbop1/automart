import express from "express";

	const port = process.env.PORT || 3000;
	let conusername;
	let condatabase;
	let conhost;
	let conpassword;
	let conssl;
	let thegmail;
	let app;
	
setenvparam(0);
	function changeenv(){
		process.env['NODE_ENV'] = 'test';
	setenvparam(1);
	}
	function changeenvpro(){
		process.env['NODE_ENV'] = 'production';
	setenvparam(1);
	}
	function changeenvoff(){
		process.env['NODE_ENV'] = 'offline';
	setenvparam(1);
	}
	function changeenverr(){
		process.env['NODE_ENV'] = 'errors';
		setenvparam(1)
	}
	

function setenvparam(arrg){
		if (process.env.NODE_ENV && process.env.NODE_ENV === "test" ) {conusername="tovlhixtdmbgcz";condatabase="dfvspqpvd9vmc6";conhost='ec2-23-21-91-183.compute-1.amazonaws.com';conpassword='f48766c6c29f9b25108448b51c39d55084235c27d9352129da35c9cddbb78823';conssl=true;thegmail="automartcontacts@gmail.com"}
		else if(process.env.NODE_ENV === "offline"){conusername="andela";condatabase="andela";conhost="localhost";conpassword="";conssl=false;thegmail="automartmail@gmail.com";}
		else if(process.env.NODE_ENV === "errors"){conusername=conusername;condatabase=condatabase;conhost=conhost;conpassword=conpassword;conssl=conssl;thegmail="testgmail@gmail.com";}
		else{
		conusername ="gkhfnrideiyyoi";condatabase= "ddelc2mc1p0din";conhost="ec2-23-21-91-183.compute-1.amazonaws.com";conpassword="75f800626b4be7b6fe829d59277b3a5aca40c09ac1538bf69cbde20997d957ba";conssl=true;thegmail="automartcontacts@gmail.com";
		}
		if(arrg == 0)
		 setapp();
		 else
		 exportd();
}
	

function setapp(){
	app = express();
	app.get("/api/v1/uenv", (req, res) => {changeenv(); res.status(200).send("ok");})
	app.get("/api/v1/uuenv", (req, res) => {changeenvpro();	res.status(200).send("ok");})
	app.get("/api/v1/ouuenv", (req, res) => {changeenvoff(); res.status(200).send("ok");})
	app.get("/api/v1/testerr", (req, res) => {changeenverr(); res.status(200).send({"this":"error"});})
	app.use(express.json());
	app.use(express.static("./src/home"));
	app.use("/documentation", express.static("./src/documentation"));
	app.use("/UI", express.static("./docs"));
	app.listen(port,(req, res) => {});
	exportd();
}
const { users } = require("./routes/users");
app.use("/", users);
const cars = require("./routes/cars");
app.use("/", cars);
const orders = require("./routes/orders");
app.use("/", orders);
const flags = require("./routes/flags");
app.use("/", flags);
 
 function exportd(){
	console.log(thegmail);
module.exports = {
		app:app,
	 	configuser: conusername,
		confighost: conhost,
		configdatabase: condatabase,
		configpassword: conpassword,
		configport: "5432",
		configssl: conssl,
		thegmail:thegmail
	
	};
	}
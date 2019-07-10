import { Pool } from "pg";
import nodemailer from "nodemailer";



	 
	module.exports = {
	 	getPool: function (conusername,condatabase,conhost,conpassword,conssl){
	 		//if(pool) return pool;
	 		const pool = new Pool({
				user: conusername,
				host: conhost,
				database: condatabase,
				password: conpassword,
				port: "5432",
				ssl: conssl
			});
			return pool;
		},
		setTransporter : function (thegmail) {
			const transporter = nodemailer.createTransport({
				  service: 'gmail',
				  auth: {
				    user: thegmail,
				    pass: 'new password'
				  }
			});
			return transporter;
		}
	 	
	}
	 

	
import jwt from "jsonwebtoken";
import error from "../helpers/errors";
let { authError } = error;

module.exports = {
	ensure: function (req, res, next) { 
		const bearerHeader = req.headers["authorization"];
		if (typeof bearerHeader !== "undefined") {  
		const berarer = bearerHeader.split(" "); 
		const bearerToken = berarer[1]; 
		req.token = bearerToken;
		next();} else {  res.status(403).json(authError()); }
	},
	ensureToken: function (req, res, next) { 
		const bearerHeader = req.headers["authorization"];
		if (typeof bearerHeader !== "undefined") {  
		const berarer = bearerHeader.split(" "); 
		const bearerToken = berarer[1]; 
		req.token = bearerToken;
		jwt.verify(req.token, "ourlittlesecret", function(err, data) {
			if (err) {
				res.status(403).json(authError());

		}else{
			req.token=data;
			next();
		}; });
		} else {  res.status(403).json(authError()); }
	},
}











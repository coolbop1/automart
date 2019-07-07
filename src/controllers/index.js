import jwt from "jsonwebtoken";

module.exports = {
	 	ensure: function (req, res, next) { 
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {  
		const berarer = bearerHeader.split(" "); 
		const bearerToken = berarer[1]; 
		req.token = bearerToken;
		next();} else {  res.status(403).json({
		"status":403,
		"error":"Opps!! you are not authorized to perform this operation,please login to get authorized token"}); }

},
	 	ensureToken: function (req, res, next) { 
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {  
		const berarer = bearerHeader.split(" "); 
		const bearerToken = berarer[1]; 
		req.token = bearerToken;
		jwt.verify(req.token, "ourlittlesecret", function(err, data) {
			 if (err) {res.status(403).json({
				status:403,
			"error":"Opps!! you are not authorized to perform this operation,please login to get authorized token"}); 
	
	 	}else{
			req.token=data;
			next();
		}; });
		} else {  res.status(403).json({
			status:403,
		"error":"Opps!! you are not authorized to perform this operation,please login to get authorized token"}); }

}
	 	}
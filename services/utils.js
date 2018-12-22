const jwt = require("jwt-simple");
const config = require("../config");

module.exports.getUserIdFromRequest = (request) => {
	const tokenHeader = request.get("Authorization");
	const decodedToken = jwt.decode(tokenHeader, config.secret);
	const userId = decodedToken.sub;
  
	return userId;
};
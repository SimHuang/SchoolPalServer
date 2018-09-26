var jwt = require("jwt-simple");
var User = require("../models/user");
const config = require("../config");

/**
 * GET - API endpoint to retrieve user profile
 */
module.exports.getUserProfile = function(req, res) {
	var tokenHeader = req.get("Authorization");
	var decodedToken = jwt.decode(tokenHeader, config.secret);
	var userId = decodedToken.sub;

	User.findById(userId, function(err, user) {
		if(err) {
			return err;
		}

		var userBio = user.bio === undefined ? "none" : user.bio;

		var userProfile = {
			name: user.name,
			email: user.email,
			bio: userBio
		};

		res.send(userProfile);
	});
};
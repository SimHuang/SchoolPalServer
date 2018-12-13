const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

/**
 * GET - API endpoint to retrieve user profile
 */
module.exports.getUserProfile = (req, res) => {
	const tokenHeader = req.get("Authorization");
	const decodedToken = jwt.decode(tokenHeader, config.secret);
	const userId = decodedToken.sub;

	User.findById(userId, function(err, user) {
		if(err) {
			return err;
		}

		var userBio = user.bio === undefined ? "none" : user.bio;

		var userProfile = {
			name: user.name,
			email: user.email,
			bio: userBio,
			upvotes: user.upvotes
		};

		res.send(userProfile);
	});
};

/**
 * PUT - API endpoint to update user profile
 */
module.exports.updateUserProfile = (req, res) => {
	const tokenHeader = req.get("Authorization");
	const decodedToken = jwt.decode(tokenHeader, config.secret);
	const userId = decodedToken.sub;
	const body = req.body;
	const {name, bio, username, email} = body;

	if(name === undefined) {
		res.status(400).send({"Error":"name field required."});
	}

	if(bio === undefined) {
		res.status(400).send({"Error":"bio field required."});
	}

	if(username === undefined) {
		res.status(400).send({"Error": "username field required."});
	}

	if(email === undefined) {
		res.status(400).send({"Error":"email field required."});
	}

	User.update(
		{_id: userId},
		{
			name,
			bio,
			email
		},
		(err, object) => {
			if(err) {
				res.send(err);
			}

			res.send(object);
		}
	);
};

/**
 * GET - Api request to get all upvoted post ids that a user upvoted
 */
module.exports.getUserUpvotes = (req, res) => {
	const tokenHeader = req.get("Authorization");
	const decodedToken = jwt.decode(tokenHeader, config.secret);
	const userId = decodedToken.sub;

	User.findById(userId, (err, user) => {
		if(err) {
			res.send(err);
		}

		const upvotes = user.upvotes;
		res.send(upvotes);
	});
};
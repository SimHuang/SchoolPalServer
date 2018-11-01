const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

/**
 * upvote a post base on post id
 */
module.exports.upvotePost = function(req, res, next) {
	const postId = req.params.id;
	const tokenHeader = req.get("Authorization");
	const decodedToken = jwt.decode(tokenHeader, config.secret);
	const userId = decodedToken.sub;

	let didUpvote = false;

	//search user schema to see if this user upvoted the post already
	User.findById(userId, function(err, user){
		if(err) { return err; }
		const upvotes = user.upvotes;
		upvotes.forEach(function(value) {
			if(value.id === postId) {
				didUpvote = true;
			} 
		});
	});

	if(didUpvote) {
		res.send({ voteCount: -1});
	}

	//did not upvote yet so upvote now
	Post.findOneAndUpdate({_id: postId}, {
		$inc: { "meta.votes": 1 }
	}, function(err, record) {
		if(err) {
			return next(err);
		}
		var voteCount = record.meta.votes;

		//update the user schema
		User.update({ _id: userId },
			{
				$push: {
					upvotes: {
						"id": postId
					}
				}
			}, function(err) {
				if(err) {return err;}
				res.send({ voteCount: voteCount});
			});
	});
};

/**
 * get all upvote count base on post id
 */
module.exports.getPostUpvoteCount = function(req, res, next) {
	const postId = req.params.id;
	Post.findOne({_id: postId}, (err, record)=> {
		if(err) {
			return next(err);
		}
		res.send({"upvotes": record.meta.votes});
	});
};

/**
 * get all answer count base on post id
 */
module.exports.getPostAnswerCount = function(req, res, next) {
	const postId = req.params.id;
	Post.findOne({_id: postId}, (err, record)=> {
		if(err) {
			return next(err);
		}
		res.send({"answers": record.meta.answers});
	});
};

/**
 * increase post answer count
 * id: post id as part of request
 */
module.exports.increasePostAnswerCount = function(req, res, next) {
	var postId = req.params.id;

	Post.findOneAndUpdate({_id: postId}, {
		$inc: { "meta.answers": 1}

	}, function(err, record) {
		if(err) {
			return next(err);
		}
		let answerCount = record.meta.answers;
		res.send({answerCount: answerCount + 1});
	});
};

/**
 * bookmark a post base on post id and username
 */
// module.exports.bookmarkPost = function(req, res, next) {

// };

/**
 * get all bookmarks base on user id
 */
// module.exports.getBookmarksForUser = function(req, res, next) {

// };
var Post = require('../models/post');

/**
 * upvote a post base on post id
 */
module.exports.upvotePost = function(req, res, next) {
    var postId = req.params.id;

    Post.findOneAndUpdate({_id: postId}, {
        $inc: { "meta.votes": 1 }

    }, function(err, record) {
        if(err) {
            return next(err);
        }
        var voteCount = record.meta.votes;

        res.send({
            voteCount: voteCount
        });
    });
}

/**
 * get all upvote count base on post id
 */
module.exports.getPostUpvoteCount = function(req, res, next) {
    //TODO
}

/**
 * get all answer count base on post
 */
module.exports.getPostAnswerCount = function(req, res, next) {
    //TODO
}

/**
 * increase post answer count
 */
module.exports.increasePostAnswerCount = function(req, res, next) {

}

/**
 * bookmark a post base on post id and username
 */
module.exports.bookmarkPost = function(req, res, next) {

}

/**
 * get all bookmarks base on user id
 */
module.exports.getBookmarksForUser = function(req, res, next) {

}
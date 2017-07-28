var Post = require('../models/post');

/**
 * Route api to create a new post
 */
module.exports.newPost = function(req, res, next) {
    const question = req.body.question;
    const tags = req.body.tags;
    const post = req.body.post;
    const author = req.body.author;

    if(!question || !post || !author) {
        return res.status(422).send({
            error: "Missing Fields."
        })
    }

    const newPost = new Post({
        question: question,
        tags: tags,
        post: post,
        author: author
    });

    newPost.save(function(err) {
        if(err) {
            return next(err);
        }

        //TODO:retrieve post again and return to user
        res.send({success:"new post created"});
    });
}

/**
 * Route api to get a post base on post id
 */
module.exports.getPost = function(req, res, next) {
    var postId = req.params.id;
    res.send({ok: "you are authenticated to get a post"});
}

/**
 * Route api to retrieve all post. Pagination included based on body
 * provided from front end
 */
module.exports.getAllPost = function(req, res, next) {
    res.send({ok: "anyone can retrieve post"});
}
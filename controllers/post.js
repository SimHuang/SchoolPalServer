var Post = require('../models/post');

/**
 * Route api to create a new post
 */
module.exports.newPost = function(req, res, next) {
    const question = req.body.question;
    const tags = req.body.tags;
    const post = req.body.post;
    const author = req.body.author;
    console.log(req.body);

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
        const justSavedPost = Post.findOne({_id:newPost._id}, function(err, post) {
            if(err) {return next(err);}
            res.send(post);
        });
    });
}

/**
 * Route api to get a post base on post id
 */
module.exports.getPost = function(req, res, next) {
    var postId = req.params.id;

    Post.findById(postId, function(err, post) {
        if(err) {
            return next(err);
        }
        res.send(post);
    });
}

/**
 * Route api to retrieve all post. Pagination included based on body
 * provided from front end
 */
module.exports.getAllPosts = function(req, res, next) {
    var school = null;
    var offset = 0;
    var limit = 0;
    if(req.body.school) {
        school = req.body.school;
    }

    if(req.body.limit) {
        offset = req.body.offset;
    }

    if(req.body.limit) {
        limit = req.body.limit;
    }

    Post.find()
    .limit(limit)
    .exec({}, function(err, posts) {
        if(err) {
            return next(err);
        }

        res.send(posts);
    });
}
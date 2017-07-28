/**
 * Route api to create a new post
 */
module.exports.newPost = function(req, res, next) {
    console.log('hit this api');
    res.send({ok:"ok"});
}

/**
 * Route api to get a post
 */
module.exports.getPost = function(req, res, next) {

}

/**
 * Route api to retrieve all post. Pagination included based on body
 * provided from front end
 */
module.exports.getAllPost = function(req, res, next) {

}
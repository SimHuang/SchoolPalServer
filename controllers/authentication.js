const passport = require('passport');
const jwt = require('jwt-simple');
const User = require('../models/user');
const secret = require('../config');

function createTokenForUser(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({sub:user.id, iat: timeStamp}, secret.secret);
}

/**
 * login route
 */
module.exports.signin = function(req, res, next) {
    res.send({token: createTokenForUser(req.user)});
}

/**
 * signup route
 */
module.exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    //if email or password is not specified
    if(!email || !password) {
        return res.status(422).send({error: 'Missing Email or Password!'});
    }

    //check if username exists
    User.findOne({ email: email }, function(err, existingUser) {
        if(err) { return next(err); }

        if(existingUser) {
            return res.status(422).send({error: 'Email is already used'});
        }
        console.log(email + password + '213lsdkf');
        //if user with email does not exist, create and save user record
        const user = new User({
            email: email,
            password: password,
            name: name
        });

        console.log('it came here');
        //save to DB and return authentication token
        user.save(function(err){
            if(err) { return next(err); }

            //return authentication token for success
            res.json({token:createTokenForUser(user)});
        });
    });
}

/**
 * signout route
 */
module.exports.signout = function(req, res) {

}
const passport = require('passport');
const User = require('../models/user');
const LocalStrategy  = require('passport-local');

/**
 * The local passport strategy used to verify login.
 * This is called before returning the user a authentication token.
 */
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'

}, function(email, password, done ){
    User.findOne({ email: email }, function(err,user) {
        if(err) { return done(err); }
        if(!user) { return done(false); }

        //compare password - is 'password' equal to user.password
        user.checkPassword(password, function(err, isMatch) {
            if(err) { return done(err); }
            if(!isMatch) { return done(null, false); }

            return done(null,user);
        });
    });
})); 

const passport = require("passport");
const User = require("../models/user");
const LocalStrategy  = require("passport-local");
const config = require("../config.js");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

/**
 * The local passport strategy used to verify login.
 * This is called before returning the user a authentication token.
 */
passport.use(new LocalStrategy({
	usernameField: "email",
	passwordField: "password"

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

//set up JWT Strategy to extract token
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	secretOrKey: config.secret
};

/**
 * The JWT strategy used to authorize all secure rest api end points. 
 * This will take the auth token from the header and verify the token before
 * allowing user to access secure apis.
 */
passport.use(new JWTStrategy(jwtOptions, function(payload, done) {
	User.findById(payload.sub, function(err,user){
		if(err) { return err(err, false); }

		if(user) {
			return done(null, user);

		}else {
			done(null, false);
		}
	});
}));

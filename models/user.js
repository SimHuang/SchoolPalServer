const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true},
	password: { type: String, required: true },
	name: String,
	bio: String
});

//hash password before saving to database 
userSchema.pre("save", function(next) {
	const user = this;

	bcrypt.genSalt(SALT_FACTOR, function(err, salt){
		if(err){    return next(err);   }

		bcrypt.hash(user.password, salt, null, function(err,hash) {
			if(err) {   return next(err);   }
			user.password = hash;
			next();
		});
	});
});

//check password method 
userSchema.methods.checkPassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		// if(err) {   return done(err);   }

		//execute call back if password matched
		callback(null, isMatch);
	});
};

const user = mongoose.model("user", userSchema);

module.exports = user;
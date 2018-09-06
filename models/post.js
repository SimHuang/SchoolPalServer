const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
	question: { type: String, required: true},
	tags: { type: Array },
	post: { type: String},
	date: { type: Date, default: Date.now },
	author: { type: String },
	answers: [
		{
			user: String,
			answer: String, 
			date: { type: Date, default: Date.now }
		}
	],
	meta: {
		views: { type: Number, default: 0 },
		answers: { type: Number, default: 0 },
		votes: { type: Number, default: 0 }
	}
});

const post = mongoose.model("post", postSchema);

module.exports = post;
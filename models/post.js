const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    question: { type: String, required: true},
    tags: { type: Array },
    post: { type: String},
    date: { type: Date, default: Date.now },
    author: { type: String },
    answers: [{answer: String, date: Date}],
    meta: {
        views: Number,
        answers: Number,
        votes: Number
    }
});

const post = mongoose.model('post', postSchema);

module.exports = post;
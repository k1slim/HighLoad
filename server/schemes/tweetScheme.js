const mongoose = require('mongoose');

const Tweet = mongoose.Schema({
    twid: String,
    active: Boolean,
    author: String,
    avatar: String,
    body: String,
    date: Date
});


module.exports = mongoose.model('Tweet', Tweet);
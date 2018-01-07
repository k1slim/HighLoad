const mongoose = require('mongoose');

const Tweet = mongoose.Schema({
    twid: String,
    active: Boolean,
    author: String,
    avatar: String,
    coordinates: Array,
    hashTags: Array,
    lang: String,
    text: String,
    created_at: Date
});


module.exports = mongoose.model('Tweet', Tweet);
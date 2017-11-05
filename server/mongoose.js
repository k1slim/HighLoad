const mongoose = require('mongoose');
const config = require('./config.js');
const Tweet = require('./schemes/tweetScheme');
const dbUrl = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    config.mongoDB.url;

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useMongoClient: true });
const db = mongoose.connection;

db.on('error', function () {
    console.error('Connection error:');
});

db.once('open', function () {
    console.log('Connected to DB!');
});

function getTweets(req, res, next) {
    const findObj = {};
    if (req.params.active) {
        findObj.active = req.params.active;
    }
    if (req.params.author) {
        findObj.author = req.params.author;
    }
    if (req.params.date) {
        findObj.date = req.params.date;
    }

    Tweet.find(findObj, 'twid active author avatar body date',
        {
            skip: req.params.start || 0,
            limit: req.params.start || 10
        })
        .sort({ date: 'desc' })
        .then(data => res.json(data))
        .then(null, err => next(err));
}

function createTweet(req, res, next) {
    new Tweet(req.body).save()
        .then(() => res.json({ success: true }))
        .then(null, err => next(err));
}

function deleteTweet(req, res, next) {
    Todo.findOneAndRemove({ twid: req.params.twid })
        .then(() => res.json({ success: true }))
        .then(null, err => next(err));
}

function updateTweet(req, res, next) {
    Tweet.findOneAndUpdate({ twid: req.params.twid }, req.body)
        .then(() => res.json({ success: true }))
        .then(null, err => next(err));
}

module.exports = {
    getTweets,
    createTweet,
    deleteTweet,
    updateTweet
};
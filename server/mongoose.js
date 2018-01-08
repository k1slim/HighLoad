const mongoose = require('mongoose');

const config = require('./config.js');
const Tweet = require('./schemes/tweetScheme');
const dbUrl = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    config.mongoDB.url;

const dataConverters = require('./helpers/dataConverters');

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

    Tweet.find(findObj, 'twid active author coordinates hashTags avatar text created_at',
        {
            skip: req.params.start || 0,
            limit: req.params.start || 10
        })
        .sort({ date: 'desc' })
        .then(data => res.json(data))
        .then(null, err => next(err));
}

function getRemoteTweets(twit, req, res, next) {
    const date = new Date();
    twit.get('search/tweets', {
        q: `since:${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        geocode: `${req.query.lat},${req.query.lng},100km`,
        count: 800
    }, function (error, response) {
        if (error) {
            return next(error);
        }

        return res.json(response.statuses
            .filter(status => status.coordinates &&
                status.coordinates.coordinates &&
                status.coordinates.coordinates[0] !== null)
            .map(status => dataConverters.convertTweet(status))
        );
    });
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
    updateTweet,
    getRemoteTweets
};
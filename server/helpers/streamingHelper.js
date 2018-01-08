const Tweet = require('../schemes/tweetScheme');

const saveTweets = (data) => {
    new Tweet(data).save(function (err) {
        if (err) {
            console.error(err);
        }
    });
};

const startStream = (twit, cb) => {
    let currentStream;
    twit.stream('statuses/filter', { 'locations': '-180,-89,180,89' }, (stream) => {
        stream.on('data', cb);
        stream.on('error', error => console.log(error));
        currentStream = stream;
    });
    return currentStream;
};

const init = twit => module.exports.startStream = startStream.bind(null, twit);

module.exports = {
    init,
    saveTweets
};
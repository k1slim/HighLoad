const Tweet = require('../schemes/tweetScheme');

const streamHandler = (stream, cb) => {
    stream.on('data', function (data) {
        const tweet = {
            twid: data['id'],
            active: false,
            author: data['user']['name'],
            avatar: data['user']['profile_image_url'],
            body: data['text'],
            date: data['created_at']
        };

        new Tweet(tweet).save(function (err) {
            if (!err) {
                cb(tweet);
            }
        });
    });
};

const startStream = (twit, location, cb) => {
    let currentStream;
    twit.stream('statuses/filter', { 'locations': location }, (stream) => {
        stream.on('data', cb);
        stream.on('error', (error, code) => {
            console.log(error + ': ' + code);
        });
        currentStream = stream;
    });
    return currentStream;
};

const init = twit => module.exports.startStream = startStream.bind(null, twit);

module.exports = {
    init,
    streamHandler
};
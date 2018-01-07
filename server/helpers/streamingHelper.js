const Tweet = require('../schemes/tweetScheme');

const streamHandler = (stream, cb) => {
    stream.on('data', function (data) {
        const tweet = {
            twid: data.id,
            coordinates: data.coordinates.coordinates,
            hashTags: data.entities.hashtags,
            lang: data.lang,
            author: data.user.name,
            avatar: data.user.profile_image_url,
            text: data.text,
            created_at: data.created_at,
            active: false
        };

        new Tweet(tweet).save(function (err) {
            if (!err) {
                cb(tweet);
            }
        });
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
    streamHandler
};
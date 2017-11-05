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
    const boundingBox = `${location.lng - 1},${location.lat - 1},${location.lng + 1},${location.lat + 1}`;
    twit.stream(
        'statuses/filter',
        { 'locations': boundingBox },

        stream => stream.on('data', cb)
    );
    //        { 'locations': '-122.75,36.8,-121.75,37.8' },
};

const init = twit => module.exports.startStream = startStream.bind(null, twit);

module.exports = {
    init,
    streamHandler
};
const Tweet = require('../schemes/tweetScheme');

module.exports = function (stream, io) {
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
                io.emit('tweet', tweet);
            }
        });
    });
};
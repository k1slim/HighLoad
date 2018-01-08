const streamingHelper = require('./helpers/streamingHelper');
const dataConverters = require('./helpers/dataConverters');

const socketActionTag = 'socket/';

const destroyStream = (global) => {
    if (global.currentStream) {
        global.currentStream.destroy();

        global.currentStream = null;
        global.currentLocation = null;
        global.newTweetsTimer = null;
        global.tweets = [];
    }
};

const insideSquare = (square, coordinates) => {
    const { swLng, swLat, neLng, neLat } = square;
    const { lng, lat } = coordinates;

    const rightLng = lng > swLng && lng < neLng;
    const rightLat = lat > swLat && lat < neLat;

    return rightLng && rightLat;
};

const events = {
    [`${socketActionTag}SET_CURRENT_LOCATION`]: (socket, payload, global) => {
        global.currentLocation = payload;
        if (global.currentStream) {
            return;
        }
        global.currentStream = streamingHelper.startStream((data) => {
            if (data.coordinates && data.coordinates.coordinates && data.coordinates.coordinates[0] !== null) {
                const coordinates = {
                    lng: parseFloat(data.coordinates.coordinates[0]),
                    lat: parseFloat(data.coordinates.coordinates[1])
                };

                if (insideSquare(global.currentLocation, coordinates)) {
                    const tweet = dataConverters.convertTweet(data, coordinates);
                    global.tweets.push(tweet);
                    streamingHelper.saveTweets(tweet);
                }
            }

            if (!global.newTweetsTimer) {
                global.newTweetsTimer = setTimeout(() => {
                    if (global.tweets.length) {
                        socket.emit('action', {
                            type: 'NEW_TWEET',
                            payload: global.tweets
                        });
                        global.tweets = [];
                    }

                    global.newTweetsTimer = null;
                }, 1000);
            }
        });
    }
};

module.exports = (io) => {
    io.on('connection', (socket) => {
        const global = {
            currentStream: null,
            currentLocation: null,
            newTweetsTimer: null,
            tweets: []
        };

        socket.on('action', data => events[data.type](socket, data.payload, global));

        socket.on('disconnect', () => destroyStream(global));
    });
};

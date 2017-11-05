const streamingHelper = require('./helpers/streamingHelper');

const socketActionTag = 'socket/';

const events = {
    [`${socketActionTag}SET_CURRENT_LOCATION`]: (socket, payload) => {
        streamingHelper.startStream(payload, (data) => {
            if (data.coordinates && data.coordinates.coordinates && data.coordinates.coordinates[0] !== null) {
                socket.emit('action', {
                    type: 'NEW_TWEET',
                    payload: data
                });
            }
        });
    }
};

module.exports = io => io.on('connection', socket => socket.on('action', data => events[data.type](socket, data.payload)));

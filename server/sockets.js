const streamingHelper = require('./helpers/streamingHelper');

const socketActionTag = 'socket/';
let currentStream;

const destroyStream = (stream) => {
    if (stream) {
        stream.destroy();
    }

};

const events = {
    [`${socketActionTag}SET_CURRENT_LOCATION`]: (socket, payload) => {
        destroyStream(currentStream);
        currentStream = streamingHelper.startStream(payload, (data) => {
            if (data.coordinates && data.coordinates.coordinates && data.coordinates.coordinates[0] !== null) {
                socket.emit('action', {
                    type: 'NEW_TWEET',
                    payload: data.coordinates
                });
            }
        });

    }
};

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('action', data => events[data.type](socket, data.payload));

        socket.on('disconnect', () => destroyStream(currentStream));
    });
};

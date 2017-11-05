import io from 'socket.io-client';

let socket = null;

export const socketActionTag = 'socket/';

export function socketMiddleware() {
    return next => (action) => {
        if (socket && action.type.indexOf(socketActionTag) !== -1) {
            socket.emit('action', action);
        }

        return next(action);
    };
}

export function initSockets(store) {
    socket = io('http://localhost:8080');
    socket.on('action', data => store.dispatch(data));
}

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { initSockets, socketMiddleware } from '../helpers/socketHelpers';

const loggerMiddleware = createLogger();
const nextReducer = require('../reducers').default;

const initialState = {
    auth: {
        user: {},
        isLoginRequested: false,
        loginErrorMessage: '',
        isSignUpRequested: false,
        signUpErrorMessage: ''
    },
    map: {
        tweets: []
    }
};

export default function configureStore() {
    const middlewares = [thunk, socketMiddleware];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(loggerMiddleware);
    }

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    );

    initSockets(store);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

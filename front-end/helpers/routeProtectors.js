import * as actions from '../actions';

let store = null;

function checkInitialURl(nextState, replace, next) {
    next();
    return store.dispatch(actions.getUser())
        .catch((err) => {
            store.dispatch(actions.receiveUserErrorMessage(err));
            location.replace('/signin');
        });
}

export default function connectProtectors(originalStore) {
    store = originalStore;

    return {
        checkInitialURl
    };
}

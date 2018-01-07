import * as actions from '../constants/actionTypes';
import requestWrapper from '../helpers/fetchHelpers';

// set current location
export function setCurrentLocation(payload) {
    return { type: actions.SET_CURRENT_LOCATION, payload };
}

// Get tweets
export function initialTweetsRequest() {
    return { type: actions.REQUEST_INITIAL_TWEETS };
}

export function processInitialTweetsRequest(payload) {
    return requestWrapper({
        url: `http://localhost:8080/api/remote/tweet?lat=${payload.coordinates.lat}&lng=${payload.coordinates.lng}`,
        type: 'GET',
        payload: {}
    });
}

export function initialTweetsReceive(payload) {
    return { type: actions.RECEIVE_INITIAL_TWEETS, payload };
}

export function receiveInitialTweetsErrorMessage(payload) {
    return { type: actions.RECEIVE_INITIAL_TWEETS_ERROR, payload };
}

export function getInitialTweets(payload) {
    return (dispatch) => {
        dispatch(initialTweetsRequest());
        return processInitialTweetsRequest(payload)
            .then(response => dispatch(initialTweetsReceive(response.data)))
            .catch(err => receiveInitialTweetsErrorMessage(err));
    };
}

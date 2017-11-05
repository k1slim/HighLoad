import * as actions from '../constants/actionTypes';

// set current location
export function setCurrentLocation(payload) {
    return { type: actions.SET_CURRENT_LOCATION, payload };
}

// TODO delete this after adding another action
export const q = 1;


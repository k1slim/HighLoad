import { createReducer } from 'redux-create-reducer';
import * as ActionTypes from '../constants/actionTypes';

export const map = createReducer({}, {
    [ActionTypes.NEW_TWEET](state, action) {
        const tweets = [...state.tweets];

        const tweet = action.payload;
        tweets.push({
            coordinates: {
                lng: parseFloat(tweet.coordinates.coordinates[0]),
                lat: parseFloat(tweet.coordinates.coordinates[1])
            }
        });

        return { ...state, tweets };
    }

});

export default map;

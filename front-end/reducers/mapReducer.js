import { createReducer } from 'redux-create-reducer';
import * as ActionTypes from '../constants/actionTypes';

const receiveTweets = (state, action) => {
    const tweets = [...state.tweets];

    return { ...state, tweets: [...tweets, ...action.payload] };
};

export const map = createReducer({}, {
    [ActionTypes.NEW_TWEET]: receiveTweets,

    [ActionTypes.RECEIVE_INITIAL_TWEETS]: receiveTweets
});

export default map;

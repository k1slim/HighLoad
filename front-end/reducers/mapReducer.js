import { createReducer } from 'redux-create-reducer';
import * as ActionTypes from '../constants/actionTypes';

export const map = createReducer({}, {
    [ActionTypes.NEW_TWEET](state, action) {
        const tweets = [...state.tweets];

        return { ...state, tweets: [...tweets, ...action.payload] };
    }

});

export default map;

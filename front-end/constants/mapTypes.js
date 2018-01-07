import { socketActionTag } from '../helpers/socketHelpers';

export const NEW_TWEET = 'NEW_TWEET';
export const SET_CURRENT_LOCATION = `${socketActionTag}SET_CURRENT_LOCATION`;

export const REQUEST_INITIAL_TWEETS = 'REQUEST_INITIAL_TWEETS';
export const RECEIVE_INITIAL_TWEETS = 'RECEIVE_INITIAL_TWEETS';
export const RECEIVE_INITIAL_TWEETS_ERROR = 'RECEIVE_INITIAL_TWEETS_ERROR';

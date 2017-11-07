import { createReducer } from 'redux-create-reducer';
import * as ActionTypes from '../constants/actionTypes';

export const auth = createReducer({}, {
    [ActionTypes.REQUEST_LOGIN](state) {
        return { ...state, isLoginRequested: true, loginErrorMessage: '' };
    },

    [ActionTypes.RECEIVE_LOGIN](state, action) {
        return { ...state, isLoginRequested: false, user: action.payload.user };
    },

    [ActionTypes.RECEIVE_LOGIN_ERROR](state, action) {
        return { ...state, isLoginRequested: false, loginErrorMessage: action.payload.message };
    },

    [ActionTypes.RECEIVE_SIGN_UP](state) {
        return { ...state, isSignUpRequested: true, signUpErrorMessage: '' };
    },

    [ActionTypes.RECEIVE_SIGN_UP](state) {
        return { ...state, isSignUpRequested: false };
    },

    [ActionTypes.RECEIVE_SIGN_UP_ERROR](state, action) {
        return { ...state, isSignUpRequested: false, signUpErrorMessage: action.payload.message };
    },

    [ActionTypes.REQUEST_USER](state) {
        return { ...state, isUserRequested: true, userErrorMessage: '' };
    },

    [ActionTypes.RECEIVE_USER](state) {
        return { ...state, isUserRequested: false };
    },

    [ActionTypes.RECEIVE_USER_ERROR](state, action) {
        return { ...state, isUserRequested: false, userErrorMessage: action.payload.message };
    }
});

export default auth;

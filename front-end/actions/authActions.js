import { browserHistory } from 'react-router';
import * as actions from '../constants/actionTypes';
import requestWrapper from '../helpers/fetchHelpers';

// Sign in
export function signInRequest() {
    return { type: actions.REQUEST_LOGIN };
}

export function processSignInRequest(payload) {
    return requestWrapper({ url: 'http://localhost:8080/api/login', type: 'POST', payload });
}

export function signInReceive(payload) {
    return { type: actions.RECEIVE_LOGIN, payload };
}

export function receiveSignInErrorMessage(payload) {
    return { type: actions.RECEIVE_LOGIN_ERROR, payload };
}

export function signIn(payload) {
    return (dispatch) => {
        dispatch(signInRequest());
        return processSignInRequest(payload)
            .then((response) => {
                dispatch(signInReceive(response.data));
                browserHistory.push('/');
            })
            .catch(err => dispatch(receiveSignInErrorMessage(err)));
    };
}

// Sign Up
export function signUpRequest() {
    return { type: actions.REQUEST_SIGN_UP };
}

export function processSignUpRequest(payload) {
    return requestWrapper({ url: 'http://localhost:8080/api/register', type: 'POST', payload });
}

export function signUpReceive(payload) {
    return { type: actions.RECEIVE_SIGN_UP, payload };
}

export function receiveSignUpErrorMessage(payload) {
    return { type: actions.RECEIVE_SIGN_UP_ERROR, payload };
}

export function signUp(payload) {
    return (dispatch) => {
        dispatch(signUpRequest());
        return processSignUpRequest(payload)
            .then((response) => {
                dispatch(signUpReceive(response.data));
                browserHistory.push('/');
            })
            .catch(err => dispatch(receiveSignUpErrorMessage(err)));
    };
}

// Get user
export function userRequest() {
    return { type: actions.REQUEST_USER };
}

export function processUserRequest() {
    return requestWrapper({ url: 'http://localhost:8080/api/user', type: 'GET', payload: {} });
}

export function userReceive(payload) {
    return { type: actions.RECEIVE_USER, payload };
}

export function receiveUserErrorMessage(payload) {
    return { type: actions.RECEIVE_USER_ERROR, payload };
}

export function getUser(payload) {
    return (dispatch) => {
        dispatch(userRequest());
        return processUserRequest(payload)
            .then(response => dispatch(userReceive(response.data)));
    };
}

import { combineReducers } from 'redux';
import { auth } from './authReducer';
import { map } from './mapReducer';

const rootReducer = combineReducers({
    auth,
    map
});

export default rootReducer;

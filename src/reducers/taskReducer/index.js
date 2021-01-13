import { combineReducers } from 'redux';
import createReducer from './createReducer';
import loadReducer from './loadReducer';


export default combineReducers({ 
    createReducer,
    loadReducer,
});
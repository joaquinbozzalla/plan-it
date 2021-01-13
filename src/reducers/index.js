import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import datetimeReducer from './datetimeReducer/index';
import taskReducer from './taskReducer/index';
import authReducer from './authReducer/index';
import currentTaskReducer from './currentTaskReducer/index';
import categoriesReducer from './categoriesReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default (history) => combineReducers({ 
    router: connectRouter(history),
    authReducer,
    datetimeReducer,
    currentTaskReducer,
    taskReducer,
    categoriesReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
});
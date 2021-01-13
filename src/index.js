import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { ENVIRONMENT, PRODUCTION } from './constants/config';

import { getFirestore, reduxFirestore, createFirestoreInstance } from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase, { firebaseConfig } from './services/firebase/setup';

const history = createBrowserHistory();
let store = undefined;
// En desarrollo se utiliza la herramienta 'logger' para mostrar en consola los cambios en redux. En produccion esta herramienta debe estar deshabilitada.
if (ENVIRONMENT === PRODUCTION) {
    store = createStore(
        rootReducer(history),
        compose(
            applyMiddleware(routerMiddleware(history), thunk.withExtraArgument({ getFirestore, getFirebase })),
            reduxFirestore(firebase)
        )
        );
} else {
    const logger = createLogger();
    store = createStore(
        rootReducer(history),
        compose(
            applyMiddleware(logger, routerMiddleware(history), thunk.withExtraArgument({ getFirestore, getFirebase })),
            reduxFirestore(firebase)
        )
    );
}

const rrfProps = {
    firebase,
    config: firebaseConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App history={history} />
        </ReactReduxFirebaseProvider>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
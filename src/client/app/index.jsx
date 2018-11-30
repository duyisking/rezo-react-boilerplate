// import React
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import { createStore } from 'redux';
import Loadable from 'react-loadable';

import state from 'reducers';
import App from 'components/app';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(
    state,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
        <Router>
            <App store={store} />
        </Router>,
        document.getElementById('root'),
    );
});

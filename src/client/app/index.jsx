import React from 'react';
import { render, hydrate } from 'react-dom';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';

import GlobalStyle from './components/GlobalStyle';
import App from './components/App';
import Head from './components/Head';

// Reducer
import {
    state,
    logger,
    crashReporter,
} from './redux/reducers';

// Note that this script will not be running on the NodeJS environment.
// The `process.env` variable is a forged variable created by Webpack.
// See dist/webpack.config.js
const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production';
const IS_SSR_MODE = process.env.SSR;

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
let store;
if (IS_PRODUCTION_MODE) {
    store = createStore(
        state,
        preloadedState,
    );
}
else {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(
        state,
        preloadedState,
        composeEnhancers(applyMiddleware(logger, crashReporter)),
    );
}

const supportsHistory = 'pushState' in window.history;

loadableReady(() => {
    // Server-side rendering mode use hydrate, otherwise use render
    (IS_SSR_MODE ? hydrate : render)(
        <Router forceRefresh={!supportsHistory}>
            <Provider store={store}>
                <React.Fragment>
                    <Head />
                    <GlobalStyle />
                    <App />
                </React.Fragment>
            </Provider>
        </Router>,
        document.getElementById('root'),
    );
});

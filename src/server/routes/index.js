import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from 'dist/react-loadable.json';
import { createStore } from 'redux';
import state from 'reducers';
import App from 'components/app.jsx';

const host = API_URL;

let render = (req, res, ejs, title, initState, status, others = {}) => {
    const staticContext = { statusCode: status };
    const store = createStore(state, initState);
    const data = {
        title,
        html: '',
        bundles: [],
        preloadedState: store.getState(),
        url: host + req.originalUrl,
        nonce: res.locals.nonce,
        others,
    };
    res.status(staticContext.statusCode);
    res.render(ejs, { data });
};

if (process.env.SSR === 'true') {
    console.log('\x1b[31m\x1b[4m%s\x1b[0m', 'SERVER-SIDE RENDERING ON!');

    render = (req, res, ejs, title, initState, status, others = {}) => {
        const staticContext = { statusCode: status };
        const store = createStore(state, initState);

        const modules = [];
        const html = renderToString(
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <StaticRouter location={req.url} context={staticContext}>
                    <App store={store} />
                </StaticRouter>
            </Loadable.Capture>,
        );
        const bundles = getBundles(stats, modules);

        const data = {
            title,
            html,
            bundles,
            preloadedState: store.getState(),
            url: host + req.originalUrl,
            nonce: res.locals.nonce,
            others,
        };

        res.status(staticContext.statusCode);
        res.render(ejs, { data });
    };
}

const index = (req, res) => {
    const initState = {
    };
    const status = 200;

    render(req, res, 'index', 'Home Page', initState, status, {
        description: '',
    });
};

export {
    index,
};

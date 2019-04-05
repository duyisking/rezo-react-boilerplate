import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import chalk from 'chalk';
import express from 'express'; /* eslint no-unused-vars: "off" */

/* eslint-disable import/no-unresolved */
import {
    state,
} from 'reducers';
import App from 'components/App';
import Head from 'components/Head';
/* eslint-enable import/no-unresolved */

import stats from '../../../../dist/react-loadable.json';
import compilationStats from '../../../../dist/compilation-stats.json';

/**
 * Metadata object for rendering head tag.
 * @typedef {Object} Metadata
 * @property {string} title - The title of the page
 * @property {string} description - The description of the page
 * @property {string} keywords - The keywords of the page
 * @property {string} canonical - The canonical of the page
 */

/**
 * Rendering function WITHOUT SSR.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {String} ejs - The name of the template file to be rendered.
 * @param {Metadata} metadata - The metadata object.
 * @param {Object} [initState={}] - The initial state of Redux store.
 * @param {Number} [status=200] - The status code to response.
 * @param {Object} [others={}] - Other metadata information to render the template
 *  such as description, keywords, etc.
 */
const renderWithoutSSR = (req, res, ejs, metadata, initState = {}, status = 200, others = {}) => {
    const staticContext = { statusCode: status };
    const store = createStore(state, {
        ...initState,
        metadata,
    });
    const data = {
        html: '',
        bundles: [],
        preloadedState: store.getState(),
        helmet: {
            htmlAttributes: '',
            title: '',
            meta: '',
            link: '',
            bodyAttributes: '',
        },
        others,
    };
    res.status(staticContext.statusCode);
    res.render(ejs, { data });
};

/**
 * Rendering function WITH SSR.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {String} ejs - The name of the template file to be rendered.
 * @param {Metadata} metadata - The metadata object.
 * @param {Object} initState - The initial state of Redux store.
 * @param {Number} [status=200] - The status code to response.
 * @param {Object} [others={}] - Other metadata information to render the template
 *  such as description, keywords, etc.
 */
const renderWithSSR = (req, res, ejs, metadata, initState, status = 200, others = {}) => {
    const staticContext = { statusCode: status };
    const store = createStore(state, {
        ...initState,
        metadata,
    });

    const modules = [];
    const html = renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <StaticRouter location={req.url} context={staticContext}>
                <Provider store={store}>
                    <React.Fragment>
                        <Head />
                        <App />
                    </React.Fragment>
                </Provider>
            </StaticRouter>
        </Loadable.Capture>,
    );

    const bundles = getBundles(stats, modules);
    const helmet = Helmet.renderStatic();

    const data = {
        html,
        bundles,
        preloadedState: store.getState(),
        helmet,
        hash: compilationStats.hash,
        others,
    };

    res.status(staticContext.statusCode);
    res.render(ejs, { data });
};

let render = renderWithoutSSR; // eslint-disable-line import/no-mutable-exports
if (process.env.SSR) {
    console.log(chalk.blue('SERVER-SIDE RENDERING ON!'));
    render = renderWithSSR;
}

export default render;

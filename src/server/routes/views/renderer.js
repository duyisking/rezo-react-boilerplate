import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import chalk from 'chalk';
import path from 'path';
import express from 'express'; /* eslint no-unused-vars: "off" */

import {
    state,
} from '../../../app/redux/reducers';
import App from '../../../app/components/App';
import Head from '../../../app/components/Head';
import GlobalStyle from '../../../app/components/GlobalStyle';

import compilationStats from '../../../../dist/compilation-stats.json';
import stats from '../../../../dist/loadable-stats.json';

const extractor = new ChunkExtractor({ stats });

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
        scriptTags: `<script src="/build/main.bundle${process.env.NODE_ENV === 'production'
            ? `.${compilationStats.hash}` : ''}.js"></script>`,
        preloadedState: store.getState(),
        // TODO: don't let these empty
        styleTags: '',
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
    const sheet = new ServerStyleSheet();

    const jsx = extractor.collectChunks(
        <StyleSheetManager sheet={sheet.instance}>
            <StaticRouter location={req.url} context={staticContext}>
                <Provider store={store}>
                    <>
                        <Head />
                        <GlobalStyle />
                        <App />
                    </>
                </Provider>
            </StaticRouter>
        </StyleSheetManager>,
    );

    let html = '';
    let styleTags = '';
    try {
        html = renderToString(jsx);
        styleTags = sheet.getStyleTags();
    }
    catch (error) {
        // handle error
        console.error(error);
    }
    finally {
        sheet.seal();
    }

    const helmet = Helmet.renderStatic();

    const scriptTags = extractor.getScriptTags();

    const data = {
        html,
        styleTags,
        scriptTags,
        preloadedState: store.getState(),
        helmet,
        others,
    };

    res.status(staticContext.statusCode);
    res.render(ejs, { data });
};

let render = renderWithoutSSR; // eslint-disable-line import/no-mutable-exports
if (process.env.SSR) {
    console.log(chalk.blue.bold('SERVER-SIDE RENDERING ON!'));
    render = renderWithSSR;
}

export default render;

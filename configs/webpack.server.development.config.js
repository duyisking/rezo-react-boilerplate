const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const opn = require('opn');
const WebpackShellPlugin = require('./plugin/webpack/webpack-shell-plugin.js');
const constants = require('./constants.js');

// Get common config
const { server } = require('./webpack.common.config.js');

const { config } = constants;

// Development mode
module.exports = ({ SSR = false }) => merge(server, {

    mode: 'development',

    devtool: 'eval-source-map',

    watch: true,
    watchOptions: {
        poll: true,
    },

    plugins: [
        new webpack.DefinePlugin(Object.assign({}, constants.GLOBALS, {
            'process.env': {
                PORT: config.PORT,
                SSR: SSR || config.SSR,
            },
        })),
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
        }),
        new WebpackShellPlugin({
            path: path.resolve(constants.DIST_DIR, 'index.js'),
            afterFirstEmit: (proc) => {
                // Open URL in the browser after server has started.
                proc.on('message', (msg) => {
                    if (msg === 'ready') {
                        opn(constants.WEBPACK_LOCALHOST);
                    }
                });
            },
            ssr: SSR || config.SSR,
        }),
    ],

});

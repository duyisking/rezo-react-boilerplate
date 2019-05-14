const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const constants = require('./constants.js');

// Get common config
const { server } = require('./webpack.common.config.js');

const { config } = constants;

// Production mode
module.exports = ({ SSR = true }) => merge(server, {

    mode: 'production',

    devtool: 'source-map',

    plugins: [
        new webpack.DefinePlugin(Object.assign({}, constants.GLOBALS, {
            'process.env': {
                PORT: config.PORT,
                NODE_ENV: JSON.stringify('production'),
                SSR: SSR || config.SSR,
            },
        })),
        new CleanWebpackPlugin([constants.PROD_TEMPLATES_DIR], {
            root: constants.WORK_DIR,
            exclude: ['.gitkeep'],
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(constants.DEV_TEMPLATES_DIR, 'prod'),
            to: constants.PROD_TEMPLATES_DIR,
        }]),
    ],

});

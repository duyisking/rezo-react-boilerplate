const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const config = require('./config.js');
const WebpackShellPlugin = require('./plugin/webpack/webpack-shell-plugin.js')

// Declare paths
const SERVER_DIR = path.resolve(__dirname, 'src/server');
const APP_DIR = path.resolve(__dirname, 'src/client', config.APP);
const DIST_DIR = path.resolve(__dirname, 'dist');

// Get npm script
const TARGET = process.env.npm_lifecycle_event;
const SSR = process.env.SSR == 'true';
const SERVER_ONLY = process.env.SERVER_ONLY == 'true';

// Split urls
const API_URL = config.API_URL.map((e) => JSON.stringify(e));

// Common config object
const common = {

    entry: path.resolve(SERVER_DIR, 'server.js'),

    target: 'node',

    output: {
        filename: 'index.js',
        path: DIST_DIR,
        publicPath: '/build/',
    },

    externals: [nodeExternals()],

    node: { __filename: false, __dirname: false },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader'
            },
            {
                type: 'javascript/auto',
                test: /\.json/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|svg|jpe?g|gif|ico)$/,
                exclude: [
                    path.resolve(APP_DIR, 'images/compress')
                ],
                loader: 'file-loader',
                options: {
                    name: '[name]-[md5:hash:hex:6].[ext]',
                    outputPath: 'images/',
                    emitFile: false
                }
            },
            {
                test: /\.(scss|sass)$/,
                loader: 'ignore-loader'
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        // add alias for application code directory
        alias: {
            components: path.resolve(APP_DIR, 'components'),
            action: path.resolve(APP_DIR, 'redux/action'),
            reducers: path.resolve(APP_DIR, 'redux/reducers'),
            dist: path.resolve(__dirname, 'dist')
        },
    },

    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
    ],

    stats: {
        modules: false,
        children: false,
    }

}

if (TARGET !== 'webpack-server') {
    // Development mode
    console.log(chalk.green.bold('Webpack Server on development!'));
    module.exports = merge(common, {

        mode: 'development',

        devtool: 'eval-source-map',

        watch: true,
        watchOptions: {
            poll: true
        },

        plugins: [
            new webpack.DefinePlugin({
                'API_URL': API_URL[0],
            }),
            new webpack.BannerPlugin({ 
                banner: 'require("source-map-support").install();',
                raw: true, entryOnly: false 
            }),
            new WebpackShellPlugin({
                SSR
            }),
        ]

    });
}
else {
    // Production mode
    console.log(chalk.green.bold('Webpack Server on production!'));
    module.exports = merge(common, {

        mode: 'production',

        devtool: 'source-map',

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                    'SSR': JSON.stringify('true'),
                    'PORT': JSON.stringify(process.env.PORT),
                },
                'API_URL': API_URL[1],
            }),
        ],

    });
}

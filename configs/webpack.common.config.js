const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const constants = require('./constants.js');

const { config } = constants;

// Common config object
module.exports = {

    entry: {
        main: path.resolve(constants.APP_DIR, 'index.jsx'),
    },

    output: {
        path: constants.BUILD_DIR,
        publicPath: '/build/',
    },

    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },

    module: {
        rules: [
            {
                test: /\.(ico|svg|gif|png|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[md5:hash:hex:6].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: path.resolve(constants.WORK_DIR, 'node_modules/.cache/client/babel-loader'),
                        ...config.babelrc,
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    plugins: [
        new LoadablePlugin({
            writeToDisk: {
                filename: path.resolve(constants.DIST_DIR),
            },
        }),
    ],

};

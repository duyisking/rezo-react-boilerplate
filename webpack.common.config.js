const path = require('path');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const config = require('./config.js');

// Declare paths
const BUILD_DIR = path.resolve(__dirname, 'dist/public/build');
const APP_DIR = path.resolve(__dirname, 'src/client', config.APP);

const entry = config.WEBPACK_CSS.entry;
// Pre-process entries
Object.keys(entry).forEach(function(key) {
    entry[key] = path.resolve(APP_DIR, 'scss', entry[key]);
});

// Common config object
module.exports = {

    entry: Object.assign({
        main: path.resolve(APP_DIR, 'index.jsx'),
    }, entry),

    output: {
        path: BUILD_DIR,
        publicPath: '/build/',
    },

    externals: config.externals,

    module: {
        rules: [
            {
                test: /\.(ico|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[md5:hash:hex:6].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g)$/,
                include: [
                    path.resolve(APP_DIR, 'images/compress')
                ],
                use: [
                    {
                        loader: 'responsive-loader',
                        options: {
                            sizes: [600],
                            name: 'images/[name]-[width].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g)$/,
                exclude: [
                    path.resolve(APP_DIR, 'images/compress')
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[md5:hash:hex:6].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: './node_modules/.cache/babel-loader'
                    }
                }
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
        },
    },

    plugins: [
        new ReactLoadablePlugin({
            filename: './dist/react-loadable.json'
        }),
    ],

}

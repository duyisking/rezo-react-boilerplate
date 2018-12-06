const chalk = require('chalk');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CssCleanupPlugin = require('./plugin/webpack/css-cleanup-plugin.js');
const config = require('./config.js');

// Declare paths
const BUILD_DIR = path.resolve(__dirname, 'dist/public/build');

// Get npm script
const TARGET = process.env.npm_lifecycle_event;

// Get common config
var common = require('./webpack.common.config.js');

// Split urls
const API_URL = config.API_URL.map((e) => JSON.stringify(e));

// Check if analyzer is turned on
if (process.env.analyzer == 'true') {
    common = merge(common, {
        plugins: [
            new BundleAnalyzerPlugin()
        ]
    });
}

if (TARGET !== 'webpack') {
    // Development mode
    console.log(chalk.green.bold('Webpack Client on development!'));
    module.exports = merge(common, {

        mode: 'development',

        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js',
        },

        devtool: 'cheap-module-eval-source-map',

        devServer: {
            historyApiFallback: true,
            inline: true,
            host: 'localhost',
            port: 8080,
            proxy: {
                '/': {
                    target: 'http://localhost:3000',
                },
            },
            open: true,
            stats: {
                // fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
                all: undefined,
            
                // Add asset Information
                assets: true,
            
                // Add build date and time information
                builtAt: true,
            
                // Add children information
                children: false,
            
                // Add chunk information (setting this to `false` allows for a less verbose output)
                chunks: false,

                // `webpack --colors` equivalent
                colors: true,
            
                // Display the distance from the entry point for each module
                depth: false,
            
                // Display the entry points with the corresponding bundles
                entrypoints: true,
            
                // Add --env information
                env: false,
            
                // Add errors
                errors: true,
            
                // Add details to errors (like resolving log)
                errorDetails: true,
            
                // Add the hash of the compilation
                hash: true,
            
                // Add built modules information
                modules: false,
            
                // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
                moduleTrace: true,
            
                // Add timing information
                timings: true,
            
                // Add warnings
                warnings: true,
            }
        },

        module: {
            rules: [
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: function () {
                                    return [autoprefixer({
                                        browsers: config.CSS_PREFIX
                                    })]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: function () {
                                    return [autoprefixer({
                                        browsers: config.CSS_PREFIX
                                    })]
                                }
                            }
                        },
                    ]
                },
            ]
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),  // This makes everything reloaded when you change files
            new webpack.DefinePlugin({
                'API_URL': API_URL[0],
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new CssCleanupPlugin({ production: false }),
        ],

    });
}
else {
    // Production mode
    console.log(chalk.green.bold('Webpack Client on production!'));
    module.exports = merge(common, {

        mode: 'production',

        devtool: 'source-map',

        output: {
            filename: '[name].bundle.[chunkhash].js',
            chunkFilename: '[name].bundle.[chunkhash].js',
        },

        module: {
            rules: [
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: { minimize: true }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [autoprefixer({
                                        browsers: config.CSS_PREFIX
                                    })]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                },
            ]
        },

        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        
        plugins: [
            new webpack.DefinePlugin({
                'API_URL': API_URL[1],
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                },
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new UglifyJSPlugin({
                sourceMap: true
            }),
            new CleanWebpackPlugin([ BUILD_DIR ]),
            new CssCleanupPlugin({ production: true }),
        ],

    });
}

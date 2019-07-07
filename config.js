module.exports = {
    // The port on which the server listens upon starting the server
    PORT: 3000,
    // The port used by Webpack Dev Server
    WEBPACK_PORT: 8080,
    // Server-side rendering mode
    SSR: false,
    // This object contains all the constants that are available to all source files
    globals: {
        dev: {
            API_URL: 'http://localhost:3001',
        },
        prod: {
            API_URL: 'http://example.com',
        },
    },
    babelrc: {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                },
            ],
            '@babel/preset-react',
        ],
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-async-to-generator',
            'babel-plugin-styled-components',
            '@loadable/babel-plugin',
        ],
    },
};

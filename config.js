module.exports = {
    // The port on which the server listens upon starting the server
    PORT: 3000,
    // The port used by Webpack Dev Server
    WEBPACK_PORT: 8080,
    // Server-side rendering mode
    SSR: false,
    // This object contains all the constants that are available to all source files
    globals: {
        API_URL: 'http://localhost:3001',
    },
    babelrc: {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 8,
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

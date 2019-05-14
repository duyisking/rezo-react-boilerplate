module.exports = {
    // Specify which app to run if multiple apps are presented
    APP: 'app',
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
            '@babel/preset-env',
            '@babel/preset-react',
        ],
        plugins: [
            'babel-plugin-styled-components',
            '@babel/plugin-syntax-dynamic-import',
            '@loadable/babel-plugin',
        ],
    },
};

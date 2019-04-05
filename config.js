module.exports = {
    // Specify which app to run if multiple apps are presented
    APP: 'app',
    // The port which localhost will run on when starting the server
    PORT: 3000,
    // The port used by Webpack Dev Server
    WEBPACK_PORT: 8080,
    // This object contains all the constants that are available to all source files
    globals: {
        API_URL: 'http://localhost:3001',
    },
};

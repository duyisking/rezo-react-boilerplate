module.exports = {
    APP: 'app',
    API_URL: [
        'http://localhost:3000',
        '',
    ],
    CSS_PREFIX: [
        'last 3 versions',
        'Firefox >= 20',
        'iOS >= 7',
    ],
    WEBPACK_CSS: {
        entry: {
            'styles': 'styles.scss',
        },
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
}
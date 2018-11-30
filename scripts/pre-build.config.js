module.exports = {
    srcDir: 'src/server/templates',
    outDir: 'dist/templates',
    findDir: 'dist/public/build',
    publicPath: '/build',
    scripts: [
        "<script async src='https://www.googletagmanager.com/gtag/js?id=xxx'></script>",
        `<script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'xxx');
        </script>`,
    ],
    tasks: [
        {
            file: 'index.ejs',
            todos: [
                {
                    name: 'Insert hash for main.css',
                    type: 'insert-hash',
                    attribute: 'href',
                    query: 'link[href="/build/main.css"]',
                    regex: /main.\w+.css$/,
                },
                {
                    name: 'Insert hash for styles.css',
                    type: 'insert-hash',
                    attribute: 'href',
                    query: 'link[href="/build/styles.css"]',
                    regex: /styles.\w+.css$/,
                },
                {
                    name: 'Insert hash for main.bundle.js',
                    type: 'insert-hash',
                    attribute: 'src',
                    query: 'script[src="/build/main.bundle.js"]',
                    regex: /main.bundle.\w+.js$/,
                },
                {
                    name: 'React with production',
                    type: 'alter-prop',
                    attribute: 'src',
                    query: 'script[src="/js/react.development.js"]',
                    value: '/js/react.production.min.js',
                },
                {
                    name: 'ReactDOM with production',
                    type: 'alter-prop',
                    attribute: 'src',
                    query: 'script[src="/js/react-dom.development.js"]',
                    value: '/js/react-dom.production.min.js',
                },
            ],
        },
    ],
};

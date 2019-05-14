const program = require('commander');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const async = require('async');
const clientConfig = require('../webpack.client.production.config');
const serverConfig = require('../webpack.server.production.config');
const constants = require('../constants');
const {
    errorHandler,
} = require('./utils');

program
    .option('-o, --open', 'Automatically open bundle analyzer report in default browser')
    .option('-s, --ssr', 'Turn on server-side rendering')
    .parse(process.argv);

const clientCompiler = webpack(clientConfig({ SSR: program.ssr, openAnalyzer: program.open }));
const serverCompiler = webpack(serverConfig({ SSR: program.ssr }));

async.series([
    (callback) => {
        clientCompiler.run((err, stats) => {
            if (err) {
                callback(err);
                return;
            }

            // Get the hash
            const onlyHash = {
                hash: stats.hash,
            };
            const filePath = path.resolve(constants.DIST_DIR, 'compilation-stats.json');

            fs.writeFile(filePath, JSON.stringify(onlyHash), (_err) => {
                if (_err) {
                    callback(_err);
                    return;
                }
                console.log(stats.toString({ colors: true }));
                callback(null);
            });
        });
    },
    (callback) => {
        serverCompiler.run((err, stats) => {
            if (err) {
                callback(err);
                return;
            }
            console.log(stats.toString({ colors: true }));
            callback(null);
        });
    },
], (err) => {
    if (err) {
        errorHandler(err);
    }
});

const program = require('commander');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const async = require('async');
const clientConfig = require('../webpack.config');
const serverConfig = require('../webpack.server.config');
const constants = require('../constants');
const {
    errorHandler,
} = require('./utils');

program
    .option('-o, --open', 'Automatically open bundle analyzer report in default browser')
    .parse(process.argv);

const clientCompiler = webpack(clientConfig(program.open));
const serverCompiler = webpack(serverConfig);

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

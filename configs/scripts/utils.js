const logSymbols = require('log-symbols');
const chalk = require('chalk');

const { error } = console;

/**
 * @param {string[]} messages - Message of the error
 */
const errorHandler = (...messages) => {
    messages.forEach(message => (
        error(logSymbols.error, chalk.red(message))
    ));
    error(logSymbols.error, chalk.red('Process failed.'));
    process.exit(0);
};

module.exports = {
    errorHandler,
};

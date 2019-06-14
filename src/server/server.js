// dist/index.js
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import app from './app';

const PORT = process.env.PORT || process.env.PORT_STATIC;

app.listen(PORT, () => {
    console.log(logSymbols.info, chalk.bold(`Server is on port ${PORT}`));
    process.send('ready');
});

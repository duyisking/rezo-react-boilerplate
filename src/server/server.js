const express = require('express');
const path = require('path');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const RouteHandler = require('./routes').default;

const app = express();
const PORT = process.env.PORT || process.env.PORT_STATIC;

app.use(express.static(path.join(__dirname, '../static')));
app.set('views', path.join(__dirname, '../src/server/templates/dev'));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'templates'));
}

app.set('view engine', 'ejs');

RouteHandler(app);

app.listen(PORT, () => {
    console.log(logSymbols.info, chalk.bold(`Server is on port ${PORT}`));
    process.send('ready');
});

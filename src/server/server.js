import express from 'express';
import path from 'path';
import chalk from 'chalk';
import _ from 'lodash';

import * as routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, '../../static')));
    app.set('views', path.join(__dirname, 'templates'));
}
else {
    app.use(express.static(path.join(__dirname, './public')));
    app.use(express.static(path.join(__dirname, '../static')));
    app.set('views', path.join(__dirname, './templates'));
}

app.set('view engine', 'ejs');

app.get('/', routes.index);

app.listen(PORT, () => {
    const length = 100;
    const text = `Server is on port ${PORT}`;
    const padding = (length - text.length - 2) / 2;
    console.log(chalk.bgBlue(_.repeat(' ', length)));
    console.log(chalk.bgBlue.black(_.repeat(' ', padding), text, _.repeat(' ', padding)));
    console.log(chalk.bgBlue(_.repeat(' ', length)));
});

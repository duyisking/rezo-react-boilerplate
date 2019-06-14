import express from 'express';
import path from 'path';
import RouteHandler from './routes';

const app = express();

// check if using Jest
if (process.env.JEST_WORKER_ID !== undefined) {
    // context: src/server/
    app.use(express.static(path.join(__dirname, '../../static')));
    app.set('views', path.join(__dirname, 'templates/dev'));
}
else {
    // context: dist/
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, 'public')));
    }
    else {
        app.use(express.static(path.join(__dirname, '../static')));
    }
    app.set('views', path.join(__dirname, 'templates'));
}

app.set('view engine', 'ejs');

RouteHandler(app);

export default app;

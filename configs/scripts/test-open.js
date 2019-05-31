const opn = require('opn');
const {
    errorHandler,
} = require('./utils');

opn('coverage/index.html')
    .catch(() => {
        errorHandler('Coverage not found! You should run test before calling this command.',
            'If you had run test before, it may be that you had run test:clean. Try running test again.');
    });

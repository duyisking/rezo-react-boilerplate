#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const { APP_DIR } = require('../../constants');
const {
    indexJSContent,
    componentContent,
    testContent,
} = require('./templates');
const {
    errorHandler,
} = require('../utils');

program
    .version('0.0.2', '-v, --version')
    .arguments('<dir> <name>')
    .option('-c, --class', 'Class component')
    .action((directory, component, cmd) => {
        const dirPath = path.resolve(APP_DIR, 'components', directory);
        const componentDirectory = path.resolve(dirPath, component);

        if (!fs.existsSync(dirPath)) {
            errorHandler(`Directory ${dirPath} does not exist.`);
        }

        if (fs.existsSync(componentDirectory)) {
            errorHandler(`Component already exists at ${componentDirectory}`);
        }

        fs.mkdirSync(componentDirectory);
        fs.writeFileSync(path.join(componentDirectory, 'index.js'), indexJSContent(component));
        fs.writeFileSync(path.join(componentDirectory, `${component}.jsx`), componentContent(component, cmd.class));
        fs.writeFileSync(path.join(componentDirectory, `${component}.test.js`), testContent(component));
    });

program.parse(process.argv);

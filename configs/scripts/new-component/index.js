#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { APP_DIR } = require('../../constants');
const {
    indexJSContent,
    componentContent,
    testContent,
    storyBookContent,
} = require('./templates');
const {
    errorHandler,
} = require('../utils');

inquirer
    .prompt([
        {
            type: 'input',
            name: 'component',
            message: 'What is the component name?',
            validate: (component) => {
                const pass = component.match(/^[A-Z][a-zA-Z]*/);
                if (pass) {
                    return true;
                }
                return 'Please enter a valid name contains only alphabet characters (a-z,A-Z) with the first letter capitalized.';
            },
        },
        {
            type: 'input',
            name: 'directory',
            message: 'Where do you want to place this component? (inside src/app/components)',
            validate: (directory) => {
                const componentsDir = path.resolve(APP_DIR, 'components');
                const dirPath = path.resolve(componentsDir, directory);
                const pass = dirPath.match(new RegExp(`^${componentsDir}`));
                if (pass) {
                    return true;
                }
                return 'Invalid relative path.';
            },
        },
        {
            type: 'confirm',
            name: 'classComponent',
            message: 'Is it a class component?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'storyBook',
            message: 'Use storybook?',
            default: false,
        },
    ])
    .then((answers) => {
        const {
            component,
            directory,
            classComponent,
            storyBook,
        } = answers;
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
        fs.writeFileSync(path.join(componentDirectory, `${component}.jsx`), componentContent(component, classComponent));
        fs.writeFileSync(path.join(componentDirectory, `${component}.test.js`), testContent(component));
        if (storyBook) {
            fs.writeFileSync(path.join(componentDirectory, `${component}.story.js`), storyBookContent(component));
        }
    });

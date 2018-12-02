#! /usr/bin/env node
/*
 * This script is used to inject javascript and
 * css file to the template file when running `npm run build`.
 * It injects bundled files from the 'dist/build' directory
 * into the ejs files located at 'src/client/template'.
 * After that it will move them to 'dist' directory without changing the original files.
 * Sounds complicated, right?
 */
/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const find = require('find');
const UglifyJS = require('uglify-js');
const chalk = require('chalk');
const config = require('./pre-build.config.js');

const { JSDOM } = jsdom;
const {
    srcDir,
    findDir,
    publicPath,
    tasks,
} = config;
const outDir = path.resolve(__dirname, '../', config.outDir);

/**
 * Error handler function
 * @param {string} file - The file in which the error occur.
 * @param {string} name - Name of the todo.
 * @param {...string} message - Message of the error.
 * @returns {undefined}
 */
function errorHandler(file, name, ...message) {
    console.log(chalk.bold.red(`Error at file ${file}`));
    console.log(chalk.red(`Todo: ${name}`));
    console.log.apply(null, message);
    process.exit(1);
}

/**
 * Processing the todo list of every task.
 * The todo.type is fed to determine which kind of job will be executed.
 * @param {string} file - The name of the file to be processed.
 * @param {Object} todo - The todo object.
 * @param {Object} target - The DOM element on which will be processed.
 * @param {Object} document - The document object of the file.
 * @returns {undefined}
 */
function executeTodoList(file, todo, target, document) {
    const {
        name,
        type,
        attribute,
        regex,
        tag,
        value,
    } = todo;

    switch (type) {
        case 'replace-with-content': {
            const sourceDir = path.resolve(__dirname, '../', findDir);
            const sources = find.fileSync(regex, sourceDir);
            if (sources.length !== 1) {
                errorHandler(file, name, `There's must be only 1 ${regex} file in the ${findDir} directory. But found ${sources.length}.`);
            }
            let content = fs.readFileSync(sources[0]);
            const location = document.querySelector(todo.parent.query);
            content = JSDOM.fragment(`<${tag}>${content}</${tag}>`);
            location.replaceChild(content, target);
            break;
        }

        case 'insert-hash': {
            const sourceDir = path.resolve(__dirname, '../', findDir);
            const sources = find.fileSync(regex, sourceDir);
            if (sources.length !== 1) {
                errorHandler(file, name, `There's must be only 1 ${regex} file in the ${findDir} directory. But found ${sources.length}.`);
            }
            const hashFile = sources[0].match(/^\/(.+\/)*(.+)\.(.+)$/).slice(2, 4).join('.');
            const attrValue = path.join(publicPath, hashFile);
            target.setAttribute(attribute, attrValue);
            break;
        }

        case 'alter-prop':
            target.setAttribute(attribute, value);
            break;
        default:
            errorHandler(file, name, 'Unknown todo type.');
    }
}

// Handle tasks
tasks.forEach((task) => {
    const { file, dir } = task;
    let { files } = task;
    if (file) {
        files = [file];
    }

    files.forEach((f) => {
        // Reading
        const filePath = path.resolve(srcDir, dir || '', f);
        const index = fs.readFileSync(filePath);

        // Get the DOM of the file
        const dom = new JSDOM(index.toString());
        const { document } = dom.window;

        // Insert scripts and minify them
        config.scripts.forEach((scr, i) => {
            let script = JSDOM.fragment(scr);
            const { textContent } = script;
            document.head.appendChild(script);
            if (textContent !== '') {
                script = document.querySelector('script:last-child');
                const minified = UglifyJS.minify(script.innerHTML);
                if (minified.error) {
                    errorHandler(f, 'Insert scripts', `Failed while minifying the ${i} script`, minified.error);
                }
                else {
                    script.innerHTML = minified.code;
                }
            }
        });

        // Do todo
        task.todos.forEach((todo) => {
            const { query } = todo;

            if (!query) {
                errorHandler(f, todo.name, `Query must be specified for file ${f}`);
            }

            // Find the target which matches all conditions
            const targets = Array.prototype.slice.call(document.querySelectorAll(query));

            if (targets.length !== 1) {
                errorHandler(f, todo.name, `Query must match only 1 target, but found ${targets.length}.`);
            }

            // process todo list
            executeTodoList(f, todo, targets[0], document);
        });

        // Then writing to the location
        const outputFile = path.resolve(outDir, f);
        const fileContent = dom.serialize().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        fs.writeFile(outputFile, fileContent, (err) => {
            if (err) {
                errorHandler(f, 'Write file', err.message, err.stack);
            }
            else {
                console.log(f, chalk.bold.green('[Success]'));
            }
        });
    });
});

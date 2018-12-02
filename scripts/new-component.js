#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');

program
    .version('0.0.1', '-v, --version')
    .arguments('<dir> <name>')
    .option('-c, --class', 'Class component')
    .action((directory, component, cmd) => {
        const componentDirectory = path.join(__dirname, '../src/client/app/components', directory, component);

        const indexJSContent = `export { default } from './${component}';
`;
        const componentContent = `import React from 'react';
import './${component}.sass';

${cmd.class ? `export default class ${component} extends React.Component {
    //
}
` : `export default function ${component}(props) {
    //
}
`}`;

        const dirPath = path.join(__dirname, '../src/client/app/components', directory);
        if (!fs.existsSync(dirPath)) {
            console.log(`Directory ${dirPath} does not exist.`);
            process.exit(1);
        }

        if (fs.existsSync(componentDirectory)) {
            console.log('Component already exists.');
            process.exit(1);
        }

        fs.mkdirSync(componentDirectory);
        fs.writeFileSync(path.join(componentDirectory, 'index.js'), indexJSContent);
        fs.writeFileSync(path.join(componentDirectory, `${component}.jsx`), componentContent);
        fs.writeFileSync(path.join(componentDirectory, `${component}.test.js`), '');
        fs.writeFileSync(path.join(componentDirectory, `${component}.sass`), '');
    });

program.parse(process.argv);

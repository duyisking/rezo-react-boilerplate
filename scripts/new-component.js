const fs = require('fs');
const path = require('path');

const [directory, component] = process.argv.slice(2, 4);
const componentDirectory = path.join(__dirname, '../', directory, component);

const indexJSContent = `export { default } from './${component}';
`;

const dirPath = path.join(__dirname, '../', directory);
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
fs.writeFileSync(path.join(componentDirectory, `${component}.jsx`), '');
fs.writeFileSync(path.join(componentDirectory, `${component}.test.js`), '');
fs.writeFileSync(path.join(componentDirectory, `${component}.sass`), '');

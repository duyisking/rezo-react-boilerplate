# Universal React App
A boilerplate to create Universal React Application.

## Features
- **React application + Express server** - You can build Front-end and Back-end simultaneously, perfect for Full-stack developers.
- **Hot reloading** - Your saved changes on both client and server code are reflected instantaneously.
- **High Performance** - Fast start up and build time.
- **Flexibile configurations** - Configurations allow you to greatly customize base on use case.
- **SEO supported** - With Server-side rendering, SEO is not a problem with React SPA. Sitemap and robots.txt can be included as static files.


## Installation
```
git clone https://github.com/duyisking/universal-react-app example
cd example
npm install
```

## Getting Started
To run the application, execute the command:
```
npm start
```

## Commands
- `npm start`
    - Run universal app with both client and server side running simultaneously. There are 2 modes, one do server-side rendering and one don't. By default, the non-SSR mode is chosen, you can change it by specify the environment variable SSR with the value of 'true' (e.g. `SSR=true npm start` on Linux).
    - Options:
      - `-h, --help`: output usage information.
      - `-l, --long`: Verbose stats.
    - Parameters:
      - `SSR`: server-side rendering mode.
- `npm lint`
  - Run ESLint and display report. After running, it created an HTML file inside `dist` named `lint-report.html`. You can open it in a browser to view the result.
- `npm test`
  - Run Jest test.
- `npm build`
  - Build app on production mode. This command will output compiled files and all other resources to the `dist` folder.
  - Options:
      - `-h, --help`: output usage information.
      - `-o, --open`: Automatically open bundle analyzer report in default browser.
- `npm node`
  - Run the node process of the production server. Must be called after running `build`.
- `npm new-component <path> <name>`
  - Create a new component by name at a specific path relative to components directory. The path is relative to `components` directory. For example, `npm run new-component ./Pages Landing` will create the Landing component at the `components/Pages` directory.

## Configurations
- `APP`: Specify which app to run if multiple apps are presented.
- `PORT`: The port on which the server listens upon starting the server. This port is used on both development and production mode.
- `WEBPACK_PORT`: The port used by Webpack Dev Server, used only on development mode.
- `globals`: contains all global constants which you can use inside source code.
- `babelrc`: Babel configuration for transpiling JS.

## Dist structure
The structure of a ready-for-production `dist` directory is:
- `compilation-stats.json`: contains a single hash field when built, this hash is used for cache-busting.
- `index.js`: server script which run the server.
- `index.js.map`: server script's map file, for debugging.
- `lint-report.html`: eslint report, show error and warning in code.
- `loadable-stats.json`: stats file created by `loadable-components`, used for SSR.
- `public`: contains all files which are exposed to the public when running `index.js`.
  - `build`: contains all build file, including js and css and map files.
  - `js`: contains common static JavaScript files.
- `templates`: contains EJS template files to render the HTML.
```
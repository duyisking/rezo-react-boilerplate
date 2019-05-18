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
It will automatically open the app in a default browser.

You can now start your project by editing the source code located at the `src` directory. Inside `src`, there are 2 folder `client` - code for the front-end, and `server` - code for the back-end. Based on your role, you choose which folder you will work on, or maybe both.

## Documentation

### Front-end
Client-side source code contains app. An app has an `index.js` file which is the root file for the web application, you shouldn't edit this file unless you are sure what you are doing.

The `components` folder holds most of the client-side source code that all React components reside. The root component of the React VDOM tree is App, it is import directly by `index.js`. This again should not be changed, you should write your components below this component.

Additionally, the boilerplate has [styled-component](https://www.styled-components.com/) and [react-helmet](https://github.com/nfl/react-helmet) built-in features to handle CSS styling and head tags respectively. The GlobalStyle and Head components are the two built-in components. The first one is for handling with global CSS styles, e.g. setting fonts, heading styles, html and body styles. The second is for declaring tags to render inside head tag, such as title, meta, link, script, etc.

### Commands
- `npm start`
  - Start universal app in development mode. By default, server-side rendering is disabled. But you can enable SSR either with the `-s` option or by using the `SSR` option from the configuration file.
  - Options:
    - `-h, --help`: output usage information.
    - `-l, --long`: Verbose stats.
    - `-s, --ssr`: Turn on server-side rendering.
- `npm run lint`
  - Run ESLint and display report. After running, it created an HTML file inside `dist` named `lint-report.html`. You can open it in a browser to view the result.
- `npm run test`
  - Run Jest test.
- `npm run build`
  - Build universal app on production mode. This command will output compiled files and all other resources to the `dist` folder. This command enables SSR by default but you can turn it off with the option `--no-ssr` following this command.
  - Options:
      - `-h, --help`: output usage information.
      - `-o, --open`: Automatically open bundle analyzer report in default browser.
      - `-n, --no-ssr`: Turn off server-side rendering.
- `npm run node`
  - Run the node process of the production server. Must be called after running `build`.
- `npm run new-component <path> <name>`
  - Create a new component by name at a specific path relative to components directory.
  - Parameters:
    - `path`: Required. The path relative to `components` directory.
    - `name`: Required. Name of the component.
  - For example, `npm run new-component ./Pages Landing` will create the Landing component at the `components/Pages` directory.

### Configurations
- `APP`: Specify which app to run if multiple apps are presented.
- `PORT`: The port on which the server listens upon starting the server. This port is used on both development and production mode.
- `WEBPACK_PORT`: The port used by Webpack Dev Server, used only on development mode.
- `SSR`: Indicate server-side rendering mode, used only on development mode. The `build` command does not care about this option to prevent from accidentally turning SSR off . On development mode, SSR would be enabled if either this option is `true` or by using the `-s` option.
- `globals`: contains all global constants which you can use inside source code.
- `babelrc`: Babel configuration for transpiling JS.

### Dist structure
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

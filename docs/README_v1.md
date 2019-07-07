<h1>Universal React App</h1>
A boilerplate to create Universal React Application.

## Features
- **React application + Express server** - You can build Front-end and Back-end simultaneously, perfect for Full-stack developers.
- **Hot reloading** - Your saved changes on both client and server code are reflected instantaneously.
- **High Performance** - Fast start up and build time.
- **Flexibile configurations** - Configurations allow you to greatly customize base on use case.
- **SEO supported** - With Server-side rendering, SEO is not a problem with React SPA. Sitemap and robots.txt can be included as static files.
- **Fast deployment** - With Docker, deployment is super easy. Just run `npm run build:docker`, it will containerize all production files into a single image and ready to be deployed.

## Installation
```
git clone https://github.com/duyisking/universal-react-app <your_project_name>
cd <your_project_name>
npm install
```

---
## Getting Started
To run the application, execute the command:
```
npm start
```
It will automatically open the app in a default browser.

You can now start your project by editing the source code located at the `src` directory.
Inside `src`, there are 2 directory `client` - source code of the front-end, and `server` - source code of the back-end. Based on your role, you choose which folder you will work on, or maybe both.

---
## Table of Contents
- [Documentation](#documentation)
  - [Front-end Introduction](#front-end-introduction)
  - [CLI Commands](#cli-commands)
  - [Configurations](#configurations)
  - [Dist structure](#dist-structure)
  - [Build a Docker image](#build-a-docker-image)
---

## Documentation

### Front-end Introduction
Client-side source code contains app. An app has an `index.js` file which is the root file for the web application, you shouldn't edit this file unless you are sure what you are doing.

The `components` folder holds most of the client-side source code that all React components reside. The root component of the React VDOM tree is App, it is import directly by `index.js`. This again should not be changed, you should write your components below this component.

Additionally, the boilerplate has [styled-component](https://www.styled-components.com/) and [react-helmet](https://github.com/nfl/react-helmet) built-in features to handle CSS styling and head tags respectively. The [GlobalStyle](src/app/components/GlobalStyle/GlobalStyle.jsx) and [Head](src/app/components/Head/Head.jsx) components are the two built-in components. The first one is for handling with global CSS styles, e.g. setting fonts, heading styles, html and body styles. The second is for declaring tags to render inside head tag, such as title, meta, link, script, etc.

### CLI Commands
These CLI commands will help you to do various tasks for you and you don't have to do anything else.

#### `npm start`
- Start universal app in development mode. By default, server-side rendering is disabled. But you can enable SSR either with the `-s` option or by using the `SSR` option from the configuration file.
- Options:
  - `-h, --help`: output usage information.
  - `-l, --long`: Verbose stats.
  - `-s, --ssr`: Turn on server-side rendering.

#### `npm run lint`
- Run ESLint and display report. After running, it created an HTML file inside `dist` named `lint-report.html`. You can open it in a browser to view the result.

#### `npm run test:client`
- Added in: v1.6.0
- Run Jest test on client-side. Coverage will be reported in HTML format, placed at `coverage/client` inside this repository.

#### `npm run test:server`
- Added in: v1.6.0
- Run Jest test on server-side. Coverage will be reported in HTML format, placed at `coverage/server` inside this repository.

#### `npm test`
- Run Jest test on both client-side and server-side. It run 2 command `npm run test:client` and `npm run test:server` sequentially.

#### `npm run test:open:client`
- Added in: v1.6.0
- Open client-side coverage reports in the default browser.

#### `npm run test:open:server`
- Added in: v1.6.0
- Open server-side coverage reports in the default browser.

#### `npm run test:open`
- Added in: v1.5.0
- Open client-side coverage reports in the default browser. A short version of `npm run test:open:client`!

#### `npm run test:clean:client`
- Added in: v1.6.0
- Clean client-side coverage reports. It removes `coverage/client` directory from this repository.

#### `npm run test:clean:server`
- Added in: v1.6.0
- Clean server-side coverage reports. It removes `coverage/server` directory from this repository.

#### `npm run test:clean`
- Added in: v1.5.0
- Clean coverage reports. It removes `coverage` directory from this repository.

#### `npm run build`
- Build universal app on production mode. This command will output compiled files and all other resources to the `dist` folder. This command enables SSR by default but you can choose to turn it off.

#### `npm run node`
- Run the node process of the production server. Must be called after running `build`.

#### `npm run new-component`
- Create a new component without manually creating files or copy and paste code.

#### `npm run storybook`
- Added in: v1.4.0
- Run Storybook to test individual component.

#### `npm run setup`
- Added in: v1.6.0
- Setup everything for a new project. You need to run this command after running `npm install` for the first time.

---
### Configurations
Configurations are needed for customizing your project. The file `config.js` provide various of configurations to make your project more flexible and manageable.
#### `APP`
[string]

Added in: v0.1.0.
**Removed in: v1.5.0**

Specify which app to run if multiple apps are presented. From v1.5.0, it is removed because there is only one app in a boilerplate and it is the default one.

#### `PORT`
[number]

Added in: v1.0.0

The port number on which the Node.js server listens upon startup. This port is used on both development and production mode. Although this config variable gives the server a static port number, we can still change it by setting the `PORT` environment variable.

#### `WEBPACK_PORT`
[number]

Added in: v1.0.0

The port used by Webpack Dev Server, used only on development mode.

#### `SSR`
[boolean]

Added in: v1.3.0

Indicate server-side rendering mode, used only on development mode. The [`build`](#npm-run-build) command does not care about this option to prevent accidentally turning SSR off. On development mode, SSR would be enabled if either this option is `true` or by using the `-s` option.

#### `globals`
[Object]

Added in: v1.1.0

Contains all global constants which you can use inside the source code. Before v1.1.0, it was replaced by `API_URL` which is the global URL for making AJAX requests. Since v1.1.0, `API_URL` was moved into `globals` to enable declaring more global constants.

#### `babelrc`
[Object]

Added in: v1.2.0

Babel configuration for transpiling JS. It is used to replace `.babelrc` file.

### Dist structure
The `dist` directory contains all files for deployment. It includes both client-side and server-side code. It may also contains reports for ESlint and [Bundle Analyzer Plugin](https://github.com/webpack-contrib/webpack-bundle-analyzer).
There are some important files and directories in a ready-for-production `dist` directory:
- `index.js`: Node server-side script to run the server.
- `public`: root directory for serving static files when running `index.js`.
  - `build`: contains all client-side files built from the App by Webpack.
  - `js`: contains common static JavaScript files.
- `templates`: contains EJS template files to render the HTML.

### Build a Docker image
Docker is used for containerizing all of the production assets into a single image and then deploying to the server.

To build a Docker image, you first have Docker installed on your machine or your build environment. The installation and documentation can be found [here](https://docs.docker.com/install/) and [here](https://docs.docker.com/get-started/). We recommend you to first look at these resources unless you have already used Docker.

The Docker image for our app will include all assets from the `dist` directory and `package.json`. The `package.json` is included to install all non-dev dependencies from NPM, these dependencies are necessary to run our Node.js server.

Here is a list of example CLI command to build and run our app using Docker:
```bash
# Build the app
docker build -t <tag-name> .
# Ex: docker build -t URA .

# Run the app
docker run -p <public-port>:<node-port> -d <tag-name>
# Ex: docker run -p 80:3000 -d URA
# Using environment variable
docker run -p <public-port>:<node-port> -d -e PORT=<node-port> <tag-name>
# Ex: docker run -p 443:4000 -d -e PORT=4000 URA
```
- `public-port`: port exposed to the host machine.
- `node-port`: port used by our app.
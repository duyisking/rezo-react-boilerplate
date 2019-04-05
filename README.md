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
| Script<img style="float:left" width=700/> | Description |
| --------- | ----------- |
| `start` | Run universal app with both client and server side running simultaneously. There are 2 modes, one do server-side rendering and one don't. By default, the non-SSR mode is chosen, you can change it by specify the environment variable SSR with the value of 'true' (e.g. `SSR=true npm start`). |
| `lint` | Run ESLint and display report. |
| `test` | Run Jest test. |
| `build` | Build app on production mode. This command will output compiled files and all other resources to the `dist` folder. |
| `node` | Run the node process of the production server. Must be called after running `build`. |
| `new-component <path> <name>` | Create a new component by name at a specific path relative to components directory. The path is relative to `component` directory. For example, `npm run new-component ./Pages Landing` will create the Landing component at the `component/Pages` directory. |

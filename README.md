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
| Script | Parameters | Description | 
| ------ | ---------- | ----------- |
| `start` | SSR | Run universal app with both client and server side running simultaneously. |
| `dev-client` | | Run only the client side, with the help of a dummy server. |
| `lint` | | Check linting and display report. |
| `test` | | Run Jest test. |
| `build` | | Build on production mode. |
| `node` | | Run the node process of the server. Must be called after running `build`. |
| `new-component <path> <name>` | | Create a new component by name at a specific path relative to components directory. |
## Features
- Write test for server.
- [WIP] Write Documentation
  - Node version requirement
- Integrate a sitemap generator.
- Extend config.js configuration ability.
- Find a way to handle dev and prod templates.
- Hot reload for config.js.

## Future changes
- **Simplify directory structure** - This boilerplate is for building Single Page Application (SPA), so we should have only one app. But currently, we support building multiple apps. We have spent one level of directory to specify an app by the value of `APP` in `config.js`. By default, the path to the app directory is `src/client/app`, when changing this config to another value, for example `landing`, the path to the app is `src/client/landing`. Thus, it contradicts to our goal. The path is redundant since we could have it been `src/client` instead. So, in the next version, we will fix the problem, the goal is to simplify the structure of this boilerplate.
- **Prevent confusion when resolving path in server side** - In server code, when resolving paths by `path.join` or `path.resolve` or anything relates, the context of the server code (`__dirname`) is always in `dist`. This is because when Webpack bundles the server code, it outputs to this directory and then runs the node process using that output file. But in a user perspective, `__dirname` is the directory of the current module. So this may cause misunderstanding when resolving paths if the user does not know the mechanism. The problem doesn't happen for `import` and `require` because they include files into the bundle by Webpack. To solve it, we could change option `node` in the server's Webpack configuration file.

## Bugs
- Hot restart on server-side causes the webpage to crash because requests from the client to the server (webpack dev server) is proxied to the real server, which is reloading and not reply to incoming requests. Solutions:
    1. Create a buffer to store incoming requests from webpack dev server.
    2. Use 2 instances of the server, only 1 of them run at a time. Whenever a server-side hot reload event occurs, the one running will stop and the other will start.
    3. Prevent or delay hot loading of the client-side upon hot restart on server-side.
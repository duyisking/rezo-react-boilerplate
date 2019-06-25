## Features
- [WIP] Write Documentation
  - Node version requirement
  - Code migration.
- Integrate a sitemap generator.
- Extend config.js configuration ability.
- Find a way to handle dev and prod templates.
- Hot reload for config.js.

## Future changes
- **Prevent confusion when resolving path in server side** - In server code, when resolving paths by `path.join` or `path.resolve` or anything relates, the context of the server code (`__dirname`) is always in `dist`. This is because when Webpack bundles the server code, it outputs to this directory and then runs the node process using that output file. But in a user perspective, `__dirname` is the directory of the current module. So this may cause misunderstanding when resolving paths if the user does not know the mechanism. The problem doesn't happen for `import` and `require` because they include files into the bundle by Webpack. To solve it, we could change option `node` in the server's Webpack configuration file.
- **Eliminating compilation-stats.json file from dist** - ~~The `compilation-stats.json` file serves the purpose of storing the build hash on production mode. But there is a better approach, that is using ExtendedAPIPlugin which adds useful free vars to the bundle. Inside the bundle, hash can be accessed via `__webpack_hash__` variable. This approach is much more simple than the old approach.~~ Need to find another approach.

## Bugs
- Hot restart on server-side causes the webpage to crash because requests from the client to the server (webpack dev server) is proxied to the real server, which is reloading and not reply to incoming requests. Solutions:
    1. Create a buffer to store incoming requests from webpack dev server.
    2. Use 2 instances of the server, only 1 of them run at a time. Whenever a server-side hot reload event occurs, the one running will stop and the other will start.
    3. Prevent or delay hot loading of the client-side upon hot restart on server-side.
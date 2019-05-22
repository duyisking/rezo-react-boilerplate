## Features
- Write test for server.
- [WIP] Write Documentation
  - Node version requirement
- Integrate a sitemap generator.
- Extend config.js configuration ability.
- Find a way to handle dev and prod templates.
- Hot reload for config.js.

## Future changes
- Currently, on production build, `PORT` and `SSR` environment variables are constant variables specified via Webpack's DefinePlugin. When deploying, there are situations where we need to change these variables, for example: port conflict between applications or SSR function need to be disabled because of errors. The current behavior is expected to change in version 1.4.0, where we can directly specify these environment variable after the server script is built.

## Bugs
- Hot restart on server-side causes the webpage to crash because requests from the client to the server (webpack dev server) is proxied to the real server, which is reloading and not reply to incoming requests. Solutions:
    1. Create a buffer to store incoming requests from webpack dev server.
    2. Use 2 instances of the server, only 1 of them run at a time. Whenever a server-side hot reload event occurs, the one running will stop and the other will start.
    3. Prevent or delay hot loading of the client-side upon hot restart on server-side.
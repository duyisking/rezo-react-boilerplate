## Features
- Configure Webpack to bundle CSS files.
- Write Documentation.
- Integrate Docker.
- Find a way to handle dev and prod templates.

## Bugs
- Hot restart on server-side causes the webpage to crash because requests from the client to the server (webpack dev server) is proxied to the real server, which is reloading and not reply to incoming requests. Solutions:
    1. Create a buffer to store incoming requests from webpack dev server.
    2. Use 2 instances of the server, only 1 of them run at a time. Whenever a server-side hot reload event occurs, the one running will stop and the other will start.
    3. Prevent or delay hot loading of the client-side upon hot restart on server-side.
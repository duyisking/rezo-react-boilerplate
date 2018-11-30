# Rezo
A repository created by Rezo team.
<br />
This project is based on Node.js, Webpack.js. We also use React.js, SASS and EJS but one can change to anything else by reconfiguring the webpack files.
## Install
```
git clone https://github.com/duyisking/Rezo
cd Rezo
npm install
```

## Getting Started
For Linux and MacOS users, to start developing, run:
```
npm start
```
For Windows users, run:
```
npm start-win
```
After compilation, every change on both the server and the client side will restart the process.
So you don't have to restart the server or reload the browser whenever you make some changes.
<br /><br />
- The `npm start` command is made up of 2 other commands.
One is for creating a localhost port 3000 and watch the server using Nodemon.
The other creates a localhost port 8080 to process webpack.
- Webpack creates a file named bundle.js from index.jsx (locate at /src/client).
- While in development, Webpack doesn't create a real bundle.js file, instead it creates bundle.js locates at http://localhost:3000/build. So we can point to it with the url.
- In production, we use webpack.production.config.js to make a real bundle.js so that we can add it to the network.

## Table of npm scripts
| Script | Parameters | Description | 
| ------ | ---------- | ----------- |
| `dev-client` | | Run webpack-dev-server for client side. |
| `dev-server` | `ssr` | Run webpack for server side, then run a node instance on build end. The `ssr` parameter specify whether to handle server side rendering or not. |

## Some notes
When deploying new version of a website to the hosting server, every script which is modified on development must be updated to the newest version on the client machine. Because of the cache functionality in modern browsers, we had faced difficulty on this problem. To erase this, we add a hash suffix to script and style files in all template files using pre-build.js.
<br/>
### Pre-build.js
Pre-build.js is a javascript file that I wrote to do various kind of tasks on many HTML files (can work with EJS either).
<br/>
Some of them are:
- Inserting hash suffix to src or href attribute of script or link tag.
- Replace script or link tag by its src file content.
- ... (may need more in the future).
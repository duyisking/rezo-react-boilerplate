# Rezo-react-boilerplate
A repository created by Rezo team.
<br />
Rezo's boilerplate that uses React.js, SASS, Node.js and Express.js.
## Installation
```
git clone https://github.com/duyisking/Rezo-react-boilerplate
cd Rezo-react-boilerplate
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
## Table of npm scripts
| Script | Parameters | Description | 
| ------ | ---------- | ----------- |
| `dev-client` | | Run webpack-dev-server for client side. |
| `dev-server` | `SSR` | Run webpack for server side, then run a node instance on build end. The `ssr` parameter specify whether to handle server side rendering or not. |
| `start` | | Run both `dev-client` and `dev-server` simultaneously. |
| `build` | | Build on production mode. |
| `test` | | Run test. |

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
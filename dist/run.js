#!/usr/bin/node
const path = require('path');
const { fork } = require('child_process');

fork(path.resolve(__dirname, 'index.js'));

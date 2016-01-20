"use strict";

import App from './App.es6';
let app = new App();
let server = require('http').createServer(app.handleRequest);

server.listen(3000);

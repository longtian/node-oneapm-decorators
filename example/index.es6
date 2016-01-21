"use strict";

import App from './App.es6';
import {createServer} from 'http';
let app = new App();
let server = createServer(app.handleRequest);

server.listen(3000);

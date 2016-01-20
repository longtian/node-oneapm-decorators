"use strict";
import {count} from '../';

/**
 * Created by yan on 16-1-20.
 */

class App {
  @count
  handleRequest(req, res) {
    res.end('ok');
  }
}

let app = new App();
let server = require('http').createServer(app.handleRequest);

server.listen(3000);

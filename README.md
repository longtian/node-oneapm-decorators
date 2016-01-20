# node-oneapm-decorators
ES7 decorators that can be used in your app to track performance

This is currently an idea only.

## Usage

### Original Code

```js
import App from './App.es6';
let app = new App();
let server = require('http').createServer(app.handleRequest);
server.listen(3000);
```

```js
export default class App {
  handleRequest(req, res) {
    res.end('ok');
  }
}
```

### App with APM Decorators

```js
import {count,url,useragent} from '../';

export default class App {
  @headers
  @url
  @useragent
  handleRequest(req, res) {
    res.end('ok');
  }
}
```

After being restarted, the server will begin to dump logs to console on each request.

```
handleRequest is called
url = /
user-agent = Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/47.0.2526.106 Chrome/47.0.2526.106 Safari/537.36
```

## How to run the demo

```sh
git clone git@github.com:wyvernnot/node-oneapm-decorators.git
cd node-oneapm-decorators
npm install
npm start
```


# node-oneapm-decorators
ES7 decorators that can be used in your app to track performance

This is currently an idea only.

## Usage

```js
import {count,headers} from '../';

class App {

  @headers
  @count
  handleRequest(req, res) {
    res.end('ok');
  }
}
```

```js
import App from './App.es6';
let app = new App();
let server = require('http').createServer(app.handleRequest);
server.listen(3000);
```

## How to run the demo

```sh
git clone git@github.com:wyvernnot/node-oneapm-decorators.git
cd node-oneapm-decorators
npm install
npm run-script compile
npm run-script example
```


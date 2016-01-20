# node-oneapm-decorators
ES7 decorators that can be used in your app to track performance

This is currently an idea only.

## Usage

```
import {count} from 'oneapm-decorators';
```

```js
class App {

  @headers
  @count
  handleRequest(req, res) {
    res.end('ok');
  }
}
```

## How to run the demo

```
git clone
npm install
npm run-script compile
npm run-script example
```


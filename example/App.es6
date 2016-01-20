import {count,headers} from '../';

export default class App {
  @headers
  @count
  handleRequest(req, res) {
    res.end('ok');
  }
}
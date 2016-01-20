import {count,url,useragent} from '../';

export default class App {
  @count
  @url
  @useragent
  handleRequest(req, res) {
    res.end('ok');
  }
}
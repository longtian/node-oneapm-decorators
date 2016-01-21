import {count,url,useragent,influxdb} from '../';

import {createReadStream} from 'fs';

import path from 'path';

export default class App {
  @count
  @url
  @useragent
  @influxdb
  handleRequest(req, res) {
    createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  }
}
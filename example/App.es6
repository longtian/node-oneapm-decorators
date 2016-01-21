import {count,url,useragent,influxdb} from '../';

import {createReadStream} from 'fs';

import path from 'path';

export default class App {
  @influxdb({
    host: 'influxdb-longtian.myalauda.cn',
    port: 11431
  })
  handleRequest(req, res) {
    createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  }
}
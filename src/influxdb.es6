/**
 * Created by yan on 16-1-21.
 */
const now = ()=> {
  let [a,b] = process.hrtime();
  return a * 1E3 + b / 1E6;
}

let data = [];

const flush = ()=> {
  var request = require('http').request({
    hostname: 'influxdb-longtian.myalauda.cn',
    port: 11431,
    method: 'POST',
    path: '/write?db=oneapm'
  });
  console.log(`writing to influxdb :${data.length}`);
  request.write(data.join("\n"));
  request.end();
  data = [];
}

setInterval(flush, 5000);

const line = (line)=> {
  data.push(line + ' ' + Date.now() + '000000');
}

export default function (type, method, desc) {
  var old = desc.value;
  desc.value = function (req, res) {
    var begin = now();
    res.once('finish', function () {
      line(`backend value=${now() - begin}`);
    });
    return old.apply(this, arguments);
  }
}

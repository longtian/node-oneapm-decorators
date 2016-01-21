/**
 * Created by yan on 16-1-21.
 */
const now = ()=> {
  let [a,b] = process.hrtime();
  return a * 1E3 + b / 1E6;
}

let options = {
  host: '127.0.0.1',
  port: 8086,
  method: 'POST',
  path: '/write?db=oneapm'
}

let data = [];
let timer;

const flush = ()=> {
  if (data.length) {
    console.log(`writing to influxdb :${data.length}`);

    var request = require('http').request(options);
    request.write(data.join("\n"));
    request.end();
    request.on('error', function (err) {
      console.error(err)
    })
    data = [];

  } else {
    console.log('skiping flush to influxdb');
  }
}


const line = (line)=> {
  data.push(line + ' ' + Date.now() + '000000');
}

const handler = function (type, method, desc) {
  if (arguments.length == 3) {
    if (!timer) {
      timer = setInterval(flush, 5000);
    }

    var old = desc.value;
    desc.value = function (req, res) {
      var begin = now();
      res.once('finish', function () {
        line(`backend,url=${req.url} value=${now() - begin}`);
      });
      return old.apply(this, arguments);
    }
  } else {
    Object.assign(options, type)
    return handler;
  }
}

export default handler;
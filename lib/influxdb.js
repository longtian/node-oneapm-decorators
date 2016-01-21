'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by yan on 16-1-21.
 */
var now = function now() {
  var _process$hrtime = process.hrtime();

  var _process$hrtime2 = _slicedToArray(_process$hrtime, 2);

  var a = _process$hrtime2[0];
  var b = _process$hrtime2[1];

  return a * 1E3 + b / 1E6;
};

var options = {
  host: '127.0.0.1',
  port: 8086,
  method: 'POST',
  path: '/write?db=oneapm'
};

var data = [];
var timer = undefined;

var flush = function flush() {
  if (data.length) {
    console.log('writing to influxdb :' + data.length);

    var request = require('http').request(options);
    request.write(data.join("\n"));
    request.end();
    request.on('error', function (err) {
      console.error(err);
    });
    data = [];
  } else {
    console.log('skiping flush to influxdb');
  }
};

var line = function line(_line) {
  data.push(_line + ' ' + Date.now() + '000000');
};

var handler = function handler(type, method, desc) {
  if (arguments.length == 3) {
    if (!timer) {
      timer = setInterval(flush, 5000);
    }

    var old = desc.value;
    desc.value = function (req, res) {
      var begin = now();
      res.once('finish', function () {
        line('backend,url=' + req.url + ' value=' + (now() - begin));
      });
      return old.apply(this, arguments);
    };
  } else {
    Object.assign(options, type);
    return handler;
  }
};

exports.default = handler;
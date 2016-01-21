'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (type, method, desc) {
  var old = desc.value;
  desc.value = function (req, res) {
    var begin = now();
    res.once('finish', function () {
      line('backend value=' + (now() - begin));
    });
    return old.apply(this, arguments);
  };
};

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

var data = [];

var flush = function flush() {
  var request = require('http').request({
    hostname: 'influxdb-longtian.myalauda.cn',
    port: 11431,
    method: 'POST',
    path: '/write?db=oneapm'
  });
  console.log('writing to influxdb :' + data.length);
  request.write(data.join("\n"));
  request.end();
  data = [];
};

setInterval(flush, 5000);

var line = function line(_line) {
  data.push(_line + ' ' + Date.now() + '000000');
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (type, method, desc) {
  var old = desc.value;
  desc.value = function () {
    if (arguments[0].headers) {
      console.log(arguments[0].headers['user-agent']);
    }
    return old.apply(this, arguments);
  };
};
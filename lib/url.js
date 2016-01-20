"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (type, method, desc) {
  var old = desc.value;
  desc.value = function () {
    if (arguments[0].headers) {
      console.log("url = " + arguments[0].url);
    }
    return old.apply(this, arguments);
  };
};
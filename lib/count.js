"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (type, method, desc) {
  var old = desc.value;
  desc.value = function () {
    console.log(method + " is called");
    return old.apply(this, arguments);
  };
};
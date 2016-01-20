'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (type, method, desc) {
    var old = desc.value;
    desc.value = function () {
        console.log('counting');
        return old.apply(this, arguments);
    };
};
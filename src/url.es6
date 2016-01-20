/**
 * Created by yan on 16-1-20.
 */
export default function (type, method, desc) {
  var old = desc.value;
  desc.value = function () {
    if (arguments[0].headers) {
      console.log(`url = ${arguments[0].url}`);
    }
    return old.apply(this, arguments);
  }
}
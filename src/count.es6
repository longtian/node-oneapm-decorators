/**
 * Created by yan on 16-1-20.
 */
export default function (type, method, desc) {
    var old = desc.value;
    desc.value = function () {
        console.log('counting');
        return old.apply(this, arguments);
    }
}
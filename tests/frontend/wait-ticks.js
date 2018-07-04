
module.exports = function waitTicks(Vue, ticks) {
    let func = Vue.nextTick ? 'nextTick' : '$nextTick';
    let promise = Vue[func]()
    for (let i = 1; i < ticks; i++) {
        promise = promise.then(() => Vue[func]());
    }
    return promise;
};

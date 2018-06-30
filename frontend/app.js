
window.Vue = require('vue');

Vue.component('app', require('./App.vue').default);

new Vue({
    el: '#app',
});

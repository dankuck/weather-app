
window.Vue = require('vue');

Vue.component('app', require('./App.vue').default);
Vue.component('search', require('./Search.vue').default);

new Vue({
    el: '#app',
});

require('./bootstrap');

window.Vue = require('vue');
BootstrapVue = require('bootstrap-vue');

Vue.use(BootstrapVue);

Vue.component('example', require('./components/Example.vue'));

const app = new Vue({
    el: '#app'
});

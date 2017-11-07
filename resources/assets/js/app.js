require('./bootstrap');

window.Vue = require('vue');
BootstrapVue = require('bootstrap-vue');

Vue.use(BootstrapVue);

Vue.component('account-stats', require('./components/account/Stats.vue'));

const app = new Vue({
    el: '#app'
});

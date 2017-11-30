require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import router from './routes'
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.component('account-stats', require('./components/account/Stats.vue'));
Vue.component('line-chart', require('./components/charts/LineChart.vue'));

const app = new Vue({
    router,
}).$mount('#app');

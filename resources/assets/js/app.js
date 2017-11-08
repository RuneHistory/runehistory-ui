require('./bootstrap');

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import page from 'page'
import routes from './routes'

Vue.use(BootstrapVue);
Vue.component('account-stats', require('./components/account/Stats.vue'));
Vue.component('v-link', require('./components/VLink.vue'));

const app = new Vue({
    el: '#app',
    data: {
        ViewComponent: { render: h => h('div', 'loading...') }
    },
    render (h) { return h(this.ViewComponent) }
});

Object.keys(routes).forEach(route => {
    const targetRoute = routes[route];
    const Component = require('./pages/' + targetRoute + '.vue');
    page(route, () => app.ViewComponent = Component);
});
page('*', () => app.ViewComponent = require('./pages/404.vue'));
page();

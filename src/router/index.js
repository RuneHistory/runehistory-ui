import Vue from 'vue';
import Router from 'vue-router';
import Search from '../components/track/Search';
import Dashboard from '../components/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'dashboard' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/track',
      name: 'search',
      component: Search,
    },
  ],
});

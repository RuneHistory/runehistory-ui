import Vue from 'vue';
import Router from 'vue-router';
import TrackXp from '../components/TrackXp';
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
      name: 'track',
      component: TrackXp,
    },
  ],
});

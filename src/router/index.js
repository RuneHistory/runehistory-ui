import Vue from 'vue';
import Router from 'vue-router';
import TrackXp from '../components/TrackXp';
import Dashboard from '../components/Dashboard';
import LandingPage from '../components/LandingPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/router',
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

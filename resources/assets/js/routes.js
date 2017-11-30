import VueRouter from 'vue-router'

import Home from './pages/Home.vue'
import Stats from './pages/account/Stats.vue'
import About from './pages/About.vue'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/account', name: 'account', component: Stats },
    { path: '/about', name: 'about', component: About },
];

const router = new VueRouter({
    routes
});

export default router;

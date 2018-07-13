// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import Meta from 'vue-meta'
import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify)
Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

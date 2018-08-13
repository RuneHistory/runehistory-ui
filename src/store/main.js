import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import router from '../router/index'
import dashboard from './dashboard'
import track from './track/main'

Vue.use(Vuex)

const store = new Vuex.Store({
  mutations: {
  },
  actions: {
  },
  modules: {
    dashboard,
    track,
  },
})

sync(store, router)

export default store

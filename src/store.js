import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import rh from './client'
import router from './router'
import { createMutation, doAsync } from './async-util'

Vue.use(Vuex)

const types = {
  GET_ACCOUNT: createMutation('GET_ACCOUNT'),
}

const store = new Vuex.Store({
  state: {},
  mutations: {
    [types.GET_ACCOUNT.SUCCESS](state, data) {
      Vue.set(state, types.GET_ACCOUNT.loadingKey, false)
      Vue.set(state, types.GET_ACCOUNT.stateKey, data)
    },
    [types.GET_ACCOUNT.PENDING](state) {
      Vue.set(state, types.GET_ACCOUNT.loadingKey, true)
    },
    [types.GET_ACCOUNT.FAILURE](state) {
      Vue.set(state, types.GET_ACCOUNT.loadingKey, false)
      Vue.set(state, types.GET_ACCOUNT.stateKey, null)
    },
  },
  actions: {
    getAccount(s) {
      if (s.state[types.GET_ACCOUNT.loadingKey]) {
        return
      }
      doAsync(s, {
        promise: rh.accounts().getAccount(s.state.route.params.slug).then(),
        mutationTypes: types.GET_ACCOUNT,
      })
    },
  },
  getters: {},
})

sync(store, router)

export default store

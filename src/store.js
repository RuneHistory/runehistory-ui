import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import rh from './client'
import router from './router'
import { createMutation, doAsync } from './async-util'

Vue.use(Vuex)

const types = {
  GET_ACCOUNT: createMutation('GET_ACCOUNT'),
  GET_ACCOUNT_COUNT: createMutation('GET_ACCOUNT_COUNT'),
  GET_HIGH_SCORE_COUNT: createMutation('GET_HIGH_SCORE_COUNT'),
}

const store = new Vuex.Store({
  state: {},
  mutations: {
    // GET_ACCOUNT
    [types.GET_ACCOUNT.SUCCESS](state, data) {
      Vue.set(state, types.GET_ACCOUNT.loadingKey, false)
      Vue.set(state, types.GET_ACCOUNT.stateKey, data)
    },
    [types.GET_ACCOUNT.PENDING](state) {
      Vue.set(state, types.GET_ACCOUNT.loadingKey, true)
      Vue.set(state, types.GET_ACCOUNT.errorKey, false)
    },
    [types.GET_ACCOUNT.FAILURE](state) {
      Vue.set(state, types.GET_ACCOUNT.loadingKey, false)
      Vue.set(state, types.GET_ACCOUNT.stateKey, null)
      Vue.set(state, types.GET_ACCOUNT.errorKey, true)
    },
    // GET_ACCOUNT_COUNT
    [types.GET_ACCOUNT_COUNT.SUCCESS](state, data) {
      Vue.set(state, types.GET_ACCOUNT_COUNT.loadingKey, false)
      Vue.set(state, types.GET_ACCOUNT_COUNT.stateKey, data)
    },
    [types.GET_ACCOUNT_COUNT.PENDING](state) {
      Vue.set(state, types.GET_ACCOUNT_COUNT.loadingKey, true)
      Vue.set(state, types.GET_ACCOUNT_COUNT.errorKey, false)
    },
    [types.GET_ACCOUNT_COUNT.FAILURE](state) {
      Vue.set(state, types.GET_ACCOUNT_COUNT.loadingKey, false)
      Vue.set(state, types.GET_ACCOUNT_COUNT.stateKey, null)
      Vue.set(state, types.GET_ACCOUNT_COUNT.errorKey, true)
    },
    // GET_HIGH_SCORE_COUNT
    [types.GET_HIGH_SCORE_COUNT.SUCCESS](state, data) {
      Vue.set(state, types.GET_HIGH_SCORE_COUNT.loadingKey, false)
      Vue.set(state, types.GET_HIGH_SCORE_COUNT.stateKey, data)
    },
    [types.GET_HIGH_SCORE_COUNT.PENDING](state) {
      Vue.set(state, types.GET_HIGH_SCORE_COUNT.loadingKey, true)
      Vue.set(state, types.GET_HIGH_SCORE_COUNT.errorKey, false)
    },
    [types.GET_HIGH_SCORE_COUNT.FAILURE](state) {
      Vue.set(state, types.GET_HIGH_SCORE_COUNT.loadingKey, false)
      Vue.set(state, types.GET_HIGH_SCORE_COUNT.stateKey, null)
      Vue.set(state, types.GET_HIGH_SCORE_COUNT.errorKey, true)
    },
  },
  actions: {
    getAccount(s) {
      if (s.state[types.GET_ACCOUNT.loadingKey]) {
        return
      }
      doAsync(s, {
        promise: rh.accounts().getAccount(s.state.route.params.slug),
        mutationTypes: types.GET_ACCOUNT,
      })
    },
    getAccountCount(s) {
      if (s.state[types.GET_ACCOUNT_COUNT.loadingKey]) {
        return
      }
      doAsync(s, {
        promise: rh.stats().count_accounts(),
        mutationTypes: types.GET_ACCOUNT_COUNT,
      })
    },
    getHighScoreCount(s) {
      if (s.state[types.GET_HIGH_SCORE_COUNT.loadingKey]) {
        return
      }
      doAsync(s, {
        promise: rh.stats().count_highscores(),
        mutationTypes: types.GET_HIGH_SCORE_COUNT,
      })
    },
  },
  getters: {},
})

sync(store, router)

export default store

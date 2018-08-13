import Vue from 'vue'
import rh from '../client'
import { createMutation, doAsync } from '../async-util'
import { numberWithCommas } from '../util'


const types = {
  GET_ACCOUNT_COUNT: createMutation('GET_ACCOUNT_COUNT'),
  GET_HIGH_SCORE_COUNT: createMutation('GET_HIGH_SCORE_COUNT'),
}

const store = {
  namespaced: true,
  mutations: {
    // GET_ACCOUNT_COUNT
    [types.GET_ACCOUNT_COUNT.SUCCESS](state, data) {
      Vue.set(state, types.GET_ACCOUNT_COUNT.loadingKey, false)
      Vue.set(state, types.GET_ACCOUNT_COUNT.stateKey, numberWithCommas(data))
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
      Vue.set(state, types.GET_HIGH_SCORE_COUNT.stateKey, numberWithCommas(data))
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
}

export default store

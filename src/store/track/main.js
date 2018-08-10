import Vue from 'vue'
import { createMutation, doAsync } from '../../async-util'
import skillOverTime from './skill-over-time'
import latestHighScore from './latest-highscore'
import { getAccount, getOrCreateAccount } from '../../app/account'


const types = {
  GET_ACCOUNT: createMutation('GET_ACCOUNT'),
  GET_OR_CREATE_ACCOUNT: createMutation('GET_OR_CREATE_ACCOUNT'),
}

let getAccountPromise = null

const store = {
  namespaced: true,
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
  },
  actions: {
    getAccount(s, slug) {
      if (s.state[types.GET_ACCOUNT.loadingKey]) {
        return getAccountPromise
      }
      getAccountPromise = doAsync(s, {
        promise: getAccount(slug),
        mutationTypes: types.GET_ACCOUNT,
      })
      return getAccountPromise
    },
    getOrCreateAccount(s, username) {
      if (s.state[types.GET_ACCOUNT.loadingKey]) {
        return getAccountPromise
      }
      getAccountPromise = doAsync(s, {
        promise: getOrCreateAccount(username),
        mutationTypes: types.GET_ACCOUNT,
      })
      return getAccountPromise
    },
  },
  modules: {
    skillOverTime,
    latestHighScore,
  },
}

export default store

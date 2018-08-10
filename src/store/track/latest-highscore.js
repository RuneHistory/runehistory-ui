import Vue from 'vue'
import { createMutation, doAsync } from '../../async-util'
import { getLatestHighScore } from '../../app/highscore'


const types = {
  GET_LATEST_HIGH_SCORE: createMutation('GET_LATEST_HIGH_SCORE'),
}

const store = {
  namespaced: true,
  mutations: {
    // GET_LATEST_HIGH_SCORE
    [types.GET_LATEST_HIGH_SCORE.SUCCESS](state, data) {
      Vue.set(state, types.GET_LATEST_HIGH_SCORE.loadingKey, false)
      Vue.set(state, types.GET_LATEST_HIGH_SCORE.stateKey, data)
    },
    [types.GET_LATEST_HIGH_SCORE.PENDING](state) {
      Vue.set(state, types.GET_LATEST_HIGH_SCORE.loadingKey, true)
      Vue.set(state, types.GET_LATEST_HIGH_SCORE.errorKey, false)
    },
    [types.GET_LATEST_HIGH_SCORE.FAILURE](state) {
      Vue.set(state, types.GET_LATEST_HIGH_SCORE.loadingKey, false)
      Vue.set(state, types.GET_LATEST_HIGH_SCORE.stateKey, null)
      Vue.set(state, types.GET_LATEST_HIGH_SCORE.errorKey, true)
    },
  },
  actions: {
    getLatestHighScore(s, payload) {
      if (s.state[types.GET_LATEST_HIGH_SCORE.loadingKey]) {
        return
      }
      doAsync(s, {
        promise: getLatestHighScore(payload.slug),
        mutationTypes: types.GET_LATEST_HIGH_SCORE,
      })
    },
  },
}

export default store

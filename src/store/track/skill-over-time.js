import Vue from 'vue'
import moment from 'moment'
import rh from '../../client'
import { createMutation, doAsync } from '../../async-util'
import {
  skillXpChartData,
  skillLevelChartData,
  skillRankChartData,
} from '../../app/charts/skill-over-time'


const types = {
  GET_SKILL_OVER_TIME: createMutation('GET_SKILL_OVER_TIME'),
}

let getSkillOverTimePromise = null

const store = {
  namespaced: true,
  mutations: {
    // GET_SKILL_OVER_TIME
    [types.GET_SKILL_OVER_TIME.SUCCESS](state, data) {
      Vue.set(state, types.GET_SKILL_OVER_TIME.loadingKey, false)
      Vue.set(state, types.GET_SKILL_OVER_TIME.stateKey, data)
    },
    [types.GET_SKILL_OVER_TIME.PENDING](state) {
      Vue.set(state, types.GET_SKILL_OVER_TIME.loadingKey, true)
      Vue.set(state, types.GET_SKILL_OVER_TIME.errorKey, false)
    },
    [types.GET_SKILL_OVER_TIME.FAILURE](state) {
      Vue.set(state, types.GET_SKILL_OVER_TIME.loadingKey, false)
      Vue.set(state, types.GET_SKILL_OVER_TIME.stateKey, null)
      Vue.set(state, types.GET_SKILL_OVER_TIME.errorKey, true)
    },
    // Date range
    timePeriod(state, period) {
      Vue.set(state, 'timePeriod', period)
      // this.dispatch('setDateRange')
    },
    dateRange(state, range) {
      Vue.set(state, 'dateRange', range)
    },
    // Chart data
    buildXpChartData(state, skill) {
      const highScores = state[types.GET_SKILL_OVER_TIME.stateKey]
      const chartData = skillXpChartData(highScores, skill, true)
      Vue.set(state, 'xpChartData', null)
      Vue.set(state, 'xpChartData', chartData)
    },
    buildLevelChartData(state, skill) {
      const highScores = state[types.GET_SKILL_OVER_TIME.stateKey]
      Vue.set(state, 'levelChartData', null)
      Vue.set(state, 'levelChartData', skillLevelChartData(highScores, skill, true))
    },
    buildRankChartData(state, skill) {
      const highScores = state[types.GET_SKILL_OVER_TIME.stateKey]
      Vue.set(state, 'rankChartData', null)
      Vue.set(state, 'rankChartData', skillRankChartData(highScores, skill, true))
    },
  },

  actions: {
    getSkillOverTime(s, payload) {
      const skills = [payload.skill]
      if (s.state[types.GET_SKILL_OVER_TIME.loadingKey]) {
        return getSkillOverTimePromise
      }
      getSkillOverTimePromise = doAsync(s, {
        promise: rh.accounts().highScores(payload.slug).getHighScores(
          payload.dateRange.from,
          payload.dateRange.to,
          skills,
        ),
        mutationTypes: types.GET_SKILL_OVER_TIME,
      }).then((d) => {
        s.commit('buildXpChartData', payload.skill)
        s.commit('buildLevelChartData', payload.skill)
        s.commit('buildRankChartData', payload.skill)
        return d
      })
      return getSkillOverTimePromise
    },
    setTimePeriod(s, timePeriod) {
      s.commit('timePeriod', timePeriod)
      s.dispatch('setDateRange')
    },
    setDateRange(s) {
      s.commit('dateRange', {
        from: moment.utc().subtract(1, s.state.timePeriod).format(),
        to: moment.utc().format(),
      })
    },
  },

}

export default store

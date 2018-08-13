import moment from 'moment'
import { upperFirst } from '../../util'


export const timePeriods = ['hour', 'day', 'week', 'month', 'year']

export const useDataPoint = (current, prev, next, optimiseDataPoints = true) => {
  if (!optimiseDataPoints) {
    return true
  }
  if (prev === null || prev !== current) {
    return true
  }
  if (next === null || next !== current) {
    return true
  }
  return false
}

export const skillDataPoints = (highScores, skill, item, optimiseDataPoints = true) => {
  const dataPoints = []

  highScores.forEach((record, i) => {
    let previousRecord = null
    let nextRecord = null

    if (i > 0) {
      previousRecord = highScores[i - 1]
    }
    if (i < highScores.length - 1) {
      nextRecord = highScores[i + 1]
    }
    Object.keys(record.skills).forEach((s) => {
      const current = record.skills[s][item]
      let prev = null
      let next = null
      if (s !== skill) {
        return
      }
      if (previousRecord) {
        prev = previousRecord.skills[s][item]
      }
      if (nextRecord) {
        next = nextRecord.skills[s][item]
      }
      if (!useDataPoint(current, prev, next, optimiseDataPoints)) {
        return
      }

      dataPoints.push({
        x: moment(record.created_at).toDate(),
        y: record.skills[s][item],
      })
    })
  })

  return {
    datasets: [{
      label: upperFirst(skill),
      backgroundColor: '#889df8',
      borderColor: '#889df8',
      fill: false,
      data: dataPoints,
    }],
  }
}

export const skillXpChartData = (highScores, skill, optimiseDataPoints) => skillDataPoints(highScores, skill, 'experience', optimiseDataPoints)
export const skillLevelChartData = (highScores, skill, optimiseDataPoints) => skillDataPoints(highScores, skill, 'level', optimiseDataPoints)
export const skillRankChartData = (highScores, skill, optimiseDataPoints) => skillDataPoints(highScores, skill, 'rank', optimiseDataPoints)

<template>
  <v-flex xs12>
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Skill over time</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12 sm6>
            <v-select
              :items="skillsSelect"
              v-model="skill"
              label="Skill"
              single-line
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6>
            <v-checkbox
              label="Optimise"
              v-model="optimiseDataPoints"
            ></v-checkbox>
          </v-flex>

          <v-flex xs12 v-if="!skillXpChartData">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-flex>

          <v-flex xs12 v-if="skillXpChartData">
            <time-series-chart :chart-data="skillXpChartData"
                               :title="this.UCFirst(this.skill) + ' XP'"
                               label="XP"></time-series-chart>
          </v-flex>

          <v-flex xs12 v-if="!skillLevelChartData">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-flex>

          <v-flex xs12 v-if="skillLevelChartData">
            <time-series-chart :chart-data="skillLevelChartData"
                               :title="this.UCFirst(this.skill) + ' level'"
                               label="Level"></time-series-chart>
          </v-flex>

          <v-flex xs12 v-if="!skillRankChartData">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-flex>

          <v-flex xs12 v-if="skillRankChartData">
            <time-series-chart :chart-data="skillRankChartData"
                               :title="this.UCFirst(this.skill) + ' rank'"
                               label="Rank"></time-series-chart>
          </v-flex>

        </v-layout>

      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
  import moment from 'moment'
  import rh from '../../client'
  import TimeSeriesChart from './charts/TimeSeriesChart'
  import { skills } from '../../skills'

  export default {
    props: ['account'],
    data() {
      return {
        highScores: null,
        skills,
        skill: 'overall',
        optimiseDataPoints: true,
      }
    },
    computed: {
      skillsSelect() {
        return this.skills.map(skill => ({
          text: this.UCFirst(skill),
          value: skill,
        }))
      },
      skillXpChartData() {
        return this.skillDataPoints('experience')
      },
      skillLevelChartData() {
        return this.skillDataPoints('level')
      },
      skillRankChartData() {
        return this.skillDataPoints('rank')
      },
    },
    watch: {
      account(account) {
        if (!account) {
          return
        }
        this.loadHighScores(account.slug, this.skill)
      },
      skill(skill) {
        if (!this.account) {
          return
        }
        this.loadHighScores(this.account.slug, skill)
      },
    },
    methods: {
      loadHighScores(slug, skill) {
        return rh.accounts().highScores(slug).getHighScores(null, null, [skill])
          .then((highScores) => {
            this.highScores = highScores
            return highScores
          })
          .catch((err) => {
            this.highScores = null
            throw err
          })
      },
      /**
       * @return {string}
       */
      UCFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      },
      useDataPoint(current, prev, next) {
        if (!this.optimiseDataPoints) {
          return true
        }
        if (prev === null || prev !== current) {
          return true
        }
        if (next === null || next !== current) {
          return true
        }
        return false
      },
      skillDataPoints(item) {
        const dataPoints = []

        if (!this.highScores) {
          return null
        }

        this.highScores.forEach((record, i) => {
          let previousRecord = null
          let nextRecord = null

          if (i > 0) {
            previousRecord = this.highScores[i - 1]
          }
          if (i < this.highScores.length - 1) {
            nextRecord = this.highScores[i + 1]
          }
          Object.keys(record.skills).forEach((skill) => {
            const current = record.skills[skill][item]
            let prev = null
            let next = null
            if (skill !== this.skill) {
              return
            }
            if (previousRecord) {
              prev = previousRecord.skills[skill][item]
            }
            if (nextRecord) {
              next = nextRecord.skills[skill][item]
            }
            if (!this.useDataPoint(current, prev, next)) {
              return
            }

            dataPoints.push({
              x: moment(record.created_at).toDate(),
              y: record.skills[skill][item],
            })
          })
        })

        return {
          datasets: [{
            label: this.UCFirst(this.skill),
            backgroundColor: '#889df8',
            borderColor: '#889df8',
            fill: false,
            data: dataPoints,
          }],
        }
      },
    },
    components: {
      TimeSeriesChart,
    },
  }
</script>

<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Skill over time</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-layout v-if="error">
        <v-flex xs12>
          <v-alert
            :value="error"
            color="error"
            icon="warning"
            outline
          >
            Oops... Something went wrong
          </v-alert>
        </v-flex>
      </v-layout>

      <v-layout v-if="pending">
        <v-flex xs12>
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
      </v-layout>

      <v-layout wrap v-if="!pending && account">
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

        <v-flex xs12 v-if="!skillXpChartData && !highScoresError">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>

        <v-flex xs12 v-if="skillXpChartData">
          <time-series-chart :chart-data="skillXpChartData"
                             :title="upperFirst(this.skill) + ' XP'"
                             label="XP"></time-series-chart>
        </v-flex>

        <v-flex xs12 v-if="!skillLevelChartData && !highScoresError">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>

        <v-flex xs12 v-if="skillLevelChartData">
          <time-series-chart :chart-data="skillLevelChartData"
                             :title="upperFirst(this.skill) + ' level'"
                             label="Level"></time-series-chart>
        </v-flex>

        <v-flex xs12 v-if="!skillRankChartData && !highScoresError">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>

        <v-flex xs12 v-if="skillRankChartData">
          <time-series-chart :chart-data="skillRankChartData"
                             :title="upperFirst(this.skill) + ' rank'"
                             label="Rank"></time-series-chart>
        </v-flex>

      </v-layout>

    </v-container>
  </v-card>
</template>

<script>
  import moment from 'moment'
  import rh from '../../../client'
  import TimeSeriesChart from '../charts/TimeSeriesChart'
  import { skills } from '../../../skills'
  import { upperFirst } from '../../../util'

  export default {
    data() {
      return {
        highScores: null,
        highScoresError: false,
        skills,
        skill: 'overall',
        optimiseDataPoints: true,
      }
    },
    computed: {
      account() {
        return this.$store.state.getAccountData
      },
      pending() {
        return this.$store.state.getAccountPending
      },
      error() {
        return this.$store.state.getAccountError || this.highScoresError
      },
      skillsSelect() {
        return this.skills.map(skill => ({
          text: upperFirst(skill),
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
      upperFirst,
      loadHighScores(slug, skill) {
        this.highScoresError = false
        return rh.accounts().highScores(slug).getHighScores(null, null, [skill])
          .then((highScores) => {
            this.highScores = highScores
            return highScores
          })
          .catch(() => {
            this.highScores = null
            this.highScoresError = true
          })
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
            label: upperFirst(this.skill),
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

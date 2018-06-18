<template>
  <v-container fluid grid-list-lg>
    <v-layout flex wrap>

      <v-flex xs12 v-if="!account">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Loading Account</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fluid>
            <v-layout>
              <v-flex xs12>
                <v-progress-linear :indeterminate="true"></v-progress-linear>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12 v-if="account">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ account.nickname }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fluid>
            <v-layout v-if="account">
              <v-flex xs12>
                <p>
                  We started tracking {{ account.nickname }} at {{ account.created_at }}, and the
                  most recent run was at
                  {{ account.last_run_at || '[never]' }}. {{ account.nickname }} hasn't been updated
                  for {{
                  account.runs_unchanged }}
                  runs.
                </p>
                <p v-if="!account.last_run_at">
                  {{ account.nickname }} will be tracked in the next scheduled run.
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ UCFirst(skill) }}</v-toolbar-title>
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

    </v-layout>
  </v-container>
</template>

<script>
  import moment from 'moment'
  import Client from 'runehistoryjs'
  import LineChart from './charts/LineChart'
  import TimeSeriesChart from './charts/TimeSeriesChart'

  export default {
    created() {
      this.rh = new Client('rh-cli', 'test', 'test_secret', 'http://127.0.0.1:5000')
      this.loadAccount(this.slug)
    },
    data() {
      return {
        account: null,
        highScores: null,
        skills: ['overall', 'attack', 'defence', 'strength', 'hitpoints',
          'ranged', 'prayer', 'magic', 'cooking', 'woodcutting',
          'fletching', 'fishing', 'firemaking', 'crafting', 'smithing',
          'mining', 'herblore', 'agility', 'theiving', 'slayer',
          'farming', 'hunter'],
        skill: 'overall',
        optimiseDataPoints: true,
      }
    },
    computed: {
      slug() {
        return this.$route.params.slug
      },
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
      slug(slug) {
        if (!slug) {
          return
        }
        this.loadAccount(slug)
      },
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
      loadAccount(slug) {
        return this.rh.accounts().getAccount(slug)
          .then((account) => {
            this.account = account
            return account
          })
          .catch((err) => {
            this.account = null
            throw err
          })
      },
      loadHighScores(slug, skill) {
        return this.rh.accounts().highScores(slug).getHighScores(null, null, [skill])
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
      LineChart,
    },
  }
</script>

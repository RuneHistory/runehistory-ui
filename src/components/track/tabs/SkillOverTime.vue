<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
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

          <v-layout v-if="accountPending">
            <v-flex xs12>
              <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-flex>
          </v-layout>

          <v-layout wrap v-if="!accountPending && account">
            <v-flex xs12 sm6>
              <v-select
                :items="skillsSelect"
                label="Skill"
                v-model="skill"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                :items="formTimePeriods"
                label="Time period"
                v-model="timePeriod"
              ></v-select>
            </v-flex>

            <v-flex xs12 v-if="!skillXpChartData || highScoresPending || highScoresError">
              <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-flex>

            <v-flex xs12 v-if="skillXpChartData && !highScoresPending && !highScoresError">
              <time-series-chart :chart-data="skillXpChartData"
                                 :title="upperFirst(this.skill) + ' XP'"
                                 label="XP"></time-series-chart>
            </v-flex>

            <v-flex xs12 v-if="!skillLevelChartData || highScoresPending || highScoresError">
              <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-flex>

            <v-flex xs12 v-if="skillLevelChartData && !highScoresPending && !highScoresError">
              <time-series-chart :chart-data="skillLevelChartData"
                                 :title="upperFirst(this.skill) + ' level'"
                                 label="Level"></time-series-chart>
            </v-flex>

            <v-flex xs12 v-if="!skillRankChartData || highScoresPending || highScoresError">
              <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-flex>

            <v-flex xs12 v-if="skillRankChartData && !highScoresPending && !highScoresError">
              <time-series-chart :chart-data="skillRankChartData"
                                 :title="upperFirst(this.skill) + ' rank'"
                                 label="Rank"></time-series-chart>
            </v-flex>

          </v-layout>

        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import TimeSeriesChart from '../charts/TimeSeriesChart'
  import { skills } from '../../../app/skills'
  import { upperFirst } from '../../../util'
  import { timePeriods } from '../../../app/charts/skill-over-time'

  export default {
    created() {
      this.$store.dispatch('track/skillOverTime/setTimePeriod', 'week')
    },
    data() {
      return {
        timePeriods,
        skills,
        skill: 'overall',
      }
    },
    computed: {
      account() {
        return this.$store.state.track.getAccountData
      },
      accountPending() {
        return this.$store.state.track.getAccountPending
      },
      accountError() {
        return this.$store.state.track.getAccountError
      },
      highScores() {
        return this.$store.state.track.skillOverTime.getSkillOverTimeData
      },
      highScoresPending() {
        return this.$store.state.track.skillOverTime.getSkillOverTimePending
      },
      highScoresError() {
        return this.$store.state.track.skillOverTime.getSkillOverTimeError
      },
      pending() {
        return this.accountPending || this.highScoresPending
      },
      error() {
        return this.accountError || this.highScoresError
      },
      skillXpChartData() {
        return this.$store.state.track.skillOverTime.xpChartData
      },
      skillLevelChartData() {
        return this.$store.state.track.skillOverTime.levelChartData
      },
      skillRankChartData() {
        return this.$store.state.track.skillOverTime.rankChartData
      },
      skillsSelect() {
        return this.skills.map(skill => ({
          text: upperFirst(skill),
          value: skill,
        }))
      },
      dateRange() {
        return this.$store.state.track.skillOverTime.dateRange
      },
      formTimePeriods() {
        return this.timePeriods.map(period => ({ value: period, text: upperFirst(period) }))
      },
      timePeriod: {
        get() {
          return this.$store.state.track.skillOverTime.timePeriod
        },
        set(timePeriod) {
          this.$store.dispatch('track/skillOverTime/setTimePeriod', timePeriod)
        },
      },
    },
    methods: {
      upperFirst,
      refreshChart() {
        if (!this.account) {
          return null
        }
        return this.$store.dispatch('track/skillOverTime/getSkillOverTime', {
          slug: this.account.slug,
          dateRange: this.dateRange,
          skill: this.skill,
        })
      },
    },

    watch: {
      account() {
        this.refreshChart()
      },
      dateRange() {
        this.refreshChart()
      },
      skill() {
        this.refreshChart()
      },
    },

    components: {
      TimeSeriesChart,
    },
  }
</script>

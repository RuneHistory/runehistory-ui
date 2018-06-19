<template>
  <v-container fluid>
    <v-layout wrap>

      <v-flex xs12 v-if="!highScore">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-flex>

      <v-flex xs12 v-if="highScore">
        <pie-chart :chart-data="pieChartData"
                   :title="'XP distribution'"
                   label="XP"
                   :legend="true"
        ></pie-chart>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import rh from '../../client'
  import PieChart from './charts/PieChart'
  import { skills, colours } from '../../skills'
  import { upperFirst } from '../../util'

  export default {
    props: ['account'],
    created() {
      if (this.account) {
        this.loadHighScore(this.account.slug)
      }
    },
    data() {
      return {
        highScore: null,
        skills,
      }
    },
    computed: {
      pieChartSkills() {
        return skills.reduce((all, skill) => {
          if (skill !== 'overall') {
            all.push(skill)
          }
          return all
        }, [])
      },
      pieChartData() {
        return {
          labels: this.pieChartSkills.map(upperFirst),
          datasets: [
            {
              data: this.pieChartSkills.map(skill => this.highScore.skills[skill].experience),
              backgroundColor: this.pieChartSkills.map(skill => colours[skill]),
              borderWidth: 1,
            },
          ],
        }
      },
    },
    watch: {
      account(account) {
        if (!account) {
          return
        }
        this.loadHighScore(account.slug)
      },
    },
    methods: {
      loadHighScore(slug) {
        return rh.accounts().highScores(slug).getLatestHighScore()
          .then((highScore) => {
            this.highScore = highScore
            return highScore
          })
          .catch((err) => {
            this.highScore = null
            throw err
          })
      },
    },
    components: {
      PieChart,
    },
  }
</script>

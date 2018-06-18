<template>
  <v-flex xs12>
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Current stats</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12 v-if="!highScore">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-flex>

          <v-flex xs12 md4 v-if="highScore">
            <table>
              <tr>
                <th>Skill</th>
                <th>Level</th>
                <th>Rank</th>
                <th>Experience</th>
              </tr>
              <tr v-for="skill in skills">
                <td><img :src="'/static/img/skills/' + skill + '.gif'" /> {{ UCFirst(skill) }}</td>
                <td>{{ highScore.skills[skill].level }}</td>
                <td>{{ highScore.skills[skill].rank }}</td>
                <td>{{ highScore.skills[skill].experience }}</td>
              </tr>
            </table>
          </v-flex>

          <v-flex xs12 md8 v-if="highScore">
            <pie-chart :chart-data="pieChartData"
                       :title="'XP distribution'"
                       label="XP"></pie-chart>
          </v-flex>

        </v-layout>

      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
  import rh from '../../client'
  import PieChart from './charts/PieChart'
  import { skills, colours } from '../../skills'

  export default {
    props: ['account'],
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
          labels: this.pieChartSkills.map(this.UCFirst),
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
      /**
       * @return {string}
       */
      UCFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      },
    },
    components: {
      PieChart,
    },
  }
</script>

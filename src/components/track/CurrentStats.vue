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

          <v-flex xs12 md6 v-if="highScore">
            <v-data-table
              :headers="tableData.headers"
              :items="tableData.skills"
              hide-actions
            >
              <template slot="items" slot-scope="props">
                <td><img :src="props.item.icon" /> {{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.level }}</td>
                <td class="text-xs-right">{{ props.item.rank }}</td>
                <td class="text-xs-right">{{ props.item.experience }}</td>
              </template>
            </v-data-table>
          </v-flex>

          <v-flex xs12 md6 v-if="highScore">
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
      tableData() {
        const headers = ['Skill', 'Level', 'Rank', 'XP'].map(item => ({
          text: item,
          sortable: false,
        }))
        const formattedSkills = this.skills.map(skill => ({
          name: this.UCFirst(skill),
          level: this.highScore.skills[skill].level,
          rank: this.highScore.skills[skill].rank,
          experience: this.highScore.skills[skill].experience,
          icon: `/static/img/skills/${skill}.gif`,
        }))
        return {
          headers,
          skills: formattedSkills,
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

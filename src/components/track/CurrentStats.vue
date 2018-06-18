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

          <v-flex xs12 v-if="highScore">
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

        </v-layout>

      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
  import Client from 'runehistoryjs'

  export default {
    props: ['account'],
    created() {
      this.rh = new Client('rh-cli', 'test', 'test_secret', 'http://127.0.0.1:5000')
    },
    data() {
      return {
        highScore: null,
        skills: ['overall', 'attack', 'defence', 'strength', 'hitpoints',
          'ranged', 'prayer', 'magic', 'cooking', 'woodcutting',
          'fletching', 'fishing', 'firemaking', 'crafting', 'smithing',
          'mining', 'herblore', 'agility', 'theiving', 'slayer',
          'farming', 'hunter'],
      }
    },
    computed: {
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
        return this.rh.accounts().highScores(slug).getLatestHighScore()
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
    },
  }
</script>

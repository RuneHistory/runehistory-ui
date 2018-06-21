<template>
  <v-container fluid fill-height>
    <v-layout flex>
      <v-flex xs12>
        <v-jumbotron
          src="/static/img/ge-bg-compressed.png"
          dark
        >
          <v-container fill-height>
            <v-layout align-center>
              <v-flex>
                <h3 class="display-3">RuneHistory</h3>
                <span class="subheading">Old School RuneScape XP tracker</span>
                <v-divider class="my-3"></v-divider>
                <div class="title mb-3">Join {{ accountCount }} other players and start tracking
                  your account
                  today!</div>
                <v-btn large color="primary" class="mx-0" :to="{ name: 'search' }">Get started</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-jumbotron>

        <v-card>
          <v-container fluid>
            <v-layout>
              <v-flex xs12>
                RuneHistory is an XP tracker for <a href="http://oldschool.runescape.com">Old School RuneScape</a>.
                Unlike other XP trackers RuneHistory will track your XP frequently without any interaction needed so
                your data will stay up-to-date.
              </v-flex>
            </v-layout>
          </v-container>

          <v-container grid-list-lg fluid>
            <v-layout wrap>
              <v-flex xs12 sm4>
                <v-card color="blue-grey darken-2" class="white--text">
                  <v-card-title primary-title>
                    <div class="headline">{{ accountCount }} players tracked</div>
                    <div>We are actively tracking {{ accountCount }} players XP up to every 10
                      minutes.</div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark :to="{ name: 'search' }">Track your account</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs12 sm4 lg4>
                <v-card color="cyan darken-2" class="white--text">
                  <v-card-title primary-title>
                    <div class="headline">{{ highScoreCount }} data points</div>
                    <div>Since RuneHistory launched in 2018, we have gathered {{ highScoreCount
                      }} data points
                      .</div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark :to="{ name: 'search' }">Track your account</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs12 sm4 lg4>
                <v-card color="purple" class="white--text">
                  <v-card-title primary-title>
                    <div class="headline">Open source</div>
                    <div>RuneHistory is open source. Can you think of features that you would like to see?</div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark href="https://github.com/runehistory">Start contributing</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import rh from '../client'

  export default {
    created() {
      this.loadAccountCount()
      this.loadHighScoreCount()
    },
    data() {
      return {
        accountCount: null,
        highScoreCount: null,
      }
    },
    methods: {
      loadAccountCount() {
        return rh.stats().count_accounts()
          .then((count) => {
            this.accountCount = count
            return count
          })
          .catch((err) => {
            this.accountCount = null
            throw err
          })
      },
      loadHighScoreCount() {
        return rh.stats().count_highscores()
          .then((count) => {
            this.highScoreCount = count
            return count
          })
          .catch((err) => {
            this.highScoreCount = null
            throw err
          })
      },
    },
  }
</script>

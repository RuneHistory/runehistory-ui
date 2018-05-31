<template>
  <v-card>
    <v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout wrap>
        <v-flex xs12>
          RuneHistory is an XP tracker for <a href="http://oldschool.runescape.com/">Old School RuneScape</a>. Unlike
          other XP trackers RuneHistory will track your XP frequently without any interaction needed so your data will
          stay up-to-date.
        </v-flex>
      </v-layout>

      <v-layout wrap>
        <v-flex xs12 sm6 lg3>
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">999 players tracked</div>
              <div>We are actively tracking 999 players XP up to every 10 minutes.</div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark to="track">Track your account</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 lg3>
          <v-card color="cyan darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">999,999 data points</div>
              <div>Since RuneHistory launched in 2018, we have gathered 999,999 data points.</div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark to="track">Track your account</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 lg3>
          <v-card color="purple" class="white--text">
            <v-card-title primary-title>
              <div class="headline">Open source</div>
              <div>RuneHistory is open source. Can you think of features that you would like to see?</div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark href="https://github.com/jmwri/runehistory-ui">Start contributing</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

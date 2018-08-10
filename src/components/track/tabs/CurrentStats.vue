<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
        <v-container fluid>
          <v-layout v-if="accountError">
            <v-flex xs12>
              <v-alert
                :value="accountError"
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
            <v-flex xs12>
              <current-stats></current-stats>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import CurrentStats from '../CurrentStats'

  export default {
    props: ['accountState'],
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
    },
    methods: {
      updateLatestHighscore() {
        if (!this.account) {
          return null
        }
        return this.$store.dispatch('track/latestHighScore/getLatestHighScore', {
          slug: this.account.slug,
        })
      },
    },
    created() {
      this.updateLatestHighscore()
    },
    watch: {
      account() {
        this.updateLatestHighscore()
      },
    },
    components: {
      CurrentStats,
    },
  }
</script>

<template>
  <v-container fluid grid-list-lg>
    <v-layout flex wrap>
      <v-flex xs12>
        <account-tracking-info :account="$store.state.getAccountData"
                               :pending="$store.state.getAccountPending">
        </account-tracking-info>
      </v-flex>

      <v-flex xs12>
        <current-stats :account="$store.state.getAccountData"
                       :pending="$store.state.getAccountPending">

        </current-stats>
      </v-flex>

      <v-flex xs12>
        <skill-over-time :account="$store.state.getAccountData"
                         :pending="$store.state.getAccountPending">
        </skill-over-time>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import SkillOverTime from './cards/SkillOverTime'
  import CurrentStats from './cards/CurrentStats'
  import AccountTrackingInfo from './cards/AccountTrackingInfo'

  export default {
    created() {
      this.$store.dispatch('getAccount')
    },
    components: {
      AccountTrackingInfo,
      SkillOverTime,
      CurrentStats,
    },
  }
</script>

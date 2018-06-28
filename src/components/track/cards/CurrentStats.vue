<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Current stats</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-layout v-if="pending">
        <v-flex xs12>
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
      </v-layout>

      <v-layout wrap v-if="!pending && account">
        <v-flex xs12 md6>
          <current-stats xs1 :account="account"></current-stats>
        </v-flex>
        <v-flex xs12 md6>
          <xp-distribution :account="account"></xp-distribution>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import CurrentStats from '../CurrentStats'
  import XpDistribution from '../XpDistribution'

  export default {
    props: ['account', 'pending'],
    components: {
      CurrentStats,
      XpDistribution,
    },
  }
</script>

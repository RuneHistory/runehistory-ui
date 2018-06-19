<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Current stats</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-layout wrap>
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
    props: ['account'],
    components: {
      CurrentStats,
      XpDistribution,
    },
  }
</script>

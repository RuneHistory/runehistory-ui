<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title v-if="!pending && account">{{ account.nickname }}</v-toolbar-title>
      <v-toolbar-title v-if="pending">Loading Account</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-layout v-if="pending">
        <v-flex xs12>
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
      </v-layout>

      <v-layout v-if="!pending && account">
        <v-flex xs12>
          <p>
            We started tracking {{ account.nickname }} at {{ accountCreatedAt }}, and the
            most recent run was at {{ accountLastRunAt || '[never]' }}.
            {{ account.nickname }} hasn't been updated for {{ account.runs_unchanged }} runs.
          </p>
          <p v-if="!accountLastRunAt">
            {{ account.nickname }} will be tracked in the next scheduled run.
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import { formatDate } from '../../../util'

  export default {
    computed: {
      account() {
        return this.$store.state.getAccountData
      },
      pending() {
        return this.$store.state.getAccountPending
      },
      accountCreatedAt() {
        return formatDate(this.account.created_at)
      },
      accountLastRunAt() {
        if (!this.account.last_run_at) {
          return null
        }
        return formatDate(this.account.last_run_at)
      },
    },
  }
</script>

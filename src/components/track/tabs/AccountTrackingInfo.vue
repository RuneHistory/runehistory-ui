<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
        <v-container fluid>
          <v-layout v-if="accountPending">
            <v-flex xs12>
              <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-flex>
          </v-layout>

          <v-layout v-if="!accountPending && account">
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
    </v-flex>
  </v-layout>
</template>

<script>
  import { formatDate } from '../../../util'

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

<template>
  <v-container fluid grid-list-lg>
    <v-layout flex wrap>

      <v-flex xs12 v-if="!account">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Loading account</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fluid>
            <v-layout>
              <v-flex xs12>
                <v-progress-linear :indeterminate="true"></v-progress-linear>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12 v-if="account">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ account.nickname }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fluid>
            <v-layout v-if="account">
              <v-flex xs12>
                We started tracking {{ account.nickname }} at {{ account.created_at }}, and the most recent run was at
                {{ account.last_run_at }}. {{ account.nickname }} hasn't been updated for {{ account.runs_unchanged }}
                runs.
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  const Client = require('runehistoryjs');

  export default {
    created() {
      this.rh = new Client('rh-cli', 'test', 'test_secret', 'http://127.0.0.1:5000');
    },
    mounted() {
      this.loadAccount(this.slug);
    },
    data() {
      return {
        account: null,
      };
    },
    computed: {
      slug() {
        return this.$route.params.slug;
      },
    },
    watch: {
      slug() {
        this.loadAccount();
      },
    },
    methods: {
      loadAccount() {
        return this.rh.accounts().getAccount(this.slug)
          .then((account) => {
            this.account = account;
            return account;
          })
          .catch((err) => {
            this.account = null;
            throw err;
          });
      },
    },
  };
</script>

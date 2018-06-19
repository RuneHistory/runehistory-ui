<template>
  <v-container fluid grid-list-lg>
    <v-layout flex wrap>

      <v-flex xs12 v-if="account">
        <account-tracking-info :account="account"></account-tracking-info>
      </v-flex>

      <v-flex xs12>
        <current-stats :account="account"></current-stats>
      </v-flex>

      <v-flex xs12>
        <skill-over-time :account="account"></skill-over-time>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import rh from '../../client'
  import SkillOverTime from './cards/SkillOverTime'
  import CurrentStats from './cards/CurrentStats'
  import AccountTrackingInfo from './cards/AccountTrackingInfo'

  export default {
    created() {
      this.loadAccount(this.slug)
    },
    data() {
      return {
        account: null,
      }
    },
    computed: {
      slug() {
        return this.$route.params.slug
      },
    },
    watch: {
      slug(slug) {
        if (!slug) {
          return
        }
        this.loadAccount(slug)
      },
    },
    methods: {
      loadAccount(slug) {
        return rh.accounts().getAccount(slug)
          .then((account) => {
            this.account = account
            return account
          })
          .catch((err) => {
            this.account = null
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
      AccountTrackingInfo,
      SkillOverTime,
      CurrentStats,
    },
  }
</script>

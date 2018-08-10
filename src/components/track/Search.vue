<template>
  <v-container fluid fill-height>
    <v-layout flex justify-center align-center>
      <v-flex xs12 sm10 md8 lg6 xl6 elevation-20>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Track User</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-form ref="form" v-model="valid" @submit.prevent="submit" :disabled="accountPending" xs12>
            <v-container>
              <v-layout>
                <v-flex xs12>
                  <v-alert
                    :value="accountError"
                    color="error"
                    icon="warning"
                    outline
                  >
                    Something went wrong
                  </v-alert>

                  <v-text-field
                    v-model="nickname"
                    :rules="nicknameRules"
                    :counter="12"
                    label="Nickname"
                    required
                    :disabled="accountPending"
                  ></v-text-field>

                  <v-btn
                    :disabled="!valid || accountPending"
                    type="submit"
                  >
                    Track
                  </v-btn>
                  <v-btn
                    @click="clear"
                    :disabled="accountPending">
                    Clear
                  </v-btn>

                  <v-progress-circular
                    v-if="accountPending"
                    indeterminate
                    color="primary"
                    :size="20"
                    :width="3"
                  ></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { slugify } from '../../util'

  export default {
    metaInfo: {
      title: 'Search',
    },
    data: () => ({
      valid: true,
      submitted: false,
      exists: true,
      nickname: '',
      nicknameRules: [
        v => !!v || 'Nickname is required',
        v => (v && v.length <= 12) || 'Nickname must be less than 12 characters',
      ],
    }),

    computed: {
      slug() {
        return slugify(this.nickname)
      },
      account() {
        return this.$store.state.track.getAccountData
      },
      accountError() {
        return this.$store.state.track.getAccountError
      },
      accountPending() {
        return this.$store.state.track.getAccountPending
      },
    },

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('track/getOrCreateAccount', this.nickname)
            .then((account) => {
              if (account) {
                this.$router.push({ name: 'track', params: { slug: account.slug } })
              }
            })
        }
      },
      clear() {
        this.$refs.form.reset()
      },
    },
  }
</script>

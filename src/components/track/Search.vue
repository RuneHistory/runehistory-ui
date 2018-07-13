<template>
  <v-container fluid fill-height>
    <v-layout flex justify-center align-center>
      <v-flex xs12 sm10 md8 lg6 xl6 elevation-20>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Track User</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-form ref="form" v-model="valid" @submit.prevent="submit" :disabled="pending" xs12>
            <v-container>
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    :counter="12"
                    label="Username"
                    required
                    :disabled="pending"
                  ></v-text-field>

                  <v-btn
                    :disabled="!valid || pending"
                    type="submit"
                  >
                    Track
                  </v-btn>
                  <v-btn
                    @click="clear"
                    :disabled="pending">
                    Clear
                  </v-btn>

                  <v-progress-circular
                    v-if="pending"
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
  import rh from '../../client'
  import { slugify } from '../../util'

  export default {
    data: () => ({
      pending: false,
      valid: true,
      submitted: false,
      exists: true,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 12) || 'Username must be less than 12 characters',
      ],
    }),

    computed: {
      slug() {
        return slugify(this.username)
      },
    },

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.pending = true
          this.getAccount()
            .then((account) => {
              if (!account) {
                return this.createAccount()
              }
              return account
            })
            .then((account) => {
              this.$router.push({ name: 'track', params: { slug: account.slug } })
            })
            .finally(() => {
              this.pending = false
            })
        }
      },
      clear() {
        this.$refs.form.reset()
      },
      getAccount() {
        return rh.accounts().getAccount(this.slug).catch((err) => {
          if (err.response.status === 404) {
            return null
          }
          throw err
        })
      },
      createAccount() {
        return rh.accounts().createAccount(this.username)
      },
    },
  }
</script>

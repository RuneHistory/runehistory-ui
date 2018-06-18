<template>
  <v-container fluid fill-height>
    <v-layout flex justify-center align-center>
      <v-flex xs12 sm10 md8 lg6 xl6 elevation-20>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Track User</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-form ref="form" v-model="valid" @submit="submit" xs12>
            <v-container>
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    :counter="12"
                    label="Username"
                    required
                  ></v-text-field>

                  <v-btn
                    :disabled="!valid"
                    type="submit"
                  >
                    Track
                  </v-btn>
                  <v-btn @click="clear">Clear</v-btn>
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
          this.getAccount().then((account) => {
            if (!account) {
              return this.createAccount()
            }
            return account
          }).then(() => {
            this.$router.push({ name: 'track', params: { slug: this.slug } })
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

<template>
  <v-container fluid fill-height>
    <v-layout flex justify-center align-center>
      <v-flex xs12 sm10 md8 lg6 xl6 elevation-20>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Track User</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-form ref="form" v-model="valid" xs12>
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
                    @click="submit"
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
  export default {
    data: () => ({
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 12) || 'Username must be less than 12 characters',
      ],
    }),

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          // Valid form
        }
      },
      clear() {
        this.$refs.form.reset();
      },
    },
  };
</script>

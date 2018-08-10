<template>
  <v-layout style="margin-top: 3px">
    <v-flex xs12>
      <v-form ref="form" @submit.prevent="submit" :disabled="accountPending">
        <v-layout wrap>
          <v-text-field
            style="margin-top: 3px"
            color="secondary"
            v-model="nickname"
            :rules="nicknameRules"
            :counter="12"
            label="Account nickname"
            required
            :disabled="accountPending"
            solo-inverted
            mt-10
          ></v-text-field>
        </v-layout>

        <v-progress-circular
          v-if="accountPending"
          indeterminate
          color="primary"
          :size="20"
          :width="3"
        ></v-progress-circular>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: ['initSlug'],

    data: () => ({
      nickname: '',
      nicknameRules: [
        v => !!v || 'Nickname is required',
        v => (v && v.length <= 12) || 'Nickname must be less than 12 characters',
      ],
    }),

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
    },

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.$emit('nickname', this.nickname)
        } else {
          this.$emit('invalid', 'Invalid nickname')
        }
      },
    },

    watch: {
      account(a) {
        if (a) {
          this.nickname = a.nickname
        } else {
          this.nickname = this.initSlug
        }
      },
    },
  }
</script>

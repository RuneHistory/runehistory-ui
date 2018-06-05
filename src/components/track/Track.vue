<template>
  <v-container fluid fill-height>
    <v-layout flex justify-center align-center>
      <v-flex xs12 sm10 md8 lg6 xl6 elevation-20>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ slug }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      slug() {
        return this.$route.params.slug;
      },
    },
  };
</script>

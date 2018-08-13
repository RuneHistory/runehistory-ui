<template>
  <v-container fluid>
    <v-layout wrap>

      <v-flex xs12 v-if="pending">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-flex>

      <v-flex xs12 v-if="!pending && !error && highScore">
        <v-data-table
          :headers="tableData.headers"
          :items="tableData.skills"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <td><img :src="props.item.icon" /> {{ props.item.name }}</td>
            <td>{{ props.item.level }}</td>
            <td>{{ props.item.rank }}</td>
            <td>{{ props.item.experience }}</td>
          </template>
        </v-data-table>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import { skills } from '../../app/skills'
  import { upperFirst, numberWithCommas } from '../../util'

  export default {
    props: ['accountState'],

    data() {
      return {
        skills,
      }
    },

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
      highScore() {
        return this.$store.state.track.latestHighScore.getLatestHighScoreData
      },
      highScorePending() {
        return this.$store.state.track.latestHighScore.getLatestHighScorePending
      },
      highScoreError() {
        return this.$store.state.track.latestHighScore.getLatestHighScoreError
      },
      pending() {
        return this.accountPending || this.highScorePending
      },
      error() {
        return this.accountError || this.highScoreError
      },
      tableData() {
        const headers = ['Skill', 'Level', 'Rank', 'XP'].map(item => ({
          text: item,
          sortable: false,
        }))
        const formattedSkills = this.skills.map(skill => ({
          name: upperFirst(skill),
          level: numberWithCommas(this.highScore.skills[skill].level),
          rank: numberWithCommas(this.highScore.skills[skill].rank),
          experience: numberWithCommas(this.highScore.skills[skill].experience),
          icon: `/static/img/skills/${skill}.gif`,
        }))
        return {
          headers,
          skills: formattedSkills,
        }
      },
    },

  }
</script>

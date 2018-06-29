<template>
  <v-container fluid>
    <v-layout wrap>

      <v-flex xs12 v-if="pending">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-flex>

      <v-flex xs12 v-if="!pending && highScore">
        <v-data-table
          :headers="tableData.headers"
          :items="tableData.skills"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <td><img :src="props.item.icon" /> {{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.level }}</td>
            <td class="text-xs-right">{{ props.item.rank }}</td>
            <td class="text-xs-right">{{ props.item.experience }}</td>
          </template>
        </v-data-table>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import rh from '../../client'
  import { skills } from '../../skills'
  import { upperFirst } from '../../util'

  export default {
    created() {
      if (this.account) {
        this.loadHighScore(this.account.slug)
      }
    },
    data() {
      return {
        highScore: null,
        skills,
      }
    },
    computed: {
      account() {
        return this.$store.state.getAccountData
      },
      pending() {
        return this.$store.state.getAccountPending
      },
      tableData() {
        const headers = ['Skill', 'Level', 'Rank', 'XP'].map(item => ({
          text: item,
          sortable: false,
        }))
        const formattedSkills = this.skills.map(skill => ({
          name: upperFirst(skill),
          level: this.highScore.skills[skill].level,
          rank: this.highScore.skills[skill].rank,
          experience: this.highScore.skills[skill].experience,
          icon: `/static/img/skills/${skill}.gif`,
        }))
        return {
          headers,
          skills: formattedSkills,
        }
      },
    },
    watch: {
      account(account) {
        if (!account) {
          return
        }
        this.loadHighScore(account.slug)
      },
    },
    methods: {
      loadHighScore(slug) {
        return rh.accounts().highScores(slug).getLatestHighScore()
          .then((highScore) => {
            this.highScore = highScore
            return highScore
          })
          .catch((err) => {
            this.highScore = null
            throw err
          })
      },
    },
    components: {
    },
  }
</script>

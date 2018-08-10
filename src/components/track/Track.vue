<template>
  <v-container fluid grid-list-lg>
    <v-layout wrap>
      <v-flex xs12>
        <v-toolbar
          color="primary"
          dark
          tabs
          class="track-toolbar"
        >
          <v-toolbar-title>{{ nickname }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon :to="{ name: 'search' }">
            <v-icon>search</v-icon>
          </v-btn>

          <template slot="extension">
            <v-tabs
              v-model="selectedTabIndex"
              centered
              color="transparent"
              slider-color="white"
              grow
              show-arrows
              @input="changedTab"
            >
              <v-tab
                v-for="tab in tabItems"
                :key="tab.name"
              >
                {{ tab.name }}
              </v-tab>
            </v-tabs>
          </template>

        </v-toolbar>
      </v-flex>

      <v-flex xs12 v-if="accountError">
        <v-card>
          <v-container fluid>
            <v-layout>
              <v-flex xs12>
                <v-alert
                  :value="accountError"
                  color="error"
                  icon="warning"
                  outline
                >
                  Oops... Something went wrong
                </v-alert>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12 v-if="!accountError">
        <v-tabs-items v-model="selectedTabIndex" touchless>
          <v-tab-item
            v-for="tab in tabItems"
            :key="tab.name"
            :lazy="true"
          >
            <component :is="tab.component"></component>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import SkillOverTime from './tabs/SkillOverTime'
  import CurrentStats from './tabs/CurrentStats'
  import AccountTrackingInfo from './tabs/AccountTrackingInfo'
  import AccountForm from './AccountForm'
  import { slugify } from '../../util'

  export default {
    data() {
      return {
        tabItems: [
          {
            name: 'Tracking Info',
            component: AccountTrackingInfo,
            slug: 'tracking-info',
          },
          {
            name: 'Current Stats',
            component: CurrentStats,
            slug: 'current-stats',
          },
          {
            name: 'Skill Over Time',
            component: SkillOverTime,
            slug: 'skill-over-time',
          },
        ],
        selectedTabIndex: null,
        currentTab: null,
      }
    },
    methods: {
      changedTab(tabIndex) {
        const selectedTab = this.tabItems[tabIndex]
        this.currentTab = selectedTab
        this.$router.push({ name: 'track', params: { slug: this.$route.params.slug, tab: slugify(selectedTab.slug) } })
      },
      tabIndexFromSlug(slug) {
        for (let i = 0; i < this.tabItems.length; i += 1) {
          if (this.tabItems[i].slug === slug) {
            return i
          }
        }
        return null
      },
    },
    computed: {
      account() {
        return this.$store.state.track.getAccountData
      },
      accountError() {
        return this.$store.state.track.getAccountError
      },
      accountPending() {
        return this.$store.state.track.getAccountPending
      },
      nickname() {
        if (this.account) {
          return this.account.nickname
        }
        return this.$route.params.slug
      },
      currentTabName() {
        if (this.currentTab) {
          return this.currentTab.name
        }
        return null
      },
    },
    created() {
      if (this.$route.params.tab) {
        const index = this.tabIndexFromSlug(this.$route.params.tab)
        if (index === null) {
          this.selectedTabIndex = 0
        } else {
          this.selectedTabIndex = index
        }
      }
      this.$store.dispatch('track/getAccount', this.$route.params.slug)
    },
    metaInfo() {
      let title = `Track ${this.nickname}`
      if (this.currentTabName) {
        title += ` | ${this.currentTabName}`
      }
      return {
        title,
      }
    },
    components: {
      AccountTrackingInfo,
      SkillOverTime,
      CurrentStats,
      AccountForm,
    },
  }
</script>

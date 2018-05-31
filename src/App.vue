<template>
  <v-app>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in navigation"
          :key="i"
          :to="item.link"
          ripple
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer app>
      <v-flex text-xs-center>
        &copy;2018 — <strong>RuneHistory</strong>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: true,
        navigation: [{
          icon: 'dashboard',
          title: 'Dashboard',
          link: { name: 'dashboard' },
        },
        {
          icon: 'show_chart',
          title: 'Track XP',
          link: { name: 'track' },
        }],
        title: 'RuneHistory',
      };
    },
    name: 'App',
  };
</script>

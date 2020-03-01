<template>
  <v-app>
    <v-app-bar color="dark" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-btn icon>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>minimize</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>view_quilt</v-icon>
      </v-btn>
      <v-toolbar-title>Éditeur de code</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({})
}
</script>

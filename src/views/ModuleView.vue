<template>
  <v-layout column justify-center align-center>
      <h1>{{ module.name}}</h1>
    <v-row xs12 sm8 md12 style="max-width: 88rem; margin: 2em">
      <v-col v-for="s in sessions" :key="s.id" cols="12">
        <h2>
          <router-link :to="`/session/${s.id}/${getExercisesBySessionId(s.id)[0].id}/do`">{{ s.name }}</router-link>
        </h2>
        <v-row justify="start">
          <v-card
            v-for="e in getExercisesBySessionId(s.id)"
            :key="e.id"
            class="ma-2"
            height="8em"
            width="16em"
          >
            <v-card-title class="subtitle-1">{{ e.title }}</v-card-title>
            <v-card-text>{{ e.lang}}</v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Module',
  data: () => ({}),

  methods: {
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession'])
  },

  async mounted () {
    await this.fetchModule({ id: this.moduleId })
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    )
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    )
  },

  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    ...mapGetters('modules', ['getModuleById']),
    moduleId () {
      return parseInt(this.$route.params.id)
    },
    module () {
      return this.getModuleById(this.moduleId) || { title: 'Loading ...' }
    },
    sessions () {
      return this.getSessionsByModuleId(this.moduleId)
    }
  }
}
</script>

<template>
  <v-layout column justify-center align-center>
    <v-row xs12 sm8 md12 style="max-width: 88rem; margin: 2em">
      <v-col v-for="m in modules" :key="m.id" cols="12">
        <h2>
          <router-link :to="`/module/${m.id}`">{{ m.name }}</router-link>
        </h2>
        <v-row justify="start">
          <v-card
            v-for="s in getSessionsByModuleId(m.id)"
            :key="s.id"
            class="ma-2"
            height="8em"
            width="16em"
          >
            <v-card-title>{{ s.name }}</v-card-title>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'ModulesList',
  data: () => ({}),

  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession'])
  },

  async mounted () {
    await this.fetchModules()
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    )
  },

  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId'])
  }
}
</script>

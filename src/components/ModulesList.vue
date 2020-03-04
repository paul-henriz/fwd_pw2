<template>
  <v-card max-width="1200" class="mx-auto">
    <v-container class="pa-1">
      <v-item-group>
        <v-row v-for="m in modules" :key="m.id" cols="12" md="4">
          <v-col>
            <h3>{{ m.name }}</h3>
            <v-row>
              <v-col
                v-for="s in getSessionsByModuleId(m.id)"
                :key="s.id"
                cols="12"
                md="2"
              >
                <v-item>
                  <v-card dark>
                    <v-card-text>
                      <p>{{ s.name }}</p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn text color="white">Select</v-btn>
                      <v-btn text color="white">Edit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-card>
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
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
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

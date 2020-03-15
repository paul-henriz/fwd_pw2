<template>
    <v-row cols="12" style="margin-left: 1em">
        <v-col cols="3">
            <v-row class="flex-column">

                <router-link :to="`/session/${sessionId}/${e.id}/do`"
                style="color: white; text-decoration: none"
                v-for="e of getExercisesBySessionId(sessionId)"
                :key="e.id">
                    <v-card style="margin: 0.5em">
                        <v-card-title class="subtitle-1">{{ e.title }}</v-card-title>
                        <v-card-text>{{ e.lang}}</v-card-text>
                    </v-card>
                </router-link>
            </v-row>
        </v-col>
        <v-col cols="9">
            <v-card class="pa-2">
            <v-col>
            <h2 class="pa-2">{{ sessionName }} - {{ exercise.title }} </h2>
            <div style="margin-left: 2em" v-html="exercise.instructions"></div>
            </v-col>
            <v-col>
            <Sandbox/>
            </v-col>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Sandbox from '../components/Sandbox'

export default {
  name: 'DoExercise',
  data: () => ({}),
  components: {
    Sandbox
  },
  methods: {
    ...mapActions('sessions', ['fetchSession']),
    ...mapActions('exercises', ['fetchExercisesForSession']),
    ...mapActions('exercises', ['fetchExerciseForSession'])
  },

  async mounted () {
    await this.fetchExerciseForSession({ sessionId: this.sessionId, exerciseId: this.exerciseId })
    await this.fetchSession({ id: this.sessionId })
    await this.fetchExercisesForSession({ sessionId: this.sessionId })
  },

  computed: {
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    ...mapGetters('sessions', ['getSessionById']),
    ...mapGetters('exercises', ['getExerciseById']),
    exerciseId () {
      return parseInt(this.$route.params.idexo)
    },
    sessionId () {
      return parseInt(this.$route.params.id)
    },
    session () {
      return this.getSessionById(this.sessionId) || { title: 'Loading ...' }
    },
    sessionName () {
      return this.session.name
    },
    exercises () {
      return this.getExercisesBySessionId(this.sessionId)
    },
    exercise () {
      return this.getExerciseById(this.exerciseId)
    }
  }
}
</script>

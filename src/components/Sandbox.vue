<template>
  <v-container>
    <v-row class="mb-6" no-gutters>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <h2>Sandbox</h2>
          <div id="sandbox" class="exercise-editor-ace-editor"></div>
          <br />
          <v-btn color="primary" @click="launchSandbox()" depressed>
            <v-icon>play_arrow</v-icon>
            Lancer sandbox
          </v-btn>
        </v-card>
      </v-col>
      <v-col style="margin-left: 1em">
          <v-alert
            text
            v-for="test in resultSandbox"
            :key="test.line"
            :type="!test.failure ? 'success' : 'warning'"
            transition="scale-transition"
            ><v-tooltip left>
              <template v-slot:activator="{ on }">
                <h5 v-on="on">{{ test.name }}</h5>
              </template>
              <span
                >Durée d'exécution: {{ test.time }}s
                <p v-if="test.failure">{{ test.failure.message }}</p></span
              >
            </v-tooltip>
          </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'

export default {
  name: 'Sandbox',
  data: () => ({
    sandbox: null,
    resultSandbox: [{
      line: 1,
      name: 'pouet',
      time: 3
    }]
  }),
  mounted () {
    this.sandbox = ace.edit('sandbox')
    this.sandbox.setTheme('ace/theme/monokai')
    this.sandbox.session.setMode('ace/mode/python')
  },
  methods: {
    ...mapActions('attempts', ['createAttemptForSession']),
    ...mapActions('attempts', ['fetchLastAttemptForExercise']),
    async launchSandbox () {
      await this.createAttemptForSession({ exerciseId: this.$route.params.idexo, sessionId: this.$route.params.id, solution: this.sandbox.getValue() })
      await this.fetchLastAttemptForExercise({ sessionId: this.$route.params.id, exerciseId: this.$route.params.idexo })
      console.log(this.getLastAttemptForExercise(1))
      // console.log(this.attempts)
      /** this.resultSandbox = result.data.result.tests.sort(
        (_x, _y) => _x.line - _y.line
      ) */
    }
  },
  computed: {
    ...mapState('attempts', ['attempts']),
    ...mapGetters('attempts', ['getLastAttemptForExercise'])
  }
}
</script>

<style>
.exercise-editor-ace-editor {
  position: relative;
  height: 20rem;
}
</style>

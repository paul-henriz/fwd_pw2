<template>
  <v-container>
    <v-row class="mb-6" no-gutters>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <v-text-field
            v-model="exerciseName"
            label="Nom de l'exercice"
          ></v-text-field>
          <v-select
            v-model="lang"
            :items="languages"
            item-text="name"
            item-value="mode"
            label="Langage"
            @change="changeLanguage"
            return-object
            required
          ></v-select>
          <v-btn color="primary" @click="saveExercise" depressed>
            <v-icon>save</v-icon>
            Sauvegarder
          </v-btn>
          <h2>Consignes</h2>
          <v-textarea
            v-model="instructions"
            name="input-7-1"
            filled
            auto-grow
            value="Écrivez ici vos consignes."
          ></v-textarea>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <h2>Tests</h2>
          <div id="tests" class="exercise-editor-ace-editor"></div>
          <h2>Sandbox</h2>
          <div id="sandbox" class="exercise-editor-ace-editor"></div>
          <br />
          <v-btn color="primary" @click="launchSandbox" depressed>
            <v-icon>play_arrow</v-icon>
            Lancer sandbox
          </v-btn>
          <br />
          <br />
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'

export default {
  name: 'Home',
  data: () => ({
    exerciseName: '',
    instructions: '',
    languages: [
      { mode: 'python', name: 'Python' },
      { mode: 'javascript', name: 'Javascript' }
    ],
    tests: null,
    sandbox: null,
    lang: { mode: 'python', name: 'Python' },
    resultSandbox: []
  }),
  mounted () {
    this.tests = ace.edit('tests')
    this.tests.setTheme('ace/theme/monokai')
    this.tests.session.setMode(`ace/mode/${this.lang.mode}`)

    this.sandbox = ace.edit('sandbox')
    this.sandbox.setTheme('ace/theme/monokai')
    this.sandbox.session.setMode(`ace/mode/${this.lang.mode}`)
  },
  methods: {
    changeLanguage () {
      this.tests.session.setMode(`ace/mode/${this.lang.mode}`)
      this.sandbox.session.setMode(`ace/mode/${this.lang.mode}`)
    },
    async saveExercise () {
      await this.axios.post('http://localhost:3000/api/v1/exercise', {
        instructions: this.instructions,
        lang: this.lang.mode,
        title: this.exerciseName,
        tests: this.tests.getValue(),
        creation_date: new Date()
      })
    },
    async launchSandbox () {
      const result = await this.axios.post(
        'http://localhost:3000/api/v1/exercise/sandbox',
        {
          lang: this.lang.mode,
          tests: this.tests.getValue(),
          solution: this.sandbox.getValue()
        }
      )
      this.resultSandbox = result.data.result.tests.sort(
        (_x, _y) => _x.line - _y.line
      )
    }
  }
}
</script>

<style>
.exercise-editor-ace-editor {
  position: relative;
  height: 20rem;
}
</style>

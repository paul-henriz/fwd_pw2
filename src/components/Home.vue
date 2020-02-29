<template>
  <v-container class="grey lighten-5">
    <v-row class="mb-6" no-gutters>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <v-text-field label="Nom de l'exercice"></v-text-field>
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
          <v-btn color="primary" depressed>
            <v-icon>save</v-icon>
            Sauvegarder
          </v-btn>
          <h2>Consignes</h2>
          <v-textarea
            name="input-7-1"
            filled
            auto-grow
            value="Écrivez ici vos consignes."
          ></v-textarea>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <div id="editor" class="exercise-editor-ace-editor"></div>
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
    languages: [
      { mode: 'python', name: 'Python' },
      { mode: 'javascript', name: 'Javascript' }
    ],
    editor: null,
    lang: { mode: 'python', name: 'Python' }
  }),
  mounted () {
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.session.setMode(`ace/mode/${this.lang.mode}`)
  },
  methods: {
    changeLanguage () {
      this.editor.session.setMode(`ace/mode/${this.lang.mode}`)
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

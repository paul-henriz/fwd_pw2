<template>
  <v-form v-model="valid">
  <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-card-text>
                <v-alert v-if="errorLogin" type="error">
                  Error during login. Please check you credentials.
                </v-alert>
                <v-form>
                  <v-text-field
                    label="Username"
                    v-model="username"
                    type="text"
                    required
                  />

                  <v-text-field
                    label="Password"
                    v-model="password"
                    type="password"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="buttonClicked">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    valid: false,
    username: '',
    password: '',
    errorLogin: false
  }),

  methods: {
    ...mapActions('user', ['login']),
    async buttonClicked () {
      try {
        await this.login({
          email: this.username,
          password: this.password
        })
        this.$router.push('/')
      } catch (err) {
        this.errorLogin = true
      }
    }
  }
}
</script>

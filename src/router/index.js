import Vue from 'vue'
import VueRouter from 'vue-router'

import TeacherEditor from '../views/TeacherEditorView.vue'
import Login from '../views/LoginView.vue'
import ModulesList from '../views/ModulesListVue.vue'
import Module from '../views/ModuleView.vue'
import DoExercise from '../views/DoExercise.vue'

import store from '../store/index'

Vue.use(VueRouter)

async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/editExercise',
    name: 'editExercise',
    component: TeacherEditor,
    beforeEnter
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/',
    name: 'modulesList',
    component: ModulesList,
    beforeEnter
  },

  {
    path: '/module/:id',
    name: 'Module',
    component: Module,
    beforeEnter
  },

  {
    path: '/session/:id/:idexo/do',
    name: 'DoExercise',
    component: DoExercise,
    beforeEnter
  }
]

export default new VueRouter({
  routes
})

import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Camels from './views/Camels.vue'
import LoginPage from './views/LoginPage.vue'
import GamePage from './views/GamePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/camels',
      name: 'camels',
      component: Camels
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage
    }
  ]
})

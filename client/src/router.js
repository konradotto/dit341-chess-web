import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import AuthPage from './views/AuthPage.vue'
import GamePage from './views/GamePage.vue'
import Games from './views/Games.vue'

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
      path: '/login',
      name: 'login',
      component: AuthPage
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage
    },
    {
      path: '/games',
      name: 'games',
      component: Games
    }
  ]
})

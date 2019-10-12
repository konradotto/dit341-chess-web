import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import LoginPage from './views/LoginPage.vue'
import GamePage from './views/GamePage.vue'
import Games from './views/Games.vue'
import GameData from './views/GameData.vue'

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
      component: LoginPage
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
    },
    {
      path: '/data/:type/:id',
      name: 'gameData',
      component: GameData
    }
  ]
})

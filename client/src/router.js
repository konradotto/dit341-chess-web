import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Auth from './views/Auth.vue'
import GamePage from './views/GamePage.vue'
import Games from './views/Games.vue'
import GameData from './views/GameData.vue'
import Profile from './views/Profile.vue'
import Puzzles from './views/Puzzles.vue'
import PuzzleData from './views/PuzzleData.vue'
import MyGames from './views/MyGames.vue'
import PlayPage from './views/Play.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/mygames',
      name: 'My games',
      component: MyGames
    },
    {
      path: '/login',
      name: 'Login',
      component: Auth
    },
    {
      path: '/game',
      name: 'Game',
      component: GamePage
    },
    {
      path: '/game/:id',
      name: 'Game',
      component: GamePage
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/game_data',
      name: 'GameData',
      component: GameData
    },
    {
      path: '/game_data/:id',
      name: 'GameData',
      component: GameData
    },
    {
      path: '/puzzles',
      name: 'Puzzles',
      component: Puzzles
    },
    {
      path: '/puzzle_data',
      name: 'PuzzleData',
      component: PuzzleData
    },
    {
      path: '/puzzle_data/:id',
      name: 'PuzzleData',
      component: PuzzleData
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/play',
      name: 'Play',
      component: PlayPage
    }
  ]
})

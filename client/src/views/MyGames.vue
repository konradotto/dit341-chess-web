<template>
  <div class="container-fluid">
    <h1> Played games </h1>
    <b-table borderless :items="items" ></b-table>
  </div>
</template>

<script>
import { Api } from '@/Api'
import data from '@/data'
import moment from 'moment'

export default {
  components: {
  },
  data() {
    return {
      authorized: false,
      games: [],
      items: []
    }
  },
  mounted() {
    this.getGames()
  },
  methods: {
    gameBelongsToUser(game) {
      return game.white === data.getUser() || game.black === data.getUser()
    },
    gameToTableItem(game) {
      let userPlayedWhite = game.white === data.getUser()
      let gameResult

      if (game.result === '0.5-0.5') {
        gameResult = 'Draw'
      } else if (game.result === 'progress') {
        gameResult = 'In progress'
      } else if ((userPlayedWhite && game.result === '1-0') || (!userPlayedWhite && game.result === '0-1')) {
        gameResult = 'Win'
      } else {
        gameResult = 'Loss'
      }

      return {
        result: gameResult,
        'You played': userPlayedWhite ? 'White' : 'Black',
        opponent: userPlayedWhite ? game.black : game.white,
        date: moment(String(game.date)).format('MM/DD/YYYY')
      }
    },
    getGames() {
      Api.get('/games')
        .then(response => {
          for (let i = 0; i < response.data.games.length; i++) {
            let game = response.data.games[i]
            if (this.gameBelongsToUser(game)) {
              this.items.push(this.gameToTableItem(game))
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {

        })
    }
  }
}
</script>

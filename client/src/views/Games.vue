<template>
  <div class="container-fluid">
    <GameTable type="Game" :data="games" :route="route" :viewRoute="viewRoute" :delete="deleteGame" :deleteAll="deleteAllGames"/>
  </div>
</template>

<script>
import GameTable from '@/components/DataTable.vue'
import { Api } from '@/Api'

export default {
  components: {
    GameTable
  },
  data() {
    return {
      authorized: false,
      route: '/game_data',
      viewRoute: '/game',
      games: []
    }
  },
  mounted() {
    this.getGames()
  },
  methods: {
    getGames() {
      Api.get('/games')
        .then(reponse => {
          this.games = reponse.data.games
        })
        .catch(error => {
          this.games = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deleteGame(game) {
      if (confirm(`Do you really want to delete game with id: ${game._id}?`)) {
        Api.delete(`/games/${game._id}`)
          .then(response => {
            console.log(`Game with id ${game._id} deleted from the database.`)
            let index = this.games.map(x => {
              return x._id
            }).indexOf(game._id)
            this.games.splice(index, 1)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    deleteAllGames() {
      if (this.authorized) {
        if (confirm(`Do you really want to delete all games permanently?`)) {
          Api.delete(`/games`)
            .then(response => {
              console.log(`All games deleted from the database.`)
              this.games = []
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else {
        alert('You are not authorized to delete all games!')
      }
    }
  }
}
</script>

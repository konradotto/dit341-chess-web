<template>
  <div>
    <GameTable type="Game" :data="games" :route="route" />
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
      route: '/game_data',
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
    }
  }
}
</script>

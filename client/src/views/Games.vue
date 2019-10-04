<template>
  <div>
    <GameTable type="Games" :data="games" />
  </div>
</template>

<script>
import GameTable from '@/components/DataTable.vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export default {
  components: {
    GameTable
  },
  data() {
    return {
      games: []
    }
  },
  mounted() {
    axios
      .get(`${API_URL}/api/games`)
      // .get('https://opentdb.com/api.php?amount=10&type=multiple')
      .then(jsonData => {
        this.games = jsonData.data.games
      })
  }
}
</script>

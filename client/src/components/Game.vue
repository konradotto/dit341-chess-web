<template>
  <div class="game-container">
    <chessboard class="chessbaord"/>
  </div>
</template>

<script>
import { chessboard } from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'

export default {
  components: {
    chessboard
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

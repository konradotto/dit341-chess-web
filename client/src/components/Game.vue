<template>
  <div id="game-container">
    <chessboard :fen="currentFen"/>
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
    return {
      previousFen: '',
      currentFen: ''
    }
  },
  methods: {
    loadFen(fen) {
      this.currentFen = fen
    }
  },
  created() {
    this.fens = ['5rr1/3nqpk1/p3p2p/Pp1pP1pP/2pP1PN1/2P1Q3/2P3P1/R4RK1 b - f3 0 28', 'r4rk1/pp1b3p/6p1/8/3NpP2/1P4P1/P2K3P/R6R w - - 0 22']
  }
}
</script>

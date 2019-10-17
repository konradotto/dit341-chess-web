<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="8" offset="2" md="6" offset-md="3">
        <div class="header-container">
          <p v-if="existingGame">GameId: {{ gameId }}</p>
          <p v-else>Unknown Game</p>
        </div>
        <Game/>
      </b-col>
    </b-row>
    <b-row>
      <b-col id="commentcomposite" cols="8" offset="2" md="6" offset-md="3">
        <CommentComposite :gameId="gameId"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Game from '@/components/Game'
import CommentComposite from '@/components/CommentComposite'

export default {
  data() {
    return {
      existingGame: false,
      gameId: ''
    }
  },
  components: {
    Game,
    CommentComposite
  },
  created() {
    console.log(this.$route.params.id)
    if (this.$route.params.id) {
      this.gameId = this.$route.params.id
      this.existingGame = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.commentcomposite {
 float: left;
}
</style>

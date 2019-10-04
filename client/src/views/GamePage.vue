<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="8" offset="2" md="6" offset-md="3">
        <Game/>
      </b-col>
    </b-row>
    <b-row>
      <b-col id="commentcomposite" cols="8" offset="2" md="6" offset-md="3">
        <CommentComposite/>
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
    }
  },
  components: {
    Game,
    CommentComposite
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.commentcomposite {
 float: left;
}
</style>

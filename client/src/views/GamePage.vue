<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="2" offset="5" md="4" offset-md="4">
        <Game/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Game from '@/components/Game'

export default {
  components: {
    Game
  },
  data() {
    return {}
  }
}
</script>

<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="8" offset="2" md="6" offset-md="3">
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

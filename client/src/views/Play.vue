<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <div>
            <h2> White player </h2>
            <p> Placeholder for the name of the white player </p>
            <h2> Black player </h2>
            <p> Placeholder for the name of the black player </p>
            <h2> Turn </h2>
            <p> Placeholder for who's turn it is </p>
          </div>
        </b-col>

        <b-col>
          <chessboard @onMove="afterMove"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { chessboard } from 'vue-chessboard'

export default {
  data() {
    return {
      game: {}
    }
  },
  components: {
    chessboard
  },
  methods: {
    afterMove(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>
h2, p {
  color: white;
}
</style>

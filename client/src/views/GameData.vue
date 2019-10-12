<template>
  <div class="game-data-container">
    <b-form @submit="tryPostGame">
      <b-form-group id="input-group-1" label="PGN:" label-for="input-1" description="Please enter a valid PGN">
        <b-form-input
          id="input-1"
          v-model="game.PGN"
          type="text"
          required
          placeholder="Enter PGN here"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Event:" label-for="input-2" description="Please enter the event">
        <b-form-input
          id="input-2"
          v-model="game.event"
          type="text"
          placeholder="Single Game"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Create Game</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export default {
  data() {
    let game = {
      PGN: '',
      event: '',
      site: '',
      round: '',
      date: Date.now,
      white: '',
      black: '',
      result: '',
      gameId: 0
    }
    return {
      game
    }
  },
  methods: {
    tryPostGame() {
      axios
        .post(`${API_URL}/api/games`, this.game)
    }
  }
}
</script>

<template>
  <div class="game-data-container">
    <b-form @submit.prevent>
      <b-form-group id="input-group-1" label="White:" label-for="input-1" description="Playing White">
        <b-form-select
          id="input-1"
          v-model="white"
          :options="usernames"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Black:" label-for="input-2" description="Playing Black">
        <b-form-select
          id="input-2"
          v-model="black"
          :options="usernames"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="PGN:" label-for="input-3" description="Please enter a valid PGN">
        <b-form-input
          id="input-3"
          v-model="game.PGN"
          type="text"
          required
          placeholder="Enter PGN here"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Event:" label-for="input-4" description="Please enter the event">
        <b-form-input
          id="input-4"
          v-model="game.event"
          type="text"
          placeholder="Single Game"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Site:" label-for="input-5" description="Please enter the site">
        <b-form-input
          id="input-5"
          v-model="game.site"
          type="text"
          placeholder="ChessMate.com"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Round:" label-for="input-6" description="Please enter the round">
        <b-form-input
          id="input-6"
          v-model="game.round"
          type="number"
          placeholder="0"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-7" label="Date:" label-for="input-7" description="Please enter the date">
        <b-form-input
          id="input-7"
          v-model="game.date"
          type="date"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-8" label="Result:" label-for="input-8" description="Please enter the result">
        <b-form-input
          id="input-8"
          v-model="game.result"
          type="text"
          placeholder="1-0"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" @click="tryPostGame">Create Game</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    let game = {
      PGN: '',
      event: 'Single Game',
      site: 'ChessMate.com',
      round: '',
      date: Date.now(),
      white: '',
      black: '',
      result: '',
      gameId: 0
    }
    return {
      white: '',
      black: '',
      users: [],
      usernames: [],
      game
    }
  },
  mounted() {
    console.log('Component mounted.')
    this.getPlayers()
  },
  watch: {
    white: function (val) {
      for (let i in this.users) {
        if (this.users[i].userName === val) {
          this.game.white = this.users[i]._id
        }
      }
    },
    black: function (val) {
      for (let i in this.users) {
        if (this.users[i].userName === val) {
          this.game.black = this.users[i]._id
        }
      }
    }
  },
  methods: {
    getPlayers() {
      Api.get('/users')
        .then(reponse => {
          this.users = reponse.data.users
        })
        .catch(error => {
          this.users = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
          // update usernames
          this.usernames = []
          for (let i in this.users) {
            let user = this.users[i]
            this.usernames.push(user.userName)
          }
        })
    },
    tryPostGame() {
      if (this.checkGame()) {
        console.log('All requirements met to post a game.')
        this.postGame()
        this.resetGame()
      } else {
        console.log('Not all requirements have been met to post a game.')
      }
    },
    resetGame() {
      this.game = {
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
      // load the players whenever the game is being reset
      this.getPlayers()
    },
    checkGame() {
      // Check whether all entries are valid, otherwise mark them as not valid
      let valid = true
      valid = this.checkPGN() ? valid : false
      valid = this.checkResult() ? valid : false

      return valid
    },
    checkPGN() {
      // check whether the PGN is a valid chess PGN
      // outside the scope of this course
      return true
    },
    checkResult() {
      let validResults = [' ', '1-0', '0-1', '0.5-0.5']
      return validResults.indexOf(this.game.result) >= 0
    },
    postGame() {
      Api.post('/games', this.game)
        .then(response => {
          // What are we gonna doe when a game is successfully posted?
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

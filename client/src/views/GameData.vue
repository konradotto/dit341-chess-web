<template>
  <div class="game-data-container">
    <div class="header-container">
      <h1 v-if="existingGame">GameId: {{ game._id }}</h1>
      <h1 v-else>New Game</h1>
    </div>
    <b-form @submit.prevent>
      <b-form-group v-if="existingGame" id="input-group-0" label="Action:" label-for="input-0" description="Choose Action">
        <b-form-select
          id="input-0"
          v-model="action"
          :options="actions"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group v-if="edit" id="input-group-1" label="White:" label-for="input-1" description="Playing White">
        <b-form-select
          id="input-1"
          v-model="white"
          :options="usernames"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group v-if="edit"  id="input-group-2" label="Black:" label-for="input-2" description="Playing Black">
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

      <b-form-group v-if="edit"  id="input-group-4" label="Event:" label-for="input-4" description="Please enter the event">
        <b-form-input
          id="input-4"
          v-model="game.event"
          type="text"
          placeholder="Single Game"
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="edit"  id="input-group-5" label="Site:" label-for="input-5" description="Please enter the site">
        <b-form-input
          id="input-5"
          v-model="game.site"
          type="text"
          placeholder="ChessMate.com"
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="edit" id="input-group-6" label="Round:" label-for="input-6" description="Please enter the round">
        <b-form-input
          id="input-6"
          v-model="game.round"
          type="number"
          placeholder="0"
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="edit" id="input-group-7" label="Date:" label-for="input-7" description="Please enter the date">
        <b-form-input
          id="input-7"
          v-model="game.date"
          type="date"
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="edit" id="input-group-8" label="Result:" label-for="input-8" description="Please enter the result">
        <b-form-input
          id="input-8"
          v-model="game.result"
          type="text"
          placeholder="1-0"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" @click="onSubmit">{{ submitAction }}</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      action: 'Edit',
      edit: true,
      white: '',
      black: '',
      users: [],
      usernames: [],
      actions: { edit: 'edit', patch: 'patch' },
      game: Object,
      existingGame: false,
      submitAction: 'Create Game'
    }
  },
  mounted() {
    console.log('GameData mounted.')
    this.resetForm()

    this.getPlayers()
    if (this.$route.params.id) {
      console.log(`id: ${this.$route.params.id}`)
      this.getGame()
      this.existingGame = true
      this.submitAction = 'Update Game'
    }

    console.log(this.game)
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
    },
    action: function (val) {
      if (val === this.actions['patch']) {
        this.edit = false
        this.submitAction = 'Patch Game'
      } else {
        this.edit = true
        this.submitAction = 'Update Game'
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
    getGame() {
      Api.get(`/games/${this.$route.params.id}`)
        .then(response => {
          console.log(response.data)
          for (let i in this.users) {
            let user = this.users[i]
            if (user._id === response.data.white) {
              this.white = user.userName
            }
            if (user._id === response.data.black) {
              this.black = user.userName
            }
          }
          this.game = response.data
        })
        .catch(error => {
          this.game = this.resetForm()
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    onSubmit() {
      if (this.edit) {
        if (this.existingGame) {
          console.log('putting')
          this.tryPutGame()
        } else {
          console.log('posting')
          this.tryPostGame()
        }
      } else if (!this.edit && this.existingGame) {
        console.log('patching')
        this.tryPatchPGN()
      }
    },
    tryPostGame() {
      if (this.checkGame()) {
        console.log('All requirements met to post a game.')
        this.postGame()
      } else {
        console.log('Not all requirements have been met to post a game.')
      }
    },
    tryPutGame() {
      if (this.checkGame()) {
        console.log('All requirements met to update the game.')
        this.updateGame()
      } else {
        console.log('Not all requirements to update the game have been met.')
      }
    },
    tryPatchPGN() {
      if (this.checkPGN()) {
        console.log('New PGN is valid.')
        this.patchGame()
      }
    },
    resetForm() {
      // load the players whenever the game is being reset
      this.getPlayers()
      this.existingGame = false
      this.submitAction = 'Create Game'
      this.edit = true

      this.white = ''
      this.black = ''

      this.game = {
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
      // could be done using chess.js
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
          console.log('New game added to the database.')
          this.resetForm()
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateGame() {
      Api.put(`/games/${this.game._id}`, this.game)
        .then(response => {
          // What are we gonna doe when a game is successfully posted?
          console.log('Game updated in the database.')
          this.resetForm()
        })
        .catch(error => {
          console.log(error)
        })
    },
    patchGame() {
      Api.patch(`/games/${this.game._id}`, {
        PGN: this.game['PGN']
      })
        .then(response => {
          // What are we gonna doe when a game is successfully posted?
          console.log(response.data)
          this.resetForm()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<template>
  <div class="puzzle-data-container">
    <div class="header-container">
      <h1 v-if="existingPuzzle">PuzzleId: {{ puzzle._id }}</h1>
      <h1 v-else>New Puzzle</h1>
    </div>
    <b-form @submit.prevent>
      <b-form-group
        id="input-group-1"
        label="FenBefore:"
        label-for="input-1"
        description="Please enter the starting FEN of the puzzle"
      >
        <b-form-input
          id="input-1"
          v-model="puzzle.fenBefore"
          type="text"
          required
          placeholder="Enter FEN here"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Forced Line:"
        label-for="input-2"
        description="Please enter the forced line solving the puzzle"
      >
        <b-form-input
          id="input-2"
          v-model="puzzle.forcedLine"
          type="text"
          required
          placeholder="Enter forced line here"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" @click="onSubmit">{{ submitAction }}</b-button>
      <b-button type="reset" variant="danger" @click="resetForm">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      existingPuzzle: false,
      puzzle: Object,
      submitAction: 'Create Puzzle'
    }
  },
  mounted() {
    console.log('PuzzleData mounted.')
    this.resetForm()

    if (this.$route.params.id) {
      console.log(`id: ${this.$route.params.id}`)
      this.getPuzzle()
    }

    console.log(this.puzzle)
  },
  methods: {
    resetForm() {
      this.submitAction = 'Create Puzzle'
      this.existingPuzzle = false
      this.puzzle = {
        fenBefore: '',
        forcedLine: ''
      }
    },
    onSubmit() {
      console.log('Form submitted')
      if (this.existingPuzzle) {
          console.log('putting')
          this.tryPutPuzzle()
        } else {
          console.log('posting')
          this.tryPostPuzzle()
        }
    },
    getPuzzle() {
      Api.get(`/puzzles/${this.$route.params.id}`)
        .then(response => {
          console.log(response.data)
          this.puzzle = response.data
          this.submitAction = 'Update Puzzle'
          this.existingPuzzle = true
        })
        .catch(error => {
          this.puzzle = this.resetForm()
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    tryPostPuzzle() {
      if (this.checkPuzzle()) {
        console.log('All requirements met to post a puzzle.')
        this.postPuzzle()
      } else {
        console.log('Not all requirements have been met to post a puzzle.')
      }
    },
    tryPutPuzzle() {
      if (this.checkPuzzle()) {
        console.log('All requirements met to update the puzzle.')
        this.updatePuzzle()
      } else {
        console.log('Not all requirements to update the puzzle have been met.')
      }
    },
    postPuzzle() {
      Api.post('/puzzles', this.puzzle)
        .then(response => {
          // What are we gonna doe when a puzzle is successfully posted?
          console.log('New puzzle added to the database.')
          this.resetForm()
        })
        .catch(error => {
          console.log(error)
        })
    },
    updatePuzzle() {
      Api.put(`/puzzles/${this.puzzle._id}`, this.puzzle)
        .then(response => {
          // What are we gonna doe when a puzzle is successfully updated?
          console.log('Puzzle updated in the database.')
          this.resetForm()
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkPuzzle() {
      return this.checkFen() ? this.checkLine() : false
    },
    checkFen() {
      // check whether the notation of the given FEN is valid 
      // outside project scope
      return true
    },
    checkLine() {
      // check whether the given forcedLine is according to the requirements of the notation
      // outside the project scope
      return true
    }
  }
}
</script>

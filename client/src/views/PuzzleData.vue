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
          v-model="game.forcedLine"
          type="text"
          placeholder="Enter forced line here"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" @click="onSubmit">{{ submitAction }}</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { Api } from "@/Api";

export default {
  data() {
    return {
      puzzle: Object,
      submitAction: 'Create Puzzle'
    }
  },
  mounted() {
    console.log('PuzzleData mounted.')
    this.resetForm()
  }, 
  methods: {
    resetForm() {
      this.puzzle = {
        fenBefore = '',
        forcedLine = ''
      }
    },
    onSubmit() {
      console.log('Form submitted')
    }
  }
};
</script>

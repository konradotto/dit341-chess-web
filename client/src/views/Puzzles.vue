<template>
  <div class="container-fluid">
    <PuzzleTable type="Puzzle" :data="puzzles" :route="route" :delete="deletePuzzle" :deleteAll="deleteAllPuzzles"/>
  </div>
</template>

<script>
import PuzzleTable from '@/components/DataTable.vue'
import { Api } from '@/Api'

export default {
  components: {
    PuzzleTable
  },
  data() {
    return {
      authorized: false,
      route: '/puzzle_data',
      puzzles: []
    }
  },
  mounted() {
    this.getPuzzles()
  },
  methods: {
    getPuzzles() {
      Api.get('/puzzles')
        .then(reponse => {
          this.puzzles = reponse.data.puzzles
        })
        .catch(error => {
          this.puzzles = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deletePuzzle(puzzle) {
      if (confirm(`Do you really want to delete puzzle with id: ${puzzle._id}?`)) {
        Api.delete(`/puzzles/${puzzle._id}`)
          .then(response => {
            console.log(`Puzzle with id ${puzzle._id} deleted from the database.`)
            let index = this.puzzles.map(x => {
              return x._id
            }).indexOf(puzzle._id)
            this.puzzles.splice(index, 1)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    deleteAllPuzzles() {
      if (this.authorized) {
        if (confirm(`Do you really want to delete all puzzles permanently?`)) {
          Api.delete(`/puzzles`)
            .then(response => {
              console.log(`All puzzles deleted from the database.`)
              this.puzzles = []
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else {
        alert('You are not authorized to delete all puzzles!')
      }
    }
  }
}
</script>

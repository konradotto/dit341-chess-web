<template>
  <div>
    <b-jumbotron header="ChessMate" lead="Built with node.js and vue.js">
      <p> {{message}} </p>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {

    getMessage() {
      Api.get('/')
        .then(response => {
          if (response.status === 200) {
            this.message = 'Connected to backend'
          }
        })
        .catch(error => {
          console.log(error)
          this.message = 'Not connected to backend'
        })
    }
  }
}
</script>

<style>
.example-col {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: whitesmoke;
  border: 2px solid lightgray;
}
</style>

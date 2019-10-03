<template>
  <div id="app">
    <NavBar/>
    <b-container>
      <router-view/>
    </b-container>
    <div id="board1"></div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {}
  }
}
</script>

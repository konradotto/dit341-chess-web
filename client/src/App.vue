<template>
  <div id="app">
    <NavBar/>
    <b-container id="router-container">
      <router-view/>
    </b-container>
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

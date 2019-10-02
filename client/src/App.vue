<template>
  <div id="app">
    <NavBar/>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/camels">Camels</router-link> |
      <router-link to="/login">LoginPage</router-link> |
      <router-link to="/game">GamePage</router-link>
    </div>
    <b-container>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div class="navbar-container" >
    <b-navbar id="navbar-container-nav" toggleable="lg" type="dark" variant="info">
      <b-navbar-brand v-on:click="gotoHomePage">ChessMate</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

       <b-navbar-nav>
          <b-nav-item v-on:click="gotoHomePage">Home</b-nav-item>
          <b-nav-item v-on:click="gotoProfile">Profile</b-nav-item>
          <b-nav-item v-on:click="gotoMyGames">Played games</b-nav-item>
          <b-nav-item v-on:click="gotoGame">Game</b-nav-item>
          <b-nav-item v-on:click="gotoGames">Games</b-nav-item>
          <b-nav-item v-on:click="gotoPuzzles">Puzzles</b-nav-item>
          <b-nav-item v-on:click="gotoLogin">Login</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    gotoHomePage() { this.$router.push('/') },
    gotoMyGames() { this.$router.push('/mygames') },
    gotoLogin() { this.$router.push('/login') },
    gotoProfile() { this.$router.push('profile') },
    gotoGame() { this.$router.push('/game') },
    gotoGames() { this.$router.push('/games') },
    gotoPuzzles() { this.$router.push('/puzzles') }
  }
}
</script>

<template>
  <div class="login-container">
    <b-form @submit="loginPressed">
      <b-form-group id="input-group-1">
        <b-form-input
          v-model="username"
          type="text"
          required
          placeholder="Email/Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2">
        <b-form-input
          v-model="password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary"> Login </b-button>
      <b-button v-on:click="createAccountPressed"> Create account </b-button>
    </b-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      username: ''
    }
  },

  methods: {
    loginPressed(event) {
      event.preventDefault() // Prevents refresh (Default form behaviour)

      // Make API call and login and eventually change state to logged in
      this.$store.commit('setUser', this.username)
    },
    createAccountPressed(e) {
    }
  }
}
</script>

<style scoped>
.btn {
    margin: 0em 2em;
}
</style>

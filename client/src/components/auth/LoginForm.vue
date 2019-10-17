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
    </b-form>

  </div>
</template>

<script>
import { Api } from '@/Api'
import data from '@/data'

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

      Api.post('/users/login', { username: this.username, password: this.password })
        .then((resp) => {
          data.setUser(resp.data.userName)
          this.$router.push('profile')
        })
        .catch(err => {
          console.log(err.response)
          alert(err.response.data.message)
        })
    }
  }
}
</script>

<style scoped>
.btn {
  width: 100%;
  margin-left: 0;
  background: green;
  border: none;
}
</style>

<template>
  <div class="signup-form">
    <b-form @submit="createPressed">
      <b-form-group >
        <b-form-input
          v-model="firstName"
          type="text"
          required
          placeholder="First name"
        ></b-form-input>
      </b-form-group>

      <b-form-group >
        <b-form-input
          v-model="lastName"
          type="text"
          required
          placeholder="Last name"
        ></b-form-input>
      </b-form-group>

      <b-form-group >
        <b-form-input
          v-model="email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>

      <b-form-group >
        <b-form-input
          v-model="userName"
          type="text"
          required
          placeholder="Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group >
        <b-form-input
          v-model="passWord"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary"> Create account </b-button>
    </b-form>

  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    }
  },

  methods: {
    createPressed(event) {
      event.preventDefault() // Prevents refresh (Default form behaviour)

      const user = {
        userName: this.userName,
        passWord: this.passWord,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      }

      Api.post('/users', user)
        .then((resp) => {
          alert('Account created, user-id: ' + resp.data._id) // Will remove in production
          this.$store.commit('setUser', resp.data._id)
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

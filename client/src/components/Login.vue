<template>
  <div class="login-container">
    <b-form @submit="tryLogin" v-if="show">
      <b-form-group id="input-group-1" label="Username:" label-for="input-1" description="Please enter your username">
        <b-form-input
          id="input-1"
          v-model="login.username"
          type="text"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2" description="Please enter your password">
        <b-form-input
          id="input-2"
          v-model="login.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    tryLogin() {
      alert(JSON.stringify(this.login))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.login.username = ''
      this.login.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
.btn {
    margin: 0em 2em;
}
</style>

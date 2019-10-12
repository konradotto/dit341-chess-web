<template>
  <div class="container-fluid">
      <h1 class=profile-title> User profile </h1>
      <p> {{'Username: ' + userName}} </p>
      <p> {{'First name: ' + firstName}} </p>
      <p> {{'Last name: ' + lastName}} </p>
      <p> {{'email: ' + email}} </p>
      <button v-on:click="logOut"> Log out </button>
  </div>
</template>

<script>
import { Api } from '@/Api'
import data from '@/data'

export default {
  data() {
    return {
      userName: '',
      firstName: '',
      lastName: '',
      email: ''
    }
  },
  created() {
    const userId = data.getUser()
    if (userId) {
      Api.get('/users/' + userId)
        .then((resp) => {
          console.log(resp.data)
          this.userName = resp.data.userName
          this.firstName = resp.data.firstName
          this.lastName = resp.data.lastName
          this.email = resp.data.email
        })
        .catch(err => {
          console.log(err.response)
          alert(err.response.data.message)
        })
    }
  },
  methods: {
    logOut() {
      data.setUser(null)
      this.$router.push('login');
    }
  }
}
</script>

<style scoped>
.profile-title {
    margin-bottom: 60px;
}

button {
  color: red;
  border: none;
  border-radius: 5px;
  width: 100px;
}
</style>

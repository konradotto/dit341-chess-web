<template>
  <div class="container-fluid" id="profile-container">
      <h1 class=profile-title> User profile </h1>
      <h3> Display name </h3>
      <p> {{userName}} </p>

      <h3> First name </h3>
      <p> {{firstName}} </p>

      <h3> Last name </h3>
      <p> {{lastName}} </p>

      <h3> Email </h3>
      <p> {{email}} </p>

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
    let userId = data.getUser()
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
      data.setUser()
      this.$router.push('login')
    }
  }
}
</script>

<style scoped>
.profile-title {
    margin-bottom: 30px;
}

button {
  color: red;
  border: none;
  border-radius: 5px;
  width: 100px;
}

h3 {
  font-weight: bold;
  font-size: 20px;
}

p {
  margin-top: -10px;
}
</style>

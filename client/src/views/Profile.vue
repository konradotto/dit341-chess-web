<template>
  <div class="container-fluid">
      <h1 class=profile-title> {{userName + '\' profile'}} </h1>
      <p> {{'Username: ' + userName}} </p>
      <p> {{'First name: ' + firstName}} </p>
      <p> {{'Last name: ' + lastName}} </p>
      <p> {{'email: ' + email}} </p>
  </div>
</template>

<script>
import { Api } from '@/Api'
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
    if (this.$store.state.userId) {
      Api.get('/users/' + this.$store.state.userId)
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
  }
}
</script>

<style scoped>
.profile-title {
    margin-bottom: 60px;
}
</style>

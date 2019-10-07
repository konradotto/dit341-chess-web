<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="2" offset="5" md="4" offset-md="4">
        <Login v-if="loginFormVisible"/>
        <Signup v-if="!loginFormVisible"/>
        <button v-on:click="showSignUpForm" id=createAccountBtn>{{switchFormButtonCaption}}</button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Signup from '@/components/Signup'

export default {
  components: {
    Login,
    Signup
  },
  data() {
    return {
      loginFormVisible: true,
      switchFormButtonCaption: 'Sign up'
    }
  },
  methods: {
    showSignUpForm() {
      this.loginFormVisible = !this.loginFormVisible

      if (this.loginFormVisible) {
        this.switchFormButtonCaption = 'Sign up'
      } else {
        this.switchFormButtonCaption = 'Already have an account?'
      }
    }
  }
}
</script>

<style scoped>
#createAccountBtn {
  color: #69eaff;
  background: none;
  border: none;
  font-style: italic;
}
</style>

<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="2" offset="5" md="4" offset-md="4">
        <Login/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Login from '@/components/Login'

export default {
  components: {
    Login
  },
  data() {
    return {}
  }
}
</script>

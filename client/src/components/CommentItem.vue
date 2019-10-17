<template>
    <div class="comment-container">
      <b-list-group horizontal>
        <b-list-group-item>
            {{ user }}:  {{ comment.comment }}
        </b-list-group-item>
          <b-button variant="warning" class="button" @click="$emit('edit-comment', comment._id)">&times;</b-button>
          <b-button variant="outline-danger" class="button" @click="$emit('delete-comment', comment._id)">&times;</b-button>
      </b-list-group>
    </div>
</template>

<script>
// import { Api } from '@/Api'

export default {
  name: 'comment-item',
  props: ['comment', 'user']
  // data() {
  //   let uName = this.getUserName()
  //   return {
  //     userName: uName
  //   }
  // },
  // mounted() {
  //   this.getUserName()
  // },
  // methods: {
  //   getUserName: () => {
  //     Api.get(`users/${this.comment.userId}`)
  //       .then(response => {
  //         console.log(`UserId: ${this.comment.userId}`)
  //         console.log(`Response: ${response.data}`)
  //         return response.data.users.userName
  //       })
  //       .catch(error => {
  //         console.log(error)
  //         return 'Unknown'
  //       })
  //       .then(() => {
  //         // This code is always executed (after success or error).
  //       })
  //   }
  // }
}
</script>

<template>
    <div class="comment-list">
      <h1>List of {{ comments.length }} comments</h1>
      <b-list-group>
        <comment-item v-for="comment in comments" :key="comment.userName" :comment="comment" @edit-comment="editComment" @delete-comment="deleteComment"></comment-item>
      </b-list-group>
      <div class="comment-box">
          <textarea v-model="message" placeholder="add multiple lines"></textarea>
          <b-button variant="success" class="createButton" @click="createComment(message)">Create Comment</b-button>
      </div>
    </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
import { Api } from '@/Api'

export default {
  name: 'comment-composite',
  data() {
    return {
      comments: []
    }
  },
  mounted() {
    this.getComments()
  },
  methods: {
    getComments() {
      // 1 Is just a placeholder for the actual gameId you'll eventually get from the actual game page.
      Api.get('games/1/comments')
        .then(reponse => {
          this.comments = reponse.data.comments
        })
        .catch(error => {
          this.comments = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deleteComment(id) {
      Api.delete(`/comments/${id}`)
        .then(response => {
          console.log(response.data.message)
          var index = this.comments.findIndex(comment => comment._id === id)
          this.comments.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Doesn't work for some reason
    editComment(id, message) {
      console.log('Message to be put:' + message)
      var comment = {
        comment: message
      }
      Api.put(`/comments/${id}`, comment)
        .then(response => {
          console.log(response.data.message)
          var index = this.comments.findIndex(comment => comment._id === id)
          this.comments.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Is actually only gonna work for existing users
    createComment(message) {
      var comment = {
        comment: message,
        userName: 'tmp',
        gameId: 1
      }
      Api.post('/comments', comment)
        .then(response => {
          this.camels.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    CommentItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-box {
  margin-top: 5%
}
</style>

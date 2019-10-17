<template>
    <div class="comment-list">
      <h1 class="comment-header">List of {{ comments.length }} comments</h1>
      <b-list-group>
        <comment-item v-for="(comment, index) in passComments" :key="index" :comment="comment" :user="userNames[index]" @edit-comment="editComment" @delete-comment="deleteComment">{{comment}}</comment-item>
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
import data from '@/data'

export default {
  name: 'comment-composite',
  props: {
    gameId: String
  },
  data() {
    return {
      comments: [],
      passComments: [],
      userNames: [],
      message: ''
    }
  },
  mounted() {
    this.getComments()
  },
  methods: {
    getComments() {
      // TODO: use actual game id
      // 1 Is just a placeholder for the actual gameId you'll eventually get from the actual game page.
      Api.get(`games/${this.gameId}/comments`)
        .then(response => {
          this.comments = response.data.comments
        })
        .catch(error => {
          this.comments = []
          console.log(error)
        })
        .then(() => {
          this.matchUsers()
        })
    },
    matchUsers() {
      let users
      Api.get('users')
        .then(res => {
          users = res.data.users
        })
        .catch(error => {
          users = []
          console.log(error)
        })
        .then(() => {
          if (users) {
            this.userNames = []
            this.comments.forEach(comment => {
              let index = users.map(x => {
                return x._id
              }).indexOf(comment.userId)
              this.userNames.push(index === -1 ? 'Unknown' : users[index].userName)
            })
          }
          this.passComments = this.comments
        })
    },
    deleteComment(id) {
      Api.delete(`/comments/${id}`)
        .then(response => {
          console.log(response.data)
          var index = this.comments.findIndex(comment => comment._id === id)
          this.comments.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.matchUsers()
        })
    },
    // Doesn't work for some reason
    editComment(id) {
      console.log('Message to be put:' + this.message)
      var comment = {
        comment: this.message,
        userId: '',
        gameId: this.gameId
      }
      Api.put(`/comments/${id}`, comment)
        .then(response => {
          console.log(response.data.comments)
          var index = this.comments.findIndex(comment => comment._id === id)
          this.comments.splice(index, 1, comment)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Is actually only gonna work for existing users
    createComment(message) {
      var comment = {
        comment: message,
        userId: data.getUser(),
        gameId: this.gameId
      }
      console.log(comment)
      Api.post('/comments', comment)
        .then(response => {
          this.comments.push(response.data)
          console.log('Comment added to the db :)')
        })
        .catch(error => {
          console.log(error)
          console.log('Error posting comment :(')
        })
        .then(() => {
          this.matchUsers()
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

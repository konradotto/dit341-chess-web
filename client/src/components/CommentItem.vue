<template>
    <div>
      <b-list-group horizontal>
        <b-list-group-item>
            {{ comment.userName }}:  {{ comment.comment }}
        </b-list-group-item>
          <b-button variant="warning" class="button" @click="$emit('edit-comment', comment._id)">&times;</b-button>
          <b-button variant="outline-danger" class="button" @click="$emit('delete-comment', comment._id)">&times;</b-button>
      </b-list-group>
    </div>
</template>

<script>

export default {
  name: 'comment-item',
  props: ['comment']
}
</script>

<template>
  <div class="datatable-container">
    <h1>{{ type }} in our Database</h1>
    <b-table
      striped
      hover
      :items="data"
      @select="selectElement"
    >
      <template v-slot:cell(name)="data">
        <router-link :to="`/data/${type}/${data[index]._id}`">{{ data.value }}</router-link>
      </template>
    </b-table>
    <b-button variant="outline-primary" @click="createElement">Add {{ type }}</b-button>
    <b-button v-if="elementSelected">Remove</b-button>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    data: Array
  },
  data() {
    return {
      elementSelected: false
    }
  },
  method: {
    selectElement() {
      this.elementSelected = true
    },
    createElement() {
      this.elementSelected = false
    }
  }
}
</script>

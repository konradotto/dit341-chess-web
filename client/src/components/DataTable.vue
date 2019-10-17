<template>
  <div class="datatable-container">
    <h1>{{ type }}s in our Database</h1>
    <b-table
      sticky-header="1000px"
      striped
      hover
      :items="data"
      selectable
      select-mode=single
      selected-variant="active"
      @row-selected="onRowSelected"
    >
      <template v-slot:cell(selected)="
      { selectedElement }">
      </template>
    </b-table>
    <div id="btn-container">
      <router-link :to="route">
        <b-button variant="outline-primary" @click="createElement()">Add {{ type }}</b-button>
      </router-link>
      <div id="btn-spacer" :v-if="elementSelected"/>
      <b-button v-if="canView()" variant="outline-primary" @click="showElement()">Show</b-button>
      <div id="btn-spacer" :v-if="elementSelected"/>
      <b-button variant="outline-primary" v-if="elementSelected" @click="editElement">Edit</b-button>
      <div id="btn-spacer" :v-if="elementSelected"/>
      <b-button variant="outline-danger" v-if="elementSelected" @click="deleteElement">Delete</b-button>
      <div id="btn-spacer"/>
      <b-button variant="outline-danger" @click="deleteCollection">Delete All</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    route: String,
    viewRoute: String,
    data: Array,
    delete: Function,
    deleteAll: Function
  },
  data() {
    return {
      elementSelected: false,
      selectedElement: {}
    }
  },
  methods: {
    canView() {
      return (this.elementSelected && this.viewRoute)
    },
    showElement() {
      this.$router.push({ path: `${this.viewRoute}/${this.selectedElement._id}` })
    },
    onRowSelected(item) {
      console.log(item)
      if (item.length === 0) {
        this.selectedElement = {}
        this.elementSelected = false
      } else {
        this.elementSelected = true
        this.selectedElement = item[0]
      }
    },
    selectElement() {
      console.log('element selected')
      this.elementSelected = true
    },
    createElement() {
      this.elementSelected = false
    },
    editElement() {
      this.elementSelected = false
      this.$router.push({ path: `/${this.type.toLowerCase()}_data/${this.selectedElement._id}` })
    },
    deleteElement() {
      this.delete(this.selectedElement)
    },
    deleteCollection() {
      this.deleteAll()
    }
  }
}
</script>

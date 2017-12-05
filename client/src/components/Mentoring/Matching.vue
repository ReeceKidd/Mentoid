<template>
   <div class="container">
    
    <h1 class="text-center">Users</h1>

    <div class="row">
        <table class="table table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>Username</td>
          <td>Hobbies</td>
          <td>Actions</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item._id">
          <td>{{ item._id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <router-link :to="{name: 'EditItem', params: { id: item._id }}" class="btn btn-primary">Edit</router-link>
          </td>
          <td>
            <button class="btn btn-danger" v-on:click="deleteItem(item._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created: function() {
    this.fetchItems()
  },
  methods: {
    fetchItems() {
      let uri = 'http://localhost:4000/items'
      this.axios.get(uri).then(response => {
        this.items = response.data
      })
    }
  }
}
</script>

<style>

</style>

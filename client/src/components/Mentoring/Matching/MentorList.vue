<template>
  <div class="container">

    <div class="row">
      <h1 class="text-center"> Potential Mentors </h1>
    </div>


    <div class="row" v-for="user in users" :key="user._id">
      <h4 class="text-center"> {{ user.userName }}</h4>
      <h4> {{ user.hobbyInputs }} </h4>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        users: []
      }
    },
    created: function () {
      this.fetchUsers()
    },
    methods: {
      fetchUsers() {
        let uri = 'http://localhost:4000/users'
        this.axios.get(uri).then(response => {
          this.users = response.data
        })
      }
    }
  }
</script>

<style>
</style>

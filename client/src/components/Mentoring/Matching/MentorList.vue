<template>
  <div class="container">

    <div class="row">
      <h1 class="text-center"> Potential Mentors </h1>
    </div>

  <div>
    {{ areasOfInterest }}
    {{ users }}
  </div>

    <div class="row text-center">
      <button class="btn btn-primary" @click="matchMentors()">Find Mentors</button>
    </div>

    <br>

  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        users: [],
        currentUser: this.$store.state.user.authUser,
        areasOfInterest: [],
        matchedMentors: ''
      }
    },
    created: function () {
      this.fetchUsers()
      const userID = this.$store.state.user.authUser._id
      const apiUrl = 'http://localhost:4000/get/areas-of-interest/'
      var self = this
      axios.get(apiUrl + userID).then(function (response) {
        self.areasOfInterest = response.data.areasOfInterest
      })
    },
    methods: {
      fetchUsers() {
        let uri = 'http://localhost:4000/admin/get-users'
        this.axios.get(uri).then(response => {
          console.log(response)
          this.users = response.data
        })
      }
    }
  }
</script>

<style>


</style>

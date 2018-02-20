<template>
  <div class="container">

    <div class="row">
      <h1 class="text-center"> Potential Mentors </h1>
    </div>

    <div class="row text-center">
      <button class="btn btn-primary" @click="matchMentors()">Find Mentors</button>
    </div>

    <!-- Advanced search options -->
    <div class="row">
      <h3 class="text-center"> What area of interest are you searching for? </h3>
      <!-- Mentor Preferences Component -->
      <!-- This will have the exact same functionality as the mentor preferences component a search will be performed for 
            each area that is ticked.  -->
      <!-- End of mentor preferences component -->
    </div>

    <!-- This will perform a random search across all areas of interest might only return one match -->
    <div class="row">
      <p class="text-center"> I'm feeling lucky</p>
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
        userID: this.$store.state.user.authUser._id,
        areasOfInterest: [],
        matchedMentors: []
      }
    },
    created: function () {
      // It might be a good idea to start searching immediately on page load to speed up response time.
      const userID = this.$store.state.user.authUser._id
      const apiUrl = 'http://localhost:4000/get/areas-of-interest/'
      var self = this
      axios.get(apiUrl + userID).then(function (response) {
        self.areasOfInterest = response.data.areasOfInterest
      })
    },
    methods: {
      matchMentors() {
        var self = this
        var getPotentialMentorsURL = 'http://localhost:4000/get/potential-mentors/'
        axios.get(getPotentialMentorsURL + this.userID).then(function (response) {
          console.log(response)
          self.matchedMentors = response.data.matchedMentors
        })
      }
    }
  }
</script>

<style>


</style>

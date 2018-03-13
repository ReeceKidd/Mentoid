<template>
  <div class="container fullPage">
    <div class="row text-right">
      <div class="col-xs-12 col-sm-12">
        <p>
          <a href='edit-profile#mentee-preferences'> Change your Mentee settings
            <i class="fas fa-cog"></i>
          </a>
        </p>
      </div>
    </div>

    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 displayBox">
        <h1> Find your perfect Mentor </h1>
        <br>
        <button class="btn btn-primary btn-lg" @click="matchMentors()">Find Mentors</button>
        <br>
        <br>
      </div>
    </div>

    <br class="hidden-xs">
    <br class="hidden-xs">

    <div v-if="potentialInPersonMentors !== null">
      <in-person-matches :mentors=potentialInPersonMentors></in-person-matches>
    </div>

    <div v-if="potentialOnlineMentors !== null">
      <online-matches :mentors=potentialOnlineMentors></online-matches>
    </div>

    <div v-if="potentialOnlineAndInPersonMentors !== null">
      <online-and-in-person-matches :mentors=potentialOnlineAndInPersonMentors></online-and-in-person-matches>
    </div>
  

  </div>

</template>
<script>
  import axios from 'axios'
  import InPersonMatches from './GetMentorsLists/InPerson.vue'
  import OnlineMatches from './GetMentorsLists/Online.vue'
  import OnlineAndInPersonMatches from './GetMentorsLists/OnlineAndInPerson.vue'
  export default {
    data() {
      return {
        currentUserID: this.$store.state.user.authUser._id,
        potentialInPersonMentors: null,
        potentialOnlineMentors: null,
        potentialOnlineAndInPersonMentors: null
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      // Get username.
      const getUserNameURL = 'http://localhost:4000/get/user-name/'
      axios.get(getUserNameURL + userID).then(function (response) {
        self.userName = response.data.userName
      })
      // Get the users areas of interest
      const getAreasOfInterestUrl = 'http://localhost:4000/get/areas-of-interest/'
      axios.get(getAreasOfInterestUrl + userID).then(function (response) {
        self.areasOfInterest = response.data.areasOfInterest
      })
    },
    methods: {
      matchMentors() {
        this.potentialInPersonMentors = null
        this.potentialOnlineMentors = null
        this.potentialOnlineAndInPersonMentors = null
        var self = this
        console.log('Attempting to match mentors.')
        var getPotentialMentorsURL = 'http://localhost:4000/get/potential-mentors/' + this.currentUserID + '/' + this.userName +
          '/' + this.sortType
        axios.get(getPotentialMentorsURL)
          .then(response => {
            console.log(response)
            if (response.data.inPersonMentors) {
              console.log('Received in person mentors')
              self.potentialInPersonMentors = response.data.inPersonMentors
            } else if (response.data.onlineMentors) {
              console.log('Received online mentors')
              self.potentialOnlineMentors = response.data.onlineMentors
            } else if (response.data.onlineAndInPersonMentors) {
              console.log('Received online and in person mentors')
              self.potentialOnlineAndInPersonMentors = response.data.onlineAndInPersonMentors
            }
          })
          .catch(errors => {
            console.log(errors)
          })
      }
    },
    components: {
      InPersonMatches,
      OnlineMatches,
      OnlineAndInPersonMatches
    }
  }
</script>
<style scoped>


</style>

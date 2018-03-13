<template>
  <div class="container fullPage">
    <div class="row text-right">
      <div class="col-xs-12 col-sm-12">
        <p>
          <a href='edit-profile#mentor-settings'> Change your Mentor settings
            <i class="fas fa-cog"></i>
          </a>
        </p>
      </div>
    </div>

    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 displayBox">
        <h1> Find the perfect Mentee </h1>
        <br>
        <button class="btn btn-primary btn-lg" @click="matchMentees()">Find Mentees</button>
        <br>
        <br>
      </div>
    </div>

    <br class="hidden-xs">
    <br class="hidden-xs">

    <div v-if="potentialInPersonMentees !== null">
      <in-person-matches :mentors=potentialInPersonMentees></in-person-matches>
    </div>

    <div v-if="potentialOnlineMentees !== null">
      <online-matches :mentors=potentialOnlineMentees></online-matches>
    </div>

    <div v-if="potentialOnlineAndInPersonMentees !== null">
      <online-and-in-person-matches :mentors=potentialOnlineAndInPersonMentees></online-and-in-person-matches>
    </div>
  

  </div>

</template>
<script>
  import axios from 'axios'
  import InPersonMatches from './GetMenteesLists/InPerson.vue'
  import OnlineMatches from './GetMenteesLists/Online.vue'
  import OnlineAndInPersonMatches from './GetMenteesLists/OnlineAndInPerson.vue'
  export default {
    data() {
      return {
        currentUserID: this.$store.state.user.authUser._id,
        potentialInPersonMentees: null,
        potentialOnlineMentees: null,
        potentialOnlineAndInPersonMentees: null
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
      matchMentees() {
        this.potentialInPersonMentees = null
        this.potentialOnlineMentees = null
        this.potentialOnlineAndInPersonMentees = null
        var self = this
        console.log('Attempting to match mentees.')
        var getPotentialMenteessURL = 'http://localhost:4000/get/potential-mentees/' + this.currentUserID + '/' + this.userName +
          '/' + this.sortType
        axios.get(getPotentialMenteessURL)
          .then(response => {
            console.log(response)
            if (response.data.inPersonMentees) {
              console.log('Received in person mentors')
              self.potentialInPersonMentees = response.data.inPersonMentees
            } else if (response.data.onlineMentees) {
              console.log('Received online mentors')
              self.potentialOnlineMentees = response.data.onlineMentees
            } else if (response.data.onlineAndInPersonMentees) {
              console.log('Received online and in person mentors')
              self.potentialOnlineAndInPersonMentees = response.data.onlineAndInPersonMentees
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

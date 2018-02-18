<template>
  <div class="container">
    <div class="col-xs-12">
      <div class="row text-center">
        <p v-if="profilePictureUploaded"> Upload Profile Picture <i class="fas fa-check"></i></p>
        <p v-else> <a href="#profile-picture"> Upload Profile Picture </a> </p>
        <p v-if="socialMediaComplete" class="complete"> Update Social Media  <i class="fas fa-check"></i></p>
        <p v-else> <a href="#social-media"> Update Social Media </a> </p>
        <p v-if="areasOfInterestRegistrationComplete" class="complete"> Update Areas of Interest  <i class="fas fa-check"></i></p>
        <p v-else> <a href="#areas-of-interest"> Update Areas of Interest </a> </p>
        <p v-if="educationRegistrationComplete" class="complete"> Update Education <i class="fas fa-check"></i></p>
        <p v-else><a href="#education"> Update Education </a> </p>
        <p v-if="jobHistoryRegistrationComplete" class="complete"> Update Job history <i class="fas fa-check"></i>   </p>
        <p v-else><a href="#job-history"> Update Job History </a> </p>
        <p v-if="mentorPreferencesComplete"> Update Mentor Preferences <i class="fas fa-check"></i></p>
        <p v-else> <a href="#mentoring-preferences"> Update your Mentor preferences </a> </p>
        <p v-if="menteePreferencesComplete"> Update Mentee preferences <i class="fas fa-check"></i> </p>
        <p v-else> <a href="#mentee-preferences"> Update your Mentee preferences </a></p>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        socialMediaComplete: false,
        areasOfInterestRegistrationComplete: false,
        jobHistoryRegistrationComplete: false,
        educationRegistrationComplete: false,
        profilePictureUploaded: false,
        mentorPreferencesComplete: false,
        menteePreferencesComplete: false
      }
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      const getProfileCompletenessURL = 'http://localhost:4000/get/profile-completeness/'
      axios.get(getProfileCompletenessURL + userID).then(function (response) {
        self.socialMediaComplete = response.data.socialMediaComplete
        self.areasOfInterestRegistrationComplete = response.data.areasOfInterestRegistrationComplete
        self.jobHistoryRegistrationComplete = response.data.jobHistoryRegistrationComplete
        self.educationRegistrationComplete = response.data.educationRegistrationComplete
        self.profilePictureUploaded = response.data.profilePictureUploaded
        self.mentorPreferencesComplete = response.data.mentorPreferencesComplete
        self.menteePreferencesComplete = response.data.menteePreferencesComplete
      })
    }
  }
</script>

<style>
.complete {
    color: green;
}

</style>

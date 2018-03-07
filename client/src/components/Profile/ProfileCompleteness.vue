<template>
      <div>
        <p v-if="hasProfilePicture" class="complete"> Upload Profile Picture
          <i class="fas fa-check"></i>
        </p>
        <p v-else>
          <a href="#profile-picture"> Upload Profile Picture </a>
        </p>
        <p v-if="socialMediaComplete" class="complete"> Update Social Media
          <i class="fas fa-check"></i>
        </p>
        <p v-else>
          <a href="#social-media"> Update Social Media </a>
        </p>
        <p v-if="areasOfInterestRegistrationComplete" class="complete"> Update Areas of Interest
          <i class="fas fa-check"></i>
        </p>
        <p v-else>
          <a href="#areas-of-interest"> Update Areas of Interest </a>
        </p>
        <p v-if="educationRegistrationComplete" class="complete"> Update Education
          <i class="fas fa-check"></i>
        </p>
        <p v-else>
          <a href="#education"> Update Education </a>
        </p>
        <p v-if="jobHistoryRegistrationComplete" class="complete"> Update Job history
          <i class="fas fa-check"></i>
        </p>
        <p v-else>
          <a href="#job-history"> Update Job History </a>
        </p>
        <p v-if="mentorSettingsComplete" class="complete"> Update Mentor Settings
          <i class="fas fa-check"></i>
        </p>
        <p v-else>
          <a href="#mentoring-preferences"> Update your Mentor Settings </a>
        </p>
        <p v-if="menteeSettingsComplete" class="complete"> Update Mentee Settings
          <i class="fas fa-check"></i>
        </p>
        <p v-else>
          <a href="#mentee-preferences"> Update your Mentee Settings </a>
        </p>
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
        hasProfilePicture: false,
        mentorSettingsComplete: false,
        menteeSettingsComplete: false
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
        self.hasProfilePicture = response.data.hasProfilePicture
        self.mentorSettingsComplete = response.data.mentorSettingsComplete
        self.menteeSettingsComplete = response.data.menteeSettingsComplete
      })
    }
  }
</script>

<style>
  .complete {
    color: green;
  }

</style>

<template>
  <div class="container-fluid">
    <div class="row text-center">
      <div class="col-xs-12" id="profileImageBorder">
        <span v-if="profileImageLoaded">
          <img :src="profilePictureURL" id="profilePictureAvatar" @error="imageLoadError">
        </span>
        <img src='../../assets/userAvatar.png' v-else id="profilePictureAvatar">
        <br>
        <h3> {{firstName }} {{ lastName }}</h3>
        <h4> @{{ currentUser.userName }}</h4>
      </div>
    </div>

    <hr>

    <div class="row text-center">
      <div class="col-xs-12">
        <h2> SOCIAL MEDIA </h2>
        <edit-social-media></edit-social-media>
      </div>
    </div>

    <hr>

    <div class="row text-center">
      <div class="col-xs-12">
        <h2 class="text-center">
           PROFILE COMPLETENESS
          <br>
          <br>
          <profile-completeness></profile-completeness>
        </h2>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">
          AREAS OF INTEREST
        </h2>
        <br>
        <edit-areas-of-interest></edit-areas-of-interest>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">
          EDUCATION
        </h2>
        <br>
        <edit-education-history></edit-education-history>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">
          JOB HISTORY
        </h2>
        <br>
        <edit-job-history></edit-job-history>
      </div>
    </div>

    <hr>

    <div class="row">
    <div class="col-xs-12">
        <h2 class="text-center">
           MENTORING PREFERENCES 
        </h2>
        <edit-mentor-preferences></edit-mentor-preferences>
      </div>
    </div>

    <hr>

   <div class="row">
    <div class="col-xs-12">
        <h2 class="text-center">
           MENTEE PREFERENCES 
        </h2>
        <edit-mentee-preferences></edit-mentee-preferences>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileCompleteness from './ProfileCompleteness.vue'
  import EditSocialMedia from '../Register/Forms/SocialMedia.vue'
  import EditAreasOfInterest from '../Register/Forms/AreasOfInterest.vue'
  import EditEducationHistory from '../Register/Forms/Education.vue'
  import EditJobHistory from '../Register/Forms/JobHistory.vue'
  import EditMenteePreferences from '../Register/Forms/MenteePreferences.vue'
  import EditMentorPreferences from '../Register/Forms/MentorPreferences.vue'

  import axios from 'axios'
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'
  export default {
    data() {
      return {
        currentUser: this.$store.state.user.authUser,
        firstName: 'Undefined',
        lastName: 'Undefined',
        email: 'Undefined',
        profilePictureURL: getProfilePictureURL + this.$store.state.user.authUser._id,
        profileImageLoaded: true,
        profileCompleteness: {}
      }
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      },
      imageLoadError() {
        this.profileImageLoaded = false
        console.log('User does not have a profile picture')
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      const getBasicRegistration = 'http://localhost:4000/get/basic-registration/'
      axios.get(getBasicRegistration + userID).then(function (response) {
        self.firstName = response.data.userInfo.firstName
        self.lastName = response.data.userInfo.lastName
        self.email = response.data.userInfo.email
      })
    },
    components: {
      ProfileCompleteness,
      EditSocialMedia,
      EditAreasOfInterest,
      EditEducationHistory,
      EditJobHistory,
      EditMenteePreferences,
      EditMentorPreferences
    }
  }
</script>
<style scoped>
  #profilePictureAvatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  #profilePictureAvatar:hover {
    background: rgba(0, 0, 0, 0.75);
    text-align: center;
    opacity: 0.5;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
  }

</style>

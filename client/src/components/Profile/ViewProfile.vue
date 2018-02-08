<template>
  <div class="container">
    <div class="col-xs-12">
      <div class="row text-center">
        <img :src="profilePictureURL" id="profilePictureAvatar" @error="imageLoadError">
        <br>
        <h3> {{currentUser.firstName }} {{ currentUser.lastName }}</h3>
        <h4> @{{ currentUser.userName }}</h4>
      </div>
    </div>

    <div class="col-xs-12">
      <div class="row">
        <h2 class="text-center">
          <u> Profile Completeness </u>
        </h2>
        <!--<p v-if="profileCompleteness.areasOfInterestRegistrationComplete"> Register Areas Of Interest</p>!-->
        <p>{{ profileCompleteness }}</p>
      </div>
    </div>

    <div class="col-xs-12">
      <div class="row">
        <h2 class="text-center">
          <u> Areas of interest </u>
        </h2>
        <edit-areas-of-interest></edit-areas-of-interest>
      </div>
    </div>

    <div class="col-xs-12">
      <div class="row">
        <h2 class="text-center">
          <u> Job History </u>
        </h2>
        <edit-areas-of-interest></edit-areas-of-interest>
      </div>

      <div class="col-xs-12">
        <div class="row">
          <h2 class="text-center">
            <u> Mentoring preferences </u>
          </h2>
          <edit-areas-of-interest></edit-areas-of-interest>
        </div>
      </div>

      <div class="col-xs-12">
        <div class="row">
          <h2 class="text-center">
            <u> Mentee preferences </u>
          </h2>
          <edit-areas-of-interest></edit-areas-of-interest>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EditAreasOfInterest from './EditProfile/AreasOfInterest.vue'
  import axios from 'axios'
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'
  export default {
    data() {
      return {
        currentUser: this.$store.state.user.authUser,
        profilePictureURL: getProfilePictureURL + this.$store.state.user.authUser._id,
        profileImageLoaded: true,
        profileCompleteness: {}
      }
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      },
      logout() {
        this.$store
          .dispatch('logout', {
            _id: this._id
          })
          .catch(e => {
            this.errorMessage = e.message
          })
      },
      imageLoadError() {
        this.profileImageLoaded = false
        console.log('User does not have a profile picture')
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      const getProfileCompletenessURL = 'http://localhost:4000/get/profile-completeness/'
      axios.get(getProfileCompletenessURL + userID).then(function (response) {
        self.profileCompleteness = response.data
      })
    },
    components: {
      EditAreasOfInterest
    }
  }
</script>
<style scoped>
  #profilePictureAvatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

</style>

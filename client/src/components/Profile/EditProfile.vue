<template>
  <div class="container">
      <div class="col-xs-8 text-center">
        <br>
        // Redirects to seperate profile picture change page. 
        <img :src="profilePictureURL" id="profilePictureURL" @error="imageLoadError">
        <br>
        <h2> {{ firstName }} {{ lastName }}</h2>
        <h3>@{{ userName }}</h3>
        <div class="row">
          <div class="col-xs-12">
            //Edit Basic Details drop down menu.
          </div>
          <div class="col-xs-12">
            //Edit Areas of Interest.
          </div>
          <div class="col-xs-12">
            //Edit Job History.
          </div>
        </div>
      </div>
      <div class="col-xs-4">
        <h3> Tasks to complete </h3>
        -- complete basic registration. 
        -- complete areas of interest. 
        -- complete job history 
        -- complete education. 
        -- upload a profile picture. 
        -- set your mentoring preferences. 
        -- set your mentee preferences. 
        -- follow someone on social . 
        -- like your first piece of content. 
        -- Get your first Mentor. 
        -- Get your first Mentee. 
        -- Participate in your first path.
        <h4> Profile completeness and a percentage bar. </h4> 
        </div>
      </div>
</template>

<script>
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'

  export default {
    data() {
      return {
        _id: '',
        userName: this.$store.state.user.authUser.userName,
        firstName: this.$store.state.user.authUser.firstName,
        lastName: this.$store.state.user.authUser.lastName,
        profilePictureURL: getProfilePictureURL + this.$store.state.user.authUser._id,
        profileImageLoaded: true
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
    }
  }

</script>

<style scoped>
  #profilePictureURL {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

</style>

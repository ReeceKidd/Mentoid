<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 text-center">
        <h1> Please upload a profile picture </h1>
      </div>
    </div>

    <br>
    
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 text-center displayBox">  
        <upload-profile-picture></upload-profile-picture>
        <br>
      </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <hr>

        <!-- Desktop version of registration buttons -->
        <span class="hidden-xs">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/register-education')">
            <i class="fas fa-arrow-left"></i> Previous: Education</button>
        </span>
        <span class="hidden-xs">
          <button style="float: right" class="btn btn-md btn-primary" @click="navigateTo('/mentor-settings')"> Next: Mentor Preferences
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- End of desktop version -->

        <!-- Mobile version of registration buttons -->
        <span class="visible-xs text-center">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/register-education')">
            <i class="fas fa-arrow-left"></i> Previous: Education</button>
        </span>
        <br class="visible-xs">
        <span class="visible-xs text-center">
          <button class="btn btn-md btn-primary" @click="navigateTo('/mentor-settings')"> Next: Mentor Preferences
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- End of mobile version --> 
      </div>
    </div>
  </div>
  
</template>

<script>
  import UploadProfilePicture from './Forms/UploadProfilePicture.vue'

  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    components: {
      UploadProfilePicture
    }
  }
</script>
<style>
  .successMessage {
    color: green;
  }

  .uploadImage {
    max-width: 200px;
    max-height: 200px;
  }

</style>

<template>
  <div class="container">
    <mentor-preferences-form></mentor-preferences-form>

     <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">  
        <hr>

        <!-- Desktop -->
        <span class="hidden-xs">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/upload-profile-picture')">
            <i class="fas fa-arrow-left"></i> Previous: Upload Profile Picture</button>
        </span>
        <span class="hidden-xs">
          <button style="float: right" class="btn btn-md btn-primary" @click="navigateTo('/mentee-preferences')"> Next: Mentee Preferences
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- Desktop version -->

        <!-- Mobile-->
        <span class="visible-xs text-center">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/upload-profile-picture')">
            <i class="fas fa-arrow-left"></i> Previous: Upload Profile Picture</button>
        </span>
        <br class="visible-xs">
        <span class="visible-xs text-center">
          <button class="btn btn-md btn-primary" @click="navigateTo('/mentee-preferences')"> Next: Mentee Preferences
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- Mobile version --> 
      </div>
    </div>
  </div>
</template>
<script>
  import MentorPreferencesForm from './Forms/MentorPreferences.vue'

  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    components: {
      MentorPreferencesForm
    }
  }
</script>

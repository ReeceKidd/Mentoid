<template>
  <div class="container">
    <mentee-preferences-form></mentee-preferences-form>

     <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">  
        <hr>

        <!-- Desktop -->
        <span class="hidden-xs">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/mentor-preferences')">
            <i class="fas fa-arrow-left"></i> Previous: Mentor preferences</button>
        </span>
        <span class="hidden-xs">
          <button style="float: right" class="btn btn-md btn-primary" @click="navigateTo('/social-media-details')"> Next: Social Media
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- Desktop version -->

        <!-- Mobile-->
        <span class="visible-xs text-center">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/mentor-preferences')">
            <i class="fas fa-arrow-left"></i> Previous: Mentor preferences</button>
        </span>
        <br class="visible-xs">
        <span class="visible-xs text-center">
          <button class="btn btn-md btn-primary" @click="navigateTo('/social-media-details')"> Next: Social Media
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- Mobile version --> 
      </div>
    </div>
  </div>
</template>
<script>
  import MenteeSettingsForm from './Forms/MenteeSettings.vue'

  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    components: {
      MenteeSettingsForm
    }
  }
</script>

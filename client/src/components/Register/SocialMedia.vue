<template>

<div class="container">
    <div class="row text-center">
        <div class="col-xs-12">
            <h2> Where can other Members find you? </h2>
        </div>
    </div>
    <div class="row">
        <!-- Imported component -->
        <social-media-form></social-media-form>
    </div>
     <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">  
        <hr>
    <!-- Desktop -->
        <span class="hidden-xs">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/mentee-settings')">
            <i class="fas fa-arrow-left"></i> Previous: Mentee settings</button>
        </span>
        <span class="hidden-xs">
          <button style="float: right" class="btn btn-md btn-primary" @click="navigateTo('/view-profile')"> Next: View Profile
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- Desktop version -->

        <!-- Mobile-->
        <span class="visible-xs text-center">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/mentee-settings')">
            <i class="fas fa-arrow-left"></i> Previous: Mentee settings</button>
        </span>
        <br class="visible-xs">
        <span class="visible-xs text-center">
          <button class="btn btn-md btn-primary" @click="navigateTo('/view-profile')"> Next: View Profile
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- Mobile version --> 
      </div>
    </div>
</div>

</template>

<script>
  import SocialMediaForm from './Forms/SocialMedia.vue'
  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    components: {
      SocialMediaForm
    }
  }
</script>

<style>

</style>

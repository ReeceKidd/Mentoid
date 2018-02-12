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

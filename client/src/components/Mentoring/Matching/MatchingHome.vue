<template>
  <div class="container fullPage">
    <br class="hidden-xs">
    <br class="hidden-xs">
    <div class="row text-center">
      <div class="col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3 displayBox">
        <h1> What would you like to do? </h1>
        <br>
        <button class="btn btn-primary btn-lg" @click="navigateTo({ name : 'matching-mentor-list'})"> Find a Mentor </button>
        <br class="visible-xs">
        <br class="visible-xs">
        <button class="btn btn-primary btn-lg" @click="navigateTo({ name : 'matching-mentee-list'})"> Find a Mentee </button>
        <br>
        <br>
      </div>
      <br>
      <br>
    </div>

  </div>
</template>

<script>
  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    }
  }
</script>

<style>
  .fullPage {
    min-height: 300px;
  }

</style>

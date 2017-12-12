<template>
  <div class="container fullPage">

    <br></br>
    <br></br>
    <div class="row text-center">
      <h1> What would you like to do? </h1>
    </div>

    <br>

    <div class="row text-center">
      <div class="col-xs-3">
        <br>
      </div>
      <div class="col-xs-3">
        <button class="btn btn-primary btn-lg" @click="navigateTo({ name : 'matching-mentor-list'})"> Find a Mentor </button>
      </div>
      <div class="col-xs-3">
        <button class="btn btn-primary btn-lg" @click="navigateTo({ name : 'matching-mentee-list'})"> Find a Mentee </button>
      </div>
      <div class="col-xs-3">
        <br>
      </div>
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

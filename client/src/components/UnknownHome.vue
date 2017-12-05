<template>


  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <br>
        <img src="..\assets\home-logo.png" class="img-responsive center-block" 
            />
        <h1> A complete mentoring solution </h1>
        <br>
        <button class="btn btn-primary btn-lg" @click="navigateTo({ name : 'login'})"> Login </button>
        <button class="btn btn-primary btn-lg" @click="navigateTo({ name : 'register'})"> Register </button>
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
<style scoped>


</style>

<template>
  <div class="container">
    <!-- If user is logged in they should get redirected to their profile instead -->
    <span v-if="isUserLoggedIn"> {{ navigateTo('/profile/edit-profile')}} </span>
    <h1> {{ isUserLoggedIn }} </h1>
    <div class="row">
      <div class="col-xs-12 text-center">
        <br>
        <img src="..\assets\home-logo.png" class="img-responsive center-block" />
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
  import axios from 'axios'
  export default {
    data() {
      return {
        isUserLoggedIn: null
      }
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    beforeMount() {
      var self = this
      // If auth user ._id is equal to null it means it is their first time registering
      try {
        if (this.$store.state.user.authUser._id !== null) {
          const userID = this.$store.state.user.authUser._id
          // Checks if the areas of interest registration has already been complete
          const isUserLoggedInURL = 'http://localhost:4000/get/is-user-logged-in/'
          axios.get(isUserLoggedInURL + userID).then(function (response) {
            self.isUserLoggedIn = response.data.isUserLoggedIn
          })
        }
      } catch (exception) {
        console.log('User is not logged in so can access Unknown home page')
      }
    }
  }
</script>
<style scoped>


</style>

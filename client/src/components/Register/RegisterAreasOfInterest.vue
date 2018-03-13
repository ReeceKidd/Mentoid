<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h1 class="text-center"> Hello {{ firstName + ' ' + lastName }} </h1>
        <h2 class="text-center">
          Please add your hobbies, skills and areas of interest.
        </h2>
    <areas-of-interest-form></areas-of-interest-form>
    <br>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">  
        <hr>

        <!-- Desktop version of registration buttons -->
        <span class="hidden-xs">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/register')">
            <i class="fas fa-arrow-left"></i> Previous: Basic Registration</button>
        </span>
        <span class="hidden-xs">
          <button style="float: right" class="btn btn-md btn-primary" @click="navigateTo('/register-job-history')"> Next: Job History
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- End of desktop version -->

        <!-- Mobile version of registration buttons -->
        <span class="visible-xs text-center">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/register')">
            <i class="fas fa-arrow-left"></i> Previous: Basic Registration</button>
        </span>
        <br class="visible-xs">
        <span class="visible-xs text-center">
          <button class="btn btn-md btn-primary" @click="navigateTo('/register-job-history')"> Next: Job History
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- End of mobile version --> 
      </div>
    </div>

  </div>
</template>
<script>
  import AreasOfInterestForm from './Forms/AreasOfInterest.vue'
  import axios from 'axios'
  export default {
    data() {
      return {
        firstName: undefined,
        lastName: undefined
      }
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      // Gets users first name and last name
      const getBasicRegistration = 'http://localhost:4000/get/basic-registration/'
      axios.get(getBasicRegistration + userID).then(function (response) {
        self.firstName = response.data.userInfo.firstName
        self.lastName = response.data.userInfo.lastName
      })
    },
    components: {
      AreasOfInterestForm
    }
  }
</script>

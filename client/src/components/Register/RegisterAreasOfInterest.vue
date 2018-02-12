<template>
  <div class="container">
    <div class="row hidden-xs">
      <div class="col-sm-12">
        <h1 class="text-center"> Hello {{ firstName + ' ' + lastName }} </h1>
      </div>
      <div class="col-sm-8 col-sm-offset-2">
        <h2 class="text-center">
          Please add your hobbies, skills and areas of interest.
        </h2>
      </div>
    </div>
    <areas-of-interest-form></areas-of-interest-form>
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

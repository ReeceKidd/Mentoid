<template>
 <div class="container">
     <div class="row">
         <div class="col-xs-12 text-center">
             <h1> User profile </h1>
         </div>
     </div>
 </div>
</template>

<script>
  
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
        areasOfInterest: [],
        country: '',
        terms: false,
        errorMessage: null,
        currentUser: ''
      }
    }
  }
</script>

<style scoped>

</style>


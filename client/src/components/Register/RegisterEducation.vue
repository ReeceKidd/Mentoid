<template>
  <div class="container">
  
    <div class="row">
 <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 class="text-center">
          Please add your education history.
        </h2>
    <!-- Imported education form -->
    <education-form></education-form>
 </div>
    </div>
    <br>

    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">  
        <hr>

        <!-- Desktop version of registration buttons -->
        <span class="hidden-xs">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/register-job-history')">
            <i class="fas fa-arrow-left"></i> Previous: Job History</button>
        </span>
        <span class="hidden-xs">
          <button style="float: right" class="btn btn-md btn-primary" @click="navigateTo('/upload-profile-picture')"> Next: Upload Profile Picture
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- End of desktop version -->

        <!-- Mobile version of registration buttons -->
        <span class="visible-xs text-center">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/register-job-history')">
            <i class="fas fa-arrow-left"></i> Previous: Job History</button>
        </span>
        <br class="visible-xs">
        <span class="visible-xs text-center">
          <button class="btn btn-md btn-primary" @click="navigateTo('/upload-profile-picture')"> Next: Upload Profile Picture
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- End of mobile version --> 
      </div>
    </div>
  </div>
</template>
<script>
  import EducationForm from './Forms/Education.vue'

  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    components: {
      EducationForm
    }
  }
</script>

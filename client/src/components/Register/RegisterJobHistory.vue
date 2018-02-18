<template>
  <div class="container">
    <!-- This component is different depending on whether it is viewed in mobile or on desktop -->

    <!-- Desktop version job history explainer and buttons -->
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2 col-xs-12">
        <h2 class="text-center">
          Please add your employment experience.
        </h2>
      </div>
    </div>
    <job-history-form></job-history-form>
    <br>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <hr>

        <!-- Desktop version of registration buttons -->
        <span class="hidden-xs">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/register-areas-of-interest')">
            <i class="fas fa-arrow-left"></i> Previous: Areas of interest
          </button>
        </span>
        <span class="hidden-xs">
          <button style="float: right" class="btn btn-md btn-primary" @click="navigateTo('/register-education')"> Next: Register Education
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- End of desktop version -->

        <!-- Mobile version of registration buttons -->
        <span class="visible-xs text-center">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/register-areas-of-interest')">
            <i class="fas fa-arrow-left"></i> Previous: Areas of interest
          </button>
        </span>
        <br class="visible-xs">
        <span class="visible-xs text-center">
          <button class="btn btn-md btn-primary" @click="navigateTo('/register-education')"> Next: Register Education
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- End of mobile version -->
      </div>
    </div>
  </div>

</template>

<script>
  import JobHistoryForm from './Forms/JobHistory.vue'

  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    components: {
      JobHistoryForm
    }
  }
</script>

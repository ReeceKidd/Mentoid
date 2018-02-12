<template>
  <div class="container">
    <!-- This component is different depending on whether it is viewed in mobile or on desktop -->

    <!-- Desktop version job history explainer and buttons -->
    <div class="row hidden-xs">
      <div class="col-sm-8 col-sm-offset-2 col-xs-12">
        <h2 class="text-center">
          Please add your employment experience.
        </h2>
      </div>
    </div>
  <job-history-form></job-history-form>
  </div>

</template>

<script>
  import JobHistoryForm from './Forms/JobHistory.vue'

  export default {
    components: {
      JobHistoryForm
    }
  }
</script>

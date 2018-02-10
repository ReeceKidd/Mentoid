<template>
  <div class="container">
    <!-- This component is different depending on whether it is viewed in mobile or on desktop -->

    <!-- Desktop version job history explainer and buttons -->
    <div class="row hidden-xs">
      <div class="col-sm-8 col-sm-offset-2">
        <h2 class="text-center">
          Please add your education history.
        </h2>
      </div>
    </div>

    <!-- Mobile Version job history and buttons -->
    <div class="row visible-xs">
      <div class="col-xs-12">
        <h3>
          Please add your history of education.
        </h3>
      </div>
    </div>

    <!-- Imported education form -->
    <education-form></education-form>
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

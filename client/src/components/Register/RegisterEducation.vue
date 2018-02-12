<template>
  <div class="container">
  
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2 col-xs-12">
        <h2 class="text-center">
          Please add your education history.
        </h2>
      </div>
    </div>

    <!-- Imported education form -->
    <education-form></education-form>
  </div>
</template>
<script>
  import EducationForm from './Forms/Education.vue'

  export default {
    components: {
      EducationForm
    }
  }
</script>

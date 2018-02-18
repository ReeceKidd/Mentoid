<template>
  <!-- Span tags on this page are placed in the element above so redirection lands in the right place -->
  <div class="container-fluid">
    <div class="row text-center">
      <div class="col-xs-12">
        <!-- Imported components -->
        <upload-profile-picture></upload-profile-picture>
        <edit-name></edit-name>
        <edit-user-name></edit-user-name>
        <edit-email></edit-email>
        <!-- End of imported components -->
      </div>
    </div>

    <hr>

    <div class="row text-center">
      <div class="col-xs-12">
        <h2 class="text-center">
          PROFILE COMPLETENESS
          <br>
          <br>
          <profile-completeness></profile-completeness>
        </h2>
      </div>
      <span id="social-media"></span>
    </div>

    <hr>

    <div class="row text-center">
      <div class="col-xs-12">
        <h2 id="socialMedia"> SOCIAL MEDIA </h2>
        <edit-social-media></edit-social-media>
        <span id="areas-of-interest"></span>
      </div>

    </div>


    <hr>

    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">
          AREAS OF INTEREST
        </h2>
        <br>
        <edit-areas-of-interest></edit-areas-of-interest>
      </div>
      <span id="education"></span>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">
          EDUCATION
        </h2>
        <br>
        <edit-education-history></edit-education-history>
      </div>
      <span id="job-history"></span>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">
          JOB HISTORY
        </h2>
        <br>
        <edit-job-history></edit-job-history>
      </div>
      <span id="mentoring-preferences"></span>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">
          MENTORING PREFERENCES
        </h2>
        <edit-mentor-preferences></edit-mentor-preferences>
      </div>
      <span id="mentee-preferences"></span>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">
          MENTEE PREFERENCES
        </h2>
        <edit-mentee-preferences></edit-mentee-preferences>
      </div>
    </div>
  </div>
</template>

<script>
  import UploadProfilePicture from '../Register/Forms/UploadProfilePicture.vue'
  import EditName from './EditProfile/EditName.vue'
  import EditUserName from './EditProfile/EditUserName.vue'
  import EditEmail from './EditProfile/EditEmail.vue'
  import ProfileCompleteness from './ProfileCompleteness.vue'
  import EditSocialMedia from '../Register/Forms/SocialMedia.vue'
  import EditAreasOfInterest from '../Register/Forms/AreasOfInterest.vue'
  import EditEducationHistory from '../Register/Forms/Education.vue'
  import EditJobHistory from '../Register/Forms/JobHistory.vue'
  import EditMenteePreferences from '../Register/Forms/MenteePreferences.vue'
  import EditMentorPreferences from '../Register/Forms/MentorPreferences.vue'
  export default {
    components: {
      UploadProfilePicture,
      EditName,
      EditEmail,
      EditUserName,
      ProfileCompleteness,
      EditSocialMedia,
      EditAreasOfInterest,
      EditEducationHistory,
      EditJobHistory,
      EditMenteePreferences,
      EditMentorPreferences
    }
  }
</script>
<style scoped>
</style>

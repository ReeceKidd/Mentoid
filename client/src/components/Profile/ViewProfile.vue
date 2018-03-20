<template>
  <!-- Span tags on this page are placed in the element above so redirection lands in the right place -->
  <div class="container-fluid">
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <!-- Imported components -->
        Profile picture. 
        First name + last name 
        @username 
        <br>
        <!-- End of imported components -->
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 class="text-center">
          AREAS OF INTEREST
        </h2>
        <br>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 class="text-center">
          EDUCATION
        </h2>
        <br>
      </div>
      <span id="job-history"></span>
    </div>

    <hr>

    <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 class="text-center">
          JOB HISTORY
        </h2>
        <br>
      </div>
      <span id="mentoring-preferences"></span>
    </div>  

    <hr> 

    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 id="socialMedia"> SOCIAL MEDIA </h2>
        <br>
      </div>
    </div>

    <hr>

    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 id="socialMedia"> MENTORING RELATIONSHIPS </h2>
        <br>
      </div>
    </div>

    <hr>

    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 id="socialMedia"> PAST RELATIONSHIPS </h2>
        <br>
      </div>
    </div>
    <br>
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
  import EditMenteeSettings from '../Register/Forms/MenteeSettings.vue'
  import EditMentorSettings from '../Register/Forms/MentorSettings.vue'
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
      EditMenteeSettings,
      EditMentorSettings
    }
  }
</script>
<style scoped>
</style>

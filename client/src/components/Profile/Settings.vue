<template>
<div class="container">
  <br>
  <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 class="text-center">
          MENTOR SETTINGS
        </h2>
        <edit-mentor-settings></edit-mentor-settings>
      </div>
      <span id="mentee-preferences"></span>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 class="text-center">
          MENTEE SETTINGS
        </h2>
        <edit-mentee-settings></edit-mentee-settings>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 class="text-center hidden-xs">
          INTERNATIONALISATION
        </h2>
        <h2 class="text-center visible-xs">
          <i class="fas fa-globe"></i> 
        </h2>
        <p> Choose your language </p>
        <div class="input" name="language">
              <label for="language">Language*</label>
              <select id="language" v-model="language">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
            <br>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 class="text-center">
          ACCESSIBILITY
        </h2>
      </div>
    </div>

</div>
</template>

<script>
  import EditMenteeSettings from '../Register/Forms/MenteeSettings.vue'
  import EditMentorSettings from '../Register/Forms/MentorSettings.vue'
  export default {
    components: {
      EditMenteeSettings,
      EditMentorSettings
    }
  }
</script>

<style>

</style>

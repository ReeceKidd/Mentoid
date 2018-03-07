<template>
  <div class="row">
    <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
      <div v-if="potentialMentors.length > 0" class="text-center">
        <a href="#currentPotentialMentors" data-toggle="collapse">
          <h2>
            <i class="fas fa-chevron-down"></i> Potential Mentors:
            <b class="successMessage">{{potentialMentors.length }}</b>
          </h2>
        </a>
        <div id="currentPotentialMentors" v-if="potentialMentors.length > 0" class="text-center collapse">
          <span v-for="(potentialMentor, index) in potentialMentors" :key="index">
            <br>
            <img :src='getProfilePicture(potentialMentor._id)' class="profileImage">
            <h3> {{ potentialMentor.firstName + ' ' + potentialMentor.lastName }} </h3>
            <h4> @{{ potentialMentor.userName }} </h4>
            <button class="btn btn-primary btn-sm view-compatibility" @click="viewMentorCompatibility()"> View Compatibility </button>
            <button class="btn btn-primary btn-sm" @click="message()"> Message </button>
            <br>
            <br>
            <button class="btn btn-success btn-lg" @click="acceptPotentialMentor(potentialMentor._id)">
              <i class="fas fa-check"></i>
            </button>
            <button class="btn btn-danger btn-lg" @click="deletePotentialMentor()">
              <i class="fas fa-times"></i>
            </button>
            <br>
            <br>
            <hr v-if="index !== potentialMentors.length-1">
            <br v-if="index !== potentialMentors.length-1">
          </span>
        </div>
      </div>
      <div v-else>
        <h2>
          Potential Mentors:
          <b class="errorMessage">0</b>
        </h2>
        <h4>
          <a href='edit-profile#mentee-settings'> Update your profile to increase your chances.
            <i class="fas fa-cog"></i>
          </a>
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'
  export default {
    data() {
      return {
        currentUserID: this.$store.state.user.authUser._id,
        potentialMentors: []
      }
    },
    methods: {
      getProfilePicture(mentorsID) {
        return getProfilePictureURL + mentorsID
      }
    },
    beforeMount() {
      var self = this
      var userID = this.currentUserID
      // Get users social media details
      const getPotentialMentorsURL = 'http://localhost:4000/get/potential-mentors/'
      axios.get(getPotentialMentorsURL + userID).then(function (response) {
        self.potentialMentors = response.data.potentialMentors
      })
    }
  }
</script>

<style scoped>
  .infoMessage {
    position: absolute;
    top: 0px;
    right: 0px;
    padding-right: 10px;
    padding-left: 10px;
    background: #104E8B;
    color: white;
    font-size: 1.5rem;
  }

  .noMatchesMessage {
    position: absolute;
    top: 0px;
    right: 0px;
    padding-right: 10px;
    padding-left: 10px;
    background: #A80000;
    color: white;
    font-size: 1.5rem;
  }

  .profileImage {
    max-width: 200px;
    max-height: 200px;
    border-radius: 50%;
    padding: 1px;
    border: 1px solid #021a40;
  }

  .view-compatibility {
    background-color: purple;
  }

  .view-compatibility:hover {
    background-color: #333;
  }

  .successMessage {
    color: green;
  }

  .errorMessage {
    color: red;
  }

  hr {
    border: 0;
    border-top: 1px solid black;
  }

</style>

<template>
   <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
        <div v-if="pastMentors.length > 0" class="text-center">
          <a href="#currentMentees" data-toggle="collapse">
            <h2>
              <i class="fas fa-chevron-down"></i> Past mentors:
              <b class="successMessage">{{pastMentors.length }}</b>
            </h2>
          </a>
          <span v-for="(pastMentor, index) in pastMentors" :key="index" class="text-center">
            <br>
            <img :src='getProfilePicture(pastMentor._id)' class="profileImage">
            <h3> {{ pastMentor.firstName + ' ' + pastMentor.lastName }} </h3>
            <h4> @{{ pastMentor.userName }} </h4>
            <button class="btn btn-primary btn-sm view-compatibility" @click="viewMenteeCompatibility()"> View Compatibility </button>
            <button class="btn btn-primary btn-sm" @click="message()"> Message </button>
            <br>
            <br>
            <button class="btn btn-success btn-lg" @click="acceptPotentialMentee(pastMentor._id)">
              <i class="fas fa-check"></i>
            </button>
            <button class="btn btn-danger btn-lg" @click="deletePotentialMentee()">
              <i class="fas fa-times"></i>
            </button>
            <br v-if="index !== pastMentors.length-1">
            <hr v-if="index !== pastMentors.length-1">
            <br v-if="index !== pastMentors.length-1">
          </span>
          <br>
        </div>

        <div v-else>
          <h2>
            Past Mentors:
            <b class="errorMessage">0</b>
          </h2>
          <h4>
            You have no past mentors
          </h4>
        </div>
        <br>
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
        pastMentors: []
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
      const getPastMentorsURL = 'http://localhost:4000/get/past-mentors/'
      axios.get(getPastMentorsURL + userID).then(function (response) {
        self.pastMentors = response.data.pastMentors
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

  .accordion-toggle:after {
    font-family: 'FontAwesome';
    content: "\f078";
    float: right;
  }

  .accordion-opened .accordion-toggle:after {
    content: "\f054";
  }

  hr {
    border: 0;
    border-top: 1px solid black;
  }

</style>

<template>
   <!-- Current Mentors -->
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
        <div v-if="mentors.length > 0" class="text-center">
          <a href="#currentMentors" data-toggle="collapse">
            <h2>
              <i class="fas fa-chevron-down"></i> Current Mentors:
              <b class="successMessage">{{mentors.length }}</b>
            </h2>
          </a>
          <div id="currentMentors" v-if="mentors.length > 0" class="text-center collapse displayBox">
            <span v-for="(mentor, index) in mentors" :key="index">
              <br v-if="index === 0">
              <img :src='getProfilePicture(mentor._id)' class="profileImage">
              <h3> {{ mentor.firstName + ' ' + mentor.lastName }} </h3>
              <h4> @{{ mentor.userName }} </h4>
              <button class="btn btn-primary btn-md view-compatibility" @click="viewMentorRelationship()"> View Relationship </button>
              <button class="btn btn-success btn-md" @click="viewMentorProfile()"> View Profile </button>
              <button class="btn btn-primary btn-md" @click="message()"> Message </button>
              <br>
              <br>
              <button class="btn btn-danger btn-sm" @click="endRelationshipWithMentor(mentor._id)">
                <i class="fas fa-times"></i> End relationship
              </button>
              <br v-if="index !== mentors.length-1">
            <hr v-if="index !== mentors.length-1">
            <br v-if="index !== mentors.length-1">
            </span>
          </div>
        </div>
        <div v-else>
          <h2>
            Current Mentors:
            <b class="errorMessage">0</b>
          </h2>
          <h4>
            <a href='edit-profile#Mentor-settings'> Update your profile to increase your chances
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
        mentors: []
      }
    },
    methods: {
      getProfilePicture(mentorsID) {
        return getProfilePictureURL + mentorsID
      },
      endRelationshipWithMentor(mentorID) {
        const endRelationshipWithMentorURL = 'http://localhost:4000/end-relationship-with-mentor'
        axios.post(endRelationshipWithMentorURL, {
          userID: this.currentUserID,
          mentorID: mentorID
        }).then(response => {
          this.endRelationshipWithMentorMessage = response.data.message
          setTimeout(() => {
            this.endRelationshipWithMentorMessage = null
          }, 3000)
          location.reload()
        }).catch(error => {
          this.endRelationshipWithMentorErrorMessage = error.response.data.message
          setTimeout(() => {
            this.endRelationshipWithMentorErrorMessage = null
          }, 3000)
        })
      }
    },
    beforeMount() {
      var self = this
      var userID = this.currentUserID
      // Get users social media details
      const getMentorsURL = 'http://localhost:4000/get/mentors/'
      axios.get(getMentorsURL + userID).then(function (response) {
        self.mentors = response.data.mentors
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

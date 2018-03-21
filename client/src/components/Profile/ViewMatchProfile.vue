<template>
  <!-- Span tags on this page are placed in the element above so redirection lands in the right place -->
  <div class="container-fluid">
    <h1 class="text-center"> {{ userName }}'s Profile</h1>
    <br>
    <div class="text-center">
      <button class="btn btn-primary btn-lg hidden-xs" @click="sendMessage()">Send Message</button>
      <button class="btn btn-primary btn-sm visible-xs" @click="sendMessage()">Send Message</button>
    </div>
    <br>
    <br>
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <!-- Imported components -->
        <br>
        <img :src='getProfilePicture(matchID)' class="profileImage">
        <h2>{{ firstName + ' ' + lastName }}</h2>
        <h3> @{{ userName }} </h3>
        <br>
        <!-- End of imported components -->
      </div>
    </div>

    <hr>
    <!-- Areas of interest section -->
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 class="text-center">
          AREAS OF INTEREST
        </h2>
        <br>
        <table class="table table-hover text-center">
          <thead>
            <tr>
              <td>
                <h4>
                  <strong>Area of Interest</strong>
                </h4>
              </td>
              <td>
                <h4>
                  <strong>Years of Experience</strong>
                </h4>
              </td>
            </tr>
          </thead>

          <tbody>
            <tr v-for="hobby in areasOfInterest" :key="hobby._id">
              <td>{{ hobby.value }}</td>
              <td>{{ hobby.years }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- End of areas of interest -->

    <hr>

    <!-- Education -->
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <div v-if="education.length > 0" class="text-center">
          <h2>
            EDUCATION
          </h2>
          <hr>
          <span v-for="(degree, index) in education" :key="index">
            <h4>{{ degree.school }}</h4>
            <h5>
              <i class="fas fa-map-marker-alt"></i> {{ degree.country }}</h5>
            <h4>{{ degree.degree }}</h4>
            <h4>
              <b>{{ degree.fieldOfStudy }}</b>
            </h4>
            <h5>Start year: {{ degree.startYear }} </h5>
            <h5>End year: {{ degree.endYear }} </h5>
            <hr v-if="(index + 1) !== education.length">
            <br v-else>
          </span>
        </div>
        <div v-else>
          <h2>
            EDUCATION
          </h2>
          <p> Please update your education </p>
        </div>
      </div>
    </div>
    <!-- End of education -->

    <hr>

    <!-- Job History -->
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 class="text-center">
          JOB HISTORY
        </h2>
        <div v-if="jobHistory.length > 0">
          <span v-for="(experience, index) in jobHistory" :key="index">
            <h4>
              <i> {{ index + 1 }} </i>
            </h4>
            <h4>
              <b>{{ experience.title }}</b>
            </h4>
            <h5>
              <i>{{ experience.company }}</i>
            </h5>
            <h5>Start Year: {{ experience.startYear }}</h5>
            <h5 v-if="experience.isWorkingHere === 'Yes'">
              Currently working here
            </h5>
            <h5 v-else>
              End Year: {{ experience.endYear }}
            </h5>
            <hr v-if="index !== jobHistory.length-1">
            <br v-if="index === jobHistory.length-1">
          </span>
        </div>
        <div v-else>
          <p> Please update your job history </p>
        </div>
        <br>
      </div>
    </div>
    <!-- End of Job History -->

    <hr>

    <!-- Social Media -->
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <h2 id="socialMedia"> SOCIAL MEDIA </h2>
        <a>
          <p v-if="facebook !== null">
            <i class="fab fa-facebook-f"></i>: {{ facebook}} </p>
        </a>
        <a>
          <p v-if="instagram !== null">
            <i class="fab fa-instagram"></i>: {{ instagram}} </p>
        </a>
        <a>
          <p v-if="twitter !== null">
            <i class="fab fa-twitter"></i>: {{ twitter }} </p>
        </a>
        <a>
          <p v-if="snapchat !== null">
            <i class="fab fa-snapchat"></i>: {{ snapchat }} </p>
        </a>
        <a>
          <p v-if="linkedIn !== null">
            <i class="fab fa-linkedin-in"></i>: {{linkedIn}}</p>
        </a>
        <a>
          <p v-if="medium !== null">
            <i class="fab fa-medium"></i>: {{medium}}</p>
        </a>
        <a>
          <p v-if="youtube !== null">
            <i class="fab fa-youtube"></i>: {{youtube}}</p>
        </a>
        <a>
          <p v-if="website !== null">
            <i class="fas fa-globe"></i>: {{website}}</p>
        </a>
        <br>
      </div>
    </div>
    <!-- End of social media -->

    <hr>

    <br>
  </div>
</template>

<script>
  import axios from 'axios'
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'
  export default {
    props: ['matchID'],
    data() {
      return {
        firstName: null,
        lastName: null,
        userName: null,
        areasOfInterest: [],
        education: [],
        jobHistory: [],
        facebook: null,
        twitter: null,
        instagram: null,
        linkedIn: null,
        snapchat: null,
        youtube: null,
        medium: null,
        website: null,
        errorMessage: null,
        successMessage: null
      }
    },
    methods: {
      getProfilePicture(userID) {
        return getProfilePictureURL + userID
      },
      sendMessage() {
        alert(
          'Message functionality has not been implemented as it is outside of the scope of this project. This would launch a seperate messaging component.'
        )
      }
    },
    beforeMount() {
      var self = this
      var userID = this.matchID
      console.log('Match ID: ' + this.matchID)
      // Gets first name, last name and userName.
      const getBasicRegistration = 'http://localhost:4000/get/basic-registration/'
      axios.get(getBasicRegistration + userID).then(function (response) {
        self.firstName = response.data.userInfo.firstName
        self.lastName = response.data.userInfo.lastName
        self.userName = response.data.userInfo.userName
      })
      // Gets areas of interest.
      const getAreasOfInterestUrl = 'http://localhost:4000/get/areas-of-interest/'
      axios.get(getAreasOfInterestUrl + userID).then(function (response) {
        self.areasOfInterest = response.data.areasOfInterest
      })
      // Get education
      const getEducationHistory = 'http://localhost:4000/get/education-history/'
      axios.get(getEducationHistory + userID).then(function (response) {
        self.education = response.data.education
      })
      // Get job history
      const getJobHistory = 'http://localhost:4000/get/job-history/'
      axios.get(getJobHistory + userID).then(function (response) {
        self.jobHistory = response.data.jobHistory
      })
      // Get social media
      const getSocialMedia = 'http://localhost:4000/get/social-media/'
      axios.get(getSocialMedia + userID).then(function (response) {
        self.facebook = response.data.facebook
        self.twitter = response.data.twitter
        self.instagram = response.data.instagram
        self.linkedIn = response.data.linkedIn
        self.snapchat = response.data.snapchat
        self.youtube = response.data.youtube
        self.medium = response.data.medium
        self.website = response.data.website
      })
    }
  }
</script>
<style scoped>
  .profileImage {
    max-width: 200px;
    max-height: 200px;
    border-radius: 50%;
    padding: 1px;
    border: 1px solid #021a40;
  }

</style>

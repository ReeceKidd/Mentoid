<template>
  <div class="container">
    <div class="row text-center">
      <h1 class="">Potential Mentor</h1>
      <button class="btn btn-success btn-md sticky" @click="applyForMentorship()">Apply for Mentorship</button>
      <button class="btn btn-primary btn-md sticky" @click="messageMentor()">Message</button>
      <br v-if="errorMessage !=null">
      <br v-if="errorMessage !=null">
      <p v-if="errorMessage != null" class="errorMessage"> {{ errorMessage }} </p>
      <br v-if="successMessage !=null">
      <br v-if="successMessage !=null">
      <p v-if="successMessage !=null" class="successMessage"> {{ successMessage }} </p>
      <br>
      <br>
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <br>
        <img :src="profilePictureURL" class="img-responsive uploadImage center-block" v-if="mentor.hasProfilePicture">
        <img :src="imageSrc" class="img-responsive uploadImage center-block" v-else>
        <h2 class="text-center">{{ mentor.firstName + ' ' + mentor.lastName}}</h2>
        <h4 class="text-center">@{{mentor.userName}}</h4>
        <br>
      </div>
    </div>
    <br>
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <p v-if="mentor.compatibilityScore <= 0" class="infoMessage"> Compatibility:
              <i class="fas fa-star"></i>
            </p>
            <p v-if="mentor.compatibilityScore === 10" class="infoMessage"> Compatibility:
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </p>
            <p v-if="mentor.compatibilityScore === 20" class="infoMessage"> Compatibility:
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </p>
            <p v-if="mentor.compatibilityScore === 30" class="infoMessage"> Compatibility:
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </p>
            <p v-if="mentor.compatibilityScore >= 40" class="infoMessage"> Compatibility:
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </p>
            <br>
        <h2> Compatibility </h2>
        <h4 v-if="(similarInterests.length + mentorHasMoreExperience.length) > 1"> Similar Interests:
          <b class="match"> {{ similarInterests.length }} </b>
        </h4>
        <h4 v-else> Similar Interests: 
          <b class="notAMatch"> {{ similarInterests.length }} </b>
        </h4>
        <h4 v-if="educationMatches.length > 0"> Education matches:
          <b class="match"> {{ educationMatches.length }} </b>
        </h4>
        <h4 v-else> Education matches:
          <b class="notAMatch"> {{ educationMatches.length }} </b>
        </h4>
        <h4 v-if="languageMatches.length > 1"> Language matches:
          <b class="match"> {{ languageMatches.length }} </b>
        </h4>
        <h4 v-else> Language matches: 
          <b class="notAMatch"> {{ languageMatches.length }} </b>
        </h4>
        <h4>
          <u> Age Matching information </u>
        </h4>
        <h5 v-if="mentorTooOldBy === null && mentorTooYoungBy === null" class="match"> Mentor is within your age range </h5>
        <span v-else>
          <h5 v-if="mentorTooOldBy !== null" class="notAMatch">
            Mentor is {{ mentorTooOldBy }} years older than your preffered maximum age.
          </h5>
          <h5 v-if="mentorTooYoungBy !==null" class="notAMatch">
            Mentor is {{ mentor.age }} which is {{ mentorTooYoungBy }} years younger than your preffered minimum age.
          </h5>
        </span>
        <h5 v-if="currentUserTooOldBy === null && currentUserTooYoungBy === null" class="match">
          You are within the mentors age range
        </h5>
        <span v-else>
          <h5 v-if="currentUserTooOldBy !== null" class="notAMatch">
            You are {{ currentUserTooOldBy }} years older than {{ mentorName }}'s' preffered maximum age: {{ mentorSettings.maximumAge
            }}
          </h5>
          <h5 v-if="currentUserTooYoungBy !== null" class="notAMatch">
            You are {{ currentUserTooYoungBy }} years younger than {{ mentorName }}'s preffered minimum age: {{ mentorSettings.minimumAge
            }}
          </h5>
        </span>
        <br>
      </div>
    </div>
    <br>
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <p class="infoMessage"> Number of shared interests: {{ otherInterests.length + mentorHasMoreExperience.length}} </p>
        <br>
        <h2> Mentoring Areas of Interest </h2>
        <div>
          <span v-for="(areaOfInterest, index) in mentorHasMoreExperience" :key="index">
            <span class="areaOfInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.yearsOfExperience }} </span>&nbsp;
          </span>
        </div>
        <div v-if="similarInterests.length > 0">
          <h3>
            <u> Similar Interests </u>
          </h3>
          <span v-for="(areaOfInterest, index) in similarInterests" :key="index">
            <p class="areaOfInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.yearsOfExperience }} </p>&nbsp;
          </span>
        </div>
        <div v-else>
          <h3>
            <u> Similar Interests </u>
          </h3>
          <p class="notAMatch"> No additonal similar interests </p>
        </div>
        <div v-if="otherInterests.length > 0">
          <h3>
            <u>Other Areas Of Interest</u>
          </h3>
          <br>
          <span v-for="(areaOfInterest, index) in otherInterests" :key="index">
            <p v-if="mentorHasMoreExperience.indexOf(areaOfInterest.value) === -1" class="otherInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.years }} </p>&nbsp;
          </span>
        </div>
        <div v-else>
          <h3>
            <u> Other Areas Of Interest </u>
          </h3>
          <p class="notAMatch"> No additional areas of interest </p>
        </div>
        <br>
          <br>
      </div>
      <br>
    </div>
    <br>
    <!-- <div class="row text-center" v-if="mentor.education.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <br>
        <h2> Mentoring Information </h2>
        <h4> Preffered formats: </h4>
        <span v-for="(format, index) in mentor.mentorSettings.prefferedMentoringFormats" :key="index">
          <h3>
            <b>
              <i>{{format }} </i>
            </b>
          </h3>
        </span>
        <br>
        <div v-if="hasInPerson()">
          <h4>
            <u> Distance Match </u>
          </h4>
          <h5 v-if="mentor.userIsWithinMentorsRange"> You are within mentors travelling range
            <i class="fas fa-check match"></i>
          </h5>
          <h5 v-else> You are outside of the mentors maximum travel distance of {{ mentorSettings.maxiumTravelDistanceKM }}
            <i class="fas fa-times notAMatch"></i>
          </h5>
          <h5 v-if="mentor.isWithinUsersRange"> Mentor is withing your range
            <i class="fas fa-check match"></i>
          </h5>
          <h5 v-else> Mentor is outside of your maximum travel distance
            <i class="fas fa-times notAMatch"></i>
          </h5>
        </div>
      </div>
    </div>
    <br>
    <div class="row text-center" v-if="mentor.education.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <p class="infoMessage"> Number of education matches: {{ numberOfEducationMatches}} </p>
        <br>
        <h2> Mentors Education </h2>
        <span v-for="(degree, index) in mentor.education" :key="index">
          <h4 v-if="degree.isMatch === true"> {{ index + 1 }}
            <i class="fas fa-check match"></i>
          </h4>
          <h4 v-else> {{ index + 1 }}
            <i class="fas fa-times notAMatch"></i>
          </h4>
          <h4>{{ degree.school }}</h4>
          <h5> {{ degree.country }}</h5>
          <h4>{{ degree.degree }}</h4>
          <h4>
            <b>{{ degree.fieldOfStudy }}</b>
          </h4>
          <h5>Start year: {{ degree.startYear }} </h5>
          <h5>End year: {{ degree.endYear }} </h5>
          <hr>
        </span>
      </div>
    </div>
    <br>
    <div class="row text-center" v-if="mentor.jobHistory.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <br>
        <h2> Mentors Job History </h2>
        <span v-for="(experience, index) in mentor.jobHistory" :key="index">
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
          <hr v-if="index !== mentor.jobHistory.length-1">
          <br v-if="index === mentor.jobHistory.length-1">
        </span>
      </div>
    </div>
    <br>
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <br>
        <h2> Social Media </h2>
        <a>
          <p v-if="mentor.facebook !== null">
            <i class="fab fa-facebook-f"></i>: {{ mentor.facebook}} </p>
        </a>
        <a>
          <p v-if="mentor.instagram !== null">
            <i class="fab fa-instagram"></i>: {{ mentor.instagram}} </p>
        </a>
        <a>
          <p v-if="mentor.twitter !== null">
            <i class="fab fa-twitter"></i>: {{ mentor.twitter }} </p>
        </a>
        <a>
          <p v-if="mentor.snapchat !== null">
            <i class="fab fa-snapchat"></i>: {{ mentor.snapchat }} </p>
        </a>
        <a>
          <p v-if="mentor.linkedIn !== null">
            <i class="fab fa-linkedin-in"></i>: {{mentor.linkedIn}}</p>
        </a>
        <a>
          <p v-if="mentor.medium !== null">
            <i class="fab fa-medium"></i>: {{mentor.medium}}</p>
        </a>
        <a>
          <p v-if="mentor.youtube !== null">
            <i class="fab fa-youtube"></i>: {{mentor.youtube}}</p>
        </a>
        <a>
          <p v-if="mentor.website !== null">
            <i class="fas fa-globe"></i>: {{mentor.website}}</p>
        </a>
        <br>
      </div>
    </div>
    <br> -->
  </div>
</template>

<script>
  import axios from 'axios'
  const userAvatar = require('../../../assets/userAvatar.png')
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'
  export default {
    props: ['mentor'],
    data() {
      return {
        currentUserID: this.$store.state.user.authUser._id,
        userName: this.$store.state.user.authUser.userName,
        currentMentor: null,
        errorMessage: null,
        successMessage: null,
        profilePictureURL: getProfilePictureURL + this.mentor._id,
        imageSrc: userAvatar,
        mentorName: null,
        mentorHasMoreExperience: [],
        similarInterests: [],
        otherInterests: [],
        areasOfInterest: [],
        languageMatches: [],
        educationMatches: [],
        mentorSettings: [],
        currentUserTooOldBy: null,
        currentUserTooYoungBy: null,
        mentorTooOldBy: null,
        mentorTooYoungBy: null
      }
    },
    methods: {
      hasInPerson() {
        let prefferedMentoringFormats = this.mentorSettings.prefferedMentoringFormats
        return prefferedMentoringFormats.indexOf('In person') > -1
      },
      applyForMentorship(mentorID) {
        console.log('Attempting to apply for mentorship')
        var that = this
        const applyForMentorshipURL = 'http://localhost:4000/apply-for-mentorship/'
        axios.post(applyForMentorshipURL, {
          userID: this.$store.state.user.authUser._id,
          mentorID: this.mentorID
        }).then(function (response) {
          console.log(response.data)
          that.successMessage = 'Applied for mentorship successfully.'
          setTimeout(() => {
            that.successMessage = null
          }, 3000)
        }).catch(error => {
          console.log(error)
          this.errorMessage = error
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        })
      },
      getCompatibility(mentor) {
        const getCompatibilityURL = 'http://localhost:4000/calculate/compatibility/'
        axios.post(getCompatibilityURL, {
          userName: this.userName,
          mentor: mentor
        }).then(function (response) {
          console.log(response.data.compatibilityScore)
          mentor.compatibilityScore = response.data.compatibilityScore
        }).catch(error => {
          console.log(error.response.data.message)
        })
      }
    },
    beforeMount() {
      console.log(this.mentor)
      this.getCompatibility(this.mentor)
      this.mentorName = null
      this.mentorSettings = this.mentor.mentorSettings
      this.mentorHasMoreExperience = this.mentor.mentorHasMoreExperience
      this.similarInterests = this.mentor.similarInterests
      this.currentMentor = this.mentor
      let that = this
      const getMentorMatchURL = 'http://localhost:4000/mentor-match/'
      axios.post(getMentorMatchURL, {
        userName: this.userName,
        mentorName: this.mentor.userName
      }).then(function (response) {
        console.log(response)
        that.otherInterests = response.data.otherInterests
        that.languageMatches = response.data.languageMatches
        that.currentUserTooOldBy = response.data.currentUserTooOldBy
        that.currentUserTooYoungBy = response.data.currentUserTooYoungBy
        that.mentorTooOldBy = response.data.mentorTooOldBy
        that.mentorTooYoungBy = response.data.mentorTooYoungBy
      }).catch(error => {
        console.log(error)
      })
    }
  }
</script>

<style scoped>
  .uploadImage {
    max-width: 200px;
    max-height: 200px;
    border-radius: 50%;
    padding: 1px;
    border: 1px solid #021a40;
  }

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

  .errorMessage {
    color: red;
  }

  .successMessage {
    color: green;
  }

  .match {
    color: green;
  }

  .notAMatch {
    color: red;
  }

  .apply {
    margin-right: 150px;
  }

  hr {
    border: 0;
    border-top: 1px solid black;
  }



  .sticky {
    /* Fixed/sticky position */
    z-index: 99;
    /* Make sure it does not overlap */
    cursor: pointer;
    /* Add a mouse pointer on hover */
  }

</style>

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
        <img :src="profilePictureURL" class="img-responsive uploadImage center-block" v-if="hasProfilePicture">
        <img :src="imageSrc" class="img-responsive uploadImage center-block" v-else>
        <h2 class="text-center">{{ firstName + ' ' + lastName}}</h2>
        <h4 class="text-center">@{{userName}}</h4>
        <br>
      </div>
    </div>
    <br>
    <div class="row text-center" v-if="education.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <br>
        <h2> Compatibility </h2>
        <h4> Shared Interests:
          <b class="match"> {{ sharedNumberOfSharedInterests }} </b>
        </h4>
        <h4 v-if="numberOfEducationMatches > 0"> Education preferences matches:
          <b class="match"> {{ numberOfEducationMatches }} </b>
        </h4>
        <h4 v-else> Education matches:
          <b class="notAMatch"> {{ numberOfEducationMatches }} </b>
        </h4>
        <h4 v-if="numberOfEducationPreferencesMatches > 0"> Mentors preffered education matches:
          <b class="match"> {{ numberOfEducationPreferencesMatches }} </b>
        </h4>
        <h4 v-else> Mentors preffered education matches:
          <b class="notAMatch"> {{ numberOfEducationPreferencesMatches }}</b>
        </h4>
        <h4 v-if="numberOfLanguageMatches > 0"> Language matches:
          <b class="match"> {{ numberOfLanguageMatches }} </b>
        </h4>
        <h4 v-else> Language matches:
          <b class="notAMatch"> {{ numberOfEducationMatches}} </b>
        </h4>
        <h4>
          <u> Age Matching information </u>
        </h4>
        <h5 v-if="mentorTooOldBy === undefined && mentorTooYoungBy === undefined" class="match"> Mentor is within your age range </h5>
        <span v-else>
          <h5 v-if="mentorTooOldBy !== undefined" class="notAMatch">
            Mentor is {{ mentorTooOldBy }} years older than your preffered maximum age.
          </h5>
          <h5 v-if="mentorTooYoungBy !==undefined" class="notAMatch">
            Mentor is {{ age }} which is {{ mentorTooYoungBy }} years younger than your preffered minimum age.
          </h5>
        </span>
        <h5 v-if="currentUserTooOldBy === undefined && currentUserTooYoungBy === undefined" class="match">
          You are within the mentors age range
        </h5>
        <span v-else>
          <h5 v-if="currentUserTooOldBy !==undefined" class="notAMatch">
            You are {{ currentUserTooOldBy }} years older than {{ userName }}'s' preffered maximum age: {{ mentorSettings.maximumAge
            }}
          </h5>
          <h5 v-if="currentUserTooYoungBy !==undefined" class="notAMatch">
            You are {{ currentUserTooYoungBy }} years younger than {{ userName }}'s preffered minimum age: {{ mentorSettings.minimumAge
            }}
          </h5>
        </span>
        <br>
      </div>
    </div>
    <br>
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <p class="infoMessage"> Number of shared interests: {{ sharedNumberOfSharedInterests}} </p>
        <br>
        <h2> Mentoring Areas of Interest </h2>
        <div v-if="hasMoreExperienceIn !== null">
          <span v-for="(areaOfInterest, index) in hasMoreExperienceIn" :key="index">
            <span class="areaOfInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.yearsOfExperience }} </span>&nbsp;
          </span>
        </div>
        <div v-if="hasLessExperienceIn.length !== 0 && hasSameExperienceIn.length !== 0">
          <h3>
            <u> Shared Interests </u>
          </h3>
          <span v-if="hasSameExperienceIn.length !== 0" v-for="(areaOfInterest, index) in hasSameExperienceIn" :key="index">
            <p class="areaOfInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.yearsOfExperience }} </p>&nbsp;
          </span>
          <span v-if="hasLessExperienceIn.length !== 0" v-for="(areaOfInterest, index) in mentor.hasLessExperienceIn" :key="index">
            <p class="areaOfInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.yearsOfExperience }} </p>&nbsp;
          </span>
        </div>
        <div>
          <h3>
            <u>Other Areas Of Interest</u>
          </h3>
          <br>
          <span v-if="areasOfInterest.length !== 0" v-for="(areaOfInterest, index) in areasOfInterest" :key="index">
            <p class="otherInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.years }} </p>&nbsp;
          </span>
          <br>
          <br>
        </div>
      </div>
      <br>
    </div>
    <br>
    <div class="row text-center" v-if="education.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <br>
        <h2> Mentoring Information </h2>
        <h4> Preffered formats: </h4>
        <span v-for="(format, index) in mentorSettings.prefferedMentoringFormats" :key="index">
          <h3>
            <b><i>{{format }} </i></b>
          </h3>
        </span>
        <br>
        <div v-if="hasInPerson()">
          <h4>
            <u> Distance Match </u>
          </h4>
          <h5 v-if="userIsWithinMentorsRange"> You are within mentors travelling range
            <i class="fas fa-check match"></i>
          </h5>
          <h5 v-else> You are outside of the mentors maximum travel distance of {{ mentorSettings.maxiumTravelDistanceKM }}
            <i class="fas fa-times notAMatch"></i>
          </h5>
          <h5 v-if="isWithinUsersRange"> Mentor is withing your range
            <i class="fas fa-check match"></i>
          </h5>
          <h5 v-else> Mentor is outside of your maximum travel distance
            <i class="fas fa-times notAMatch"></i>
          </h5>
        </div>
      </div>
    </div>
    <br>
    <div class="row text-center" v-if="education.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <p class="infoMessage"> Number of education matches: {{ numberOfEducationMatches}} </p>
        <br>
        <h2> Mentors Education </h2>
        <span v-for="(degree, index) in education" :key="index">
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
    <div class="row text-center" v-if="education.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-6 col-md-offset-3 displayBox">
        <br>
        <h2> Mentors Job History </h2>
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
    </div>
    <br>
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
        <br>
        <h2> Social Media </h2>
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
    <br>
  </div>
</template>

<script>
  import axios from 'axios'
  const userAvater = require('../../../assets/userAvatar.png')
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'

  export default {
    props: ['mentor'],
    data() {
      return {
        errorMessage: null,
        successMessage: null,
        profilePictureURL: getProfilePictureURL + this.mentor._id,
        imageSrc: userAvater,
        age: null,
        areasOfInterest: null,
        areasOfInterestRegistrationComplete: null,
        basicRegistrationComplete: null,
        distanceKM: null,
        education: null,
        educationMatches: null,
        email: null,
        facebook: null,
        firstName: null,
        hasLessExperienceIn: null,
        hasMoreExperienceIn: null,
        hasProfilePicture: null,
        hasSameExperienceIn: null,
        instagram: null,
        currentUserTooOldBy: null,
        currentUserTooYoungBy: null,
        mentorTooOldBy: null,
        mentorTooYoungBy: null,
        isUserLoggedIn: null,
        isWithinUsersRange: null,
        jobHistory: null,
        language: null,
        languageMatches: null,
        lastName: null,
        linkedIn: null,
        location: null,
        medium: null,
        mentorID: null,
        menteeSettings: null,
        mentees: null,
        mentorSettings: null,
        mentorSettingsComplete: null,
        mentors: null,
        numberOfEducationPreferencesMatches: null,
        numberOfEducationMatches: null,
        numberOfLanguageMatches: null,
        sharedNumberOfSharedInterests: null,
        snapchat: null,
        socialMediaComplete: null,
        twitter: null,
        userIsWithinMentorsRange: null,
        userName: null,
        website: null,
        youtube: null
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
          console.log(error.response.data.message)
          this.errorMessage = error.response.data.message
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        })
      }
    },
    beforeMount() {
      console.log(this.mentor)
      this.age = this.mentor.age
      this.areasOfInterest = this.mentor.areasOfInterest
      this.areasOfInterestRegistrationComplete = this.mentor.areasOfInterestRegistrationComplete
      this.basicRegistrationComplete = this.mentor.basicRegistrationComplete
      this.distanceKM = this.mentor.distanceKM
      this.education = this.mentor.education
      this.educationMatches = this.mentor.educationMatches
      this.email = this.mentor.email
      this.facebook = this.mentor.facebook
      this.firstName = this.mentor.firstName
      this.hasLessExperienceIn = this.mentor.hasLessExperienceIn
      this.hasMoreExperienceIn = this.mentor.hasMoreExperienceIn
      this.hasProfilePicture = this.mentor.hasProfilePicture
      this.hasSameExperienceIn = this.mentor.hasSameExperienceIn
      this.instagram = this.mentor.instagram
      this.currentUserTooOldBy = this.mentor.currentUserTooOldBy
      this.currentUserTooYoungBy = this.mentor.currentUserTooYoungBy
      this.mentorTooOldBy = this.mentor.mentorTooOldBy
      this.mentorTooYoungBy = this.mentor.mentorTooYoungBy
      this.isUserLoggedIn = this.mentor.isUserLoggedIn
      this.isWithinUsersRange = this.mentor.isWithinUsersRange
      this.jobHistory = this.mentor.jobHistory
      this.language = this.mentor.language
      this.languageMatches = this.mentor.languageMatches
      this.lastName = this.mentor.lastName
      this.linkedIn = this.mentor.linkedIn
      this.location = this.mentor.location
      this.medium = this.mentor.medium
      this.mentorID = this.mentor._id
      this.menteeSettings = this.mentor.menteeSettings
      this.mentees = this.mentor.mentees
      this.mentorSettings = this.mentor.mentorSettings
      this.mentors = this.mentor.mentors
      this.numberOfEducationPreferencesMatches = this.mentor.numberOfEducationPreferencesMatches
      this.numberOfEducationMatches = this.mentor.numberOfEducationMatches
      this.numberOfLanguageMatches = this.mentor.numberOfLanguageMatches
      this.sharedNumberOfSharedInterests = this.mentor.sharedNumberOfSharedInterests
      this.snapchat = this.mentor.snapchat
      this.socialMediaComplete = this.mentor.socialMediaComplete
      this.twitter = this.mentor.twitter
      this.userIsWithinMentorsRange = this.mentor.userIsWithinMentorsRange
      this.userName = this.mentor.userName
      this.website = this.mentor.website
      this.youtube = this.mentor.youtube
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

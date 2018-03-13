<template>
  <div>
    <div v-if="potentialInPersonMentors.length !== 0">
      <h2 class="text-center"> {{ potentialInPersonMentors.length }} Potential In Person Mentors </h2>
      <span v-for="(mentor, index) in potentialInPersonMentors" :key="index">
        <br>
        <div class="row">
          <div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 text-center displayBox">
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
            <img :src='getProfilePicture(mentor._id)' class="profileImage">
            <h4> {{ mentor.firstName + ' ' + mentor.lastName}} </h4>
            <h5>
              <b> @{{ mentor.userName }} </b>
            </h5>
            <span id="canMentorYouIn">
              <h4>
                <b>
                  <u> Mentoring Areas Of Interest </u>
                </b>
              </h4>
              <span v-for="(areaOfInterest, aIndex) in mentor.mentorHasMoreExperience" :key="aIndex">
                <p class="areaOfInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.yearsOfExperience }} </p>&nbsp;
              </span>
            </span>
            <span id="skillsWithSameExperience" v-if="mentor.similarInterests.length > 0">
              <h3>
                <u> Similar interests: </u>
              </h3>
              <span v-for="(similarInterest, index) in mentor.similarInterests" :key="index">
                <p class="areaOfInterest"> {{ similarInterest.value }} | {{ similarInterest.yearsOfExperience }} </p>&nbsp;
              </span>
            </span>
            <span id="travelDistance">
              <div class="distance" v-if="mentor.isWithinUsersRange">
                <p>
                  <b>Distance:
                    <span class="match"> {{mentor.distanceKM }}KM</span>
                  </b>
                </p>
              </div>
              <div class="distance" v-if="!mentor.isWithinUsersRange">
                <p>
                  <b>Distance:
                    <span class="notAMatch"> {{mentor.distanceKM }}KM</span>
                  </b>
                </p>
              </div>
            </span>
            <div class="hidden-xs">
              <button class="btn btn-primary view-profile btn-sm" @click="mentorMatch(mentor)">View Match</button>
              <button class="btn btn-primary btn-sm">Send Message</button>
              <button class="btn btn-success btn-sm" @click="applyForMentorship(mentor._id)"> Apply for Mentoring </button>
            </div>
            <div class="visible-xs">
              <button class="btn btn-primary view-profile btn-lg " @click="mentorMatch(mentor)">
                <i class="fas fa-eye"></i>
              </button>
              <button class="btn btn-primary btn-lg">
                <i class="fas fa-envelope"></i>
              </button>
              <br>
              <br>
              <button class="btn btn-success btn-sm" @click="applyForMentorship(mentor._id)"> Apply for Mentoring </button>
            </div>
            <br>
            <br>
          </div>
        </div>
        <br>
      </span>
    </div>
    <br>
    <div v-if="potentialInPersonMentors.length === 0" class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 displayBox">
      <h3>No potential mentors found. Change your settings to get more matches </h3>
      <p>
        <a href='edit-profile#mentee-preferences'> Change your Mentee settings
          <i class="fas fa-cog"></i>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'
  export default {
    props: ['mentors'],
    data() {
      return {
        currentUserID: this.$store.state.user.authUser._id,
        userName: this.$store.state.user.authUser.userName,
        potentialInPersonMentors: this.mentors
      }
    },
    methods: {
      mentorMatch(mentor) {
        this.$router.push({
          name: 'mentor-match',
          params: {
            mentor: mentor
          }
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
      },
      getProfilePicture(mentorsID) {
        return getProfilePictureURL + mentorsID
      },
      getMatchedAddress(mentor) {
        return '/view-match?userName=' + mentor.userName
      }
    },
    beforeMount() {
      this.mentors.forEach(mentor => {
        console.log(mentor)
        this.getCompatibility(mentor)
      })
    }
  }
</script>

<style>
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

  .match {
    color: green;
  }

  .notAMatch {
    color: red;
  }

  .areaOfInterest {
    background-color: #006400;
    color: white;
    border-radius: 2px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }

  .prefferedMentoringFormat {
    background-color: #006400;
    color: white;
    border-radius: 2px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
  }

  .distance {
    font-family: 'Montserrat', sans-serif;
    position: relative;
  }

  .profileImage {
    max-width: 200px;
    max-height: 200px;
    border-radius: 50%;
    padding: 1px;
    border: 1px solid #021a40;
  }

  .view-profile {
    background-color: purple;
  }

  .view-profile:hover {
    background-color: #333333;
  }

</style>

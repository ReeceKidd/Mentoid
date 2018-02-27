<template>
  <div class="container">

    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 displayBox">
      <h1> Find your perfect Mentor </h1>
      <br>
      <button class="btn btn-primary btn-lg" @click="matchMentors()">Find Mentors</button>
      <br>
      <br>
      </div>
    </div>

    <br>
    <br>

    <!-- Advanced search options -->
    <div class="row text-right">
      <div class="col-xs-12 col-sm-12">
        <p>
          <a href='edit-profile#mentee-preferences'> Change your Mentee settings
            <i class="fas fa-cog"></i>
          </a>
        </p>
      </div>
    </div>

    <div v-if="potentialInPersonMentors !== null">
      <h2> In person mentors </h2>
      <span v-for="(mentor, index) in potentialInPersonMentors" :key="index">
        <br>
        <div class="row mentorBox">
          <div class="col-xs-3 col-sm-3">
            <br>
            <img :src='getProfilePicture(mentor._id)' class="profileImage">
            <h4> {{ mentor.firstName + ' ' + mentor.lastName}} </h4>
            <h5>
              <b> @{{ mentor.userName }} </b>
            </h5>
            <br>
          </div>
          <div class="col-xs-9 col-sm-9">
            <span id="canMentorYouIn">
              <h3>
                <u> Can Mentor You In </u>
              </h3>
              <span v-for="(areaOfInterest, aIndex) in mentor.hasMoreExperienceIn" :key="aIndex">
                <p> {{ areaOfInterest.value }} : {{ areaOfInterest.yearsOfExperience }} </p>
              </span>
            </span>
            <span id="skillsWithSameExperience" v-if="mentor.hasSameExperienceIn.length > 0">
              <h3>
                <u> Same level of experience in: </u>
              </h3>
              <span v-for="(areaOfInterest, aIndex) in mentor.hasSameExperienceIn" :key="aIndex">
                <p> {{ areaOfInterest.value }} : {{ areaOfInterest.yearsOfExperience }} </p>
              </span>
            </span>
            <span id="travelDistance">
              <h3>
                Distance: {{ mentor.distance }}
              </h3>
            </span>
          </div>
        </div>
        <br>
      </span>
    </div>

    <div v-if="potentialOnlineMentors !== null">
      <h2> Online mentors </h2>
      <span v-for="(mentor, index) in potentialOnlineMentors" :key="index">
        <br>
        <div class="row mentorBox">
          <div class="col-xs-3 col-sm-3">
            <br>
            <img :src='getProfilePicture(mentor._id)' class="profileImage">
            <h4> {{ mentor.firstName + ' ' + mentor.lastName}} </h4>
            <h5>
              <b> @{{ mentor.userName }} </b>
            </h5>
            <br>
          </div>
          <div class="col-xs-9 col-sm-9">
            <span id="canMentorYouIn">
              <h3>
                <u> Can Mentor You In </u>
              </h3>
              <span v-for="(areaOfInterest, aIndex) in mentor.hasMoreExperienceIn" :key="aIndex">
                <p> {{ areaOfInterest.value }} : {{ areaOfInterest.yearsOfExperience }} </p>
              </span>
            </span>
            <span id="skillsWithSameExperience" v-if="mentor.hasSameExperienceIn.length > 0">
              <h3>
                <u> Same level of experience in: </u>
              </h3>
              <span v-for="(areaOfInterest, aIndex) in mentor.hasSameExperienceIn" :key="aIndex">
                <p> {{ areaOfInterest.value }} : {{ areaOfInterest.yearsOfExperience }} </p>
              </span>
            </span>
          </div>
        </div>
        <br>
      </span>
    </div>

    <div v-if="potentialOnlineAndInPersonMentors !== null">
      <h2> Potential Mentors </h2>
      <span v-for="(mentor, index) in potentialOnlineAndInPersonMentors" :key="index">
        <br>
        <div class="row displayBox">
          <div class="col-xs-3 col-sm-3">
            <br>
            <img :src='getProfilePicture(mentor._id)' class="profileImage">
            <h4> {{ mentor.firstName + ' ' + mentor.lastName}} </h4>
            <h5>
              <b> @{{ mentor.userName }} </b>
            </h5>
            <br>
          </div>
          <div class="col-xs-9 col-sm-9">
            <span id="canMentorYouIn">
              <h4>
                <b>
                  <u> Mentoring Areas Of Interest </u>
                </b>
              </h4>
              <span v-for="(areaOfInterest, aIndex) in mentor.hasMoreExperienceIn" :key="aIndex">
                <p class="areaOfInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.yearsOfExperience }} </p>
              </span>
            </span>
            <span id="prefferedMentoringFormat">
              <h5>
                <b>
                  <u> Preffered mentoring format </u>
                </b>
              </h5>
              <span v-for="(mentoringFormat, mIndex) in mentor.mentorSettings.prefferedMentoringFormats" :key="mIndex">
                <p class="prefferedMentoringFormat"> {{ mentoringFormat }} </p>
              </span>
            </span>
            <span id="skillsWithSameExperience" v-if="mentor.hasSameExperienceIn.length > 0">
              <h3>
                <u> Similar interests: </u>
              </h3>
              <span v-for="(areaOfInterest, aIndex) in mentor.hasSameExperienceIn" :key="aIndex">
                <p> {{ areaOfInterest.value }} : {{ areaOfInterest.yearsOfExperience }} </p>
              </span>
            </span>
            <span id="travelDistance">
              <p class="distance">
                <b>Distance: {{ mentor.distanceKM }}KM</b>
              </p>
            </span>
            <div id="buttons" class="text-right">
              <button class="btn btn-primary view-profile btn-sm" @click="mentorMatch(mentor)">View Profile</button>
              <button class="btn btn-primary btn-sm">Send Message</button>
              <button class="btn btn-success btn-sm"> Apply for Mentoring </button>
            </div>
            <br>
          </div>
        </div>
        <br>
      </span>
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
        maximumDistance: null,
        userName: null,
        sortType: 'random',
        potentialInPersonMentors: null,
        potentialOnlineMentors: null,
        potentialOnlineAndInPersonMentors: null
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      // Get username.
      const getUserNameURL = 'http://localhost:4000/get/user-name/'
      axios.get(getUserNameURL + userID).then(function (response) {
        self.userName = response.data.userName
      })
      // Get the users areas of interest
      const getAreasOfInterestUrl = 'http://localhost:4000/get/areas-of-interest/'
      axios.get(getAreasOfInterestUrl + userID).then(function (response) {
        self.areasOfInterest = response.data.areasOfInterest
      })
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
      matchMentors() {
        var self = this
        console.log('Attempting to match mentors.')
        var getPotentialMentorsURL = 'http://localhost:4000/get/potential-mentors/' + this.currentUserID + '/' + this.userName +
          '/' + this.sortType
        axios.get(getPotentialMentorsURL)
          .then(response => {
            console.log(response)
            if (response.data.inPersonMentors) {
              self.potentialInPersonMentors = response.data.inPersonMentors
            }
            if (response.data.onlineMentors) {
              self.potentialOnlineMentors = response.data.onlineMentors
            }
            if (response.data.onlineAndInPersonMentors) {
              self.potentialOnlineAndInPersonMentors = response.data.onlineAndInPersonMentors
            }
          })
          .catch(errors => {
            console.log(errors)
          })
      },
      getProfilePicture(mentorsID) {
        return getProfilePictureURL + mentorsID
      },
      getMatchedAddress(mentor) {
        return '/view-match?userName=' + mentor.userName
      },
      resetAdvancedSearchOptions() {
        return 'Hello'
      }
    }
  }
</script>
<style scoped>
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

<template>
  <div class="container">

    <div class="row">
      <h1 class="text-center"> Find your perfect Mentor </h1>
    </div>

    <br>

    <div class="row text-center">
      <button class="btn btn-primary btn-lg" @click="matchMentors()">Find Mentors</button>
    </div>

    <br>

    <!-- Advanced search options -->
    <div class="row text-right">
      <div class="col-xs-12 col-sm-12">
        <h4>
          <a href='edit-profile#mentee-preferences'> Change your Mentee settings
            <i class="fas fa-cog"></i>
          </a>
        </h4>
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
          <span id="canMentorYouIn"><h3>
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
          <span id="canMentorYouIn"><h3>
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
          <span id="canMentorYouIn"><h3>
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
            if(response.data.onlineAndInPersonMentors) {
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
      resetAdvancedSearchOptions() {},
      navigateTo(route) {
        this.$router.push(route)
      }
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

  .mentorBox {
    outline: 1px solid #104E8B;
  }
</style>

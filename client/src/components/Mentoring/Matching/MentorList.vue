<template>
  <div class="container">

    <div class="row">
      <h1 class="text-center"> Potential Mentors </h1>
    </div>

    <br>

    <div class="row text-center">
      <button class="btn btn-primary btn-lg" @click="matchMentors()">Find Mentors</button>
    </div>

    <br>


    <div class="row text-center">
      <div class="input" name="sortType">
        <label for="sortType">How would you like to sort?</label>
        <select id="typeOfSort" v-model="sortType">
          <option value="distance">Distance</option>
          <option value="bestMatch">Best Match</option>
          <option value="specificInterest">Specific Interest</option>
        </select>
      </div>
    </div>

    <!-- Advanced search options -->
    <div class="row text-center">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <h4>
          <a @click="advancedSearchOptionVisible === !advancedSearchOptionVisible, resetAdvancedSearchOptions()"> Advanced Search Options
            <i class="fas fa-caret-down"></i>
          </a>
        </h4>
        <p>
          <a href='edit-profile#mentee-preferences'> Change your Mentee settings
            <i class="fas fa-cog"></i>
          </a>
        </p>
      </div>
    </div>

    <!-- This will perform a random search across all areas of interest might only return one match -->
    <div class="row">
      <p class="text-center"> I'm feeling lucky</p>
    </div>

    <br>

  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        currentUserID: this.$store.state.user.authUser._id,
        advancedSearchOptionsVisible: false,
        checkedAreasOfInterest: null,
        maximumDistance: null,
        mentorPreferences: null,
        userName: null,
        sortType: null,
        users: [],
        areasOfInterest: [],
        matchedMentors: []
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
      // Get the names of the areas of interest
      const getAreasOfInterestNamesUrl = 'http://localhost:4000/get/areas-of-interest-names/'
      axios.get(getAreasOfInterestNamesUrl + userID).then(function (response) {
        self.areasOfInterestNames = response.data.areasOfInterest
      }).then(gotAreasOfInterestNames => {
        const getMenteeSettingsURL = 'http://localhost:4000/get/mentee-settings/'
        axios.get(getMenteeSettingsURL + userID).then(function (response) {
          let menteeSettings = response.data.menteeSettings
          self.wouldLikeAMentor = menteeSettings.wouldLikeAMentor.toString()
          self.checkedAreasOfInterest = menteeSettings.areasOfInterest
          self.checkedMentoringFormats = menteeSettings.prefferedMentoringFormats
          self.checkedLanguages = menteeSettings.languages
          self.checkedEducation = menteeSettings.prefferedEducation
          self.maximumTravelDistanceKM = menteeSettings.maximumTravelDistanceKM
          self.minimumAge = menteeSettings.minimumAge
          self.maximumAge = menteeSettings.maximumAge
          self.maxNumberOfMentors = menteeSettings.maxNumberOfMentors
        }).then(value => {
          // Gets the name values from the previous checkedAreas of interest.
          for (var x = 0; x < this.checkedAreasOfInterest.length; x++) {
            this.checkedAreasOfInterestNames.push(this.checkedAreasOfInterest[x].value)
          }
          // Initiliase the select all values based on the data received from the server.
          if (this.areasOfInterestNames.length === this.checkedAreasOfInterestNames.length) {
            this.checkAllAreasOfInterest = true
          }
          if (this.mentoringFormats.length === this.checkedMentoringFormats.length) {
            this.checkAllFormats = true
          }
          if (this.educationLevel.length === this.checkedEducation.length) {
            this.checkAllEducation = true
          }
          if (this.languages.length === this.checkedLanguages.length) {
            this.checkAllLanguages = true
          }
        })
      })
    },
    methods: {
      matchMentors() {
        var self = this
        var getPotentialMentorsURL = 'http://localhost:4000/get/potential-mentors/'
        axios.get(getPotentialMentorsURL + this.currentUserID + '/' + this.userName + '/' + this.sortType).then(
          function (response) {
            console.log(response)
            self.matchedMentors = response.data.matchedMentors
          }).catch(errors => {
          console.log(errors)
        })
      },
      resetAdvancedSearchOptions() {},
      navigateTo(route) {
        this.$router.push(route)
      }
    }
  }
</script>

<style>


</style>

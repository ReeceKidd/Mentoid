<template>
  <div>
    <div>
      <div class="text-center">
        <h3>Would you like a Mentor?</h3>
        <select class="wouldLikeAMentorSelector" v-model="wouldLikeAMentor">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <br>
      </div>
    </div>

    <!--  This form allows a user (mentee) to set their settings on what they are looking in a mentor.  -->
    <div>
      <div v-if="wouldLikeAMentor === 'true'">
        <!-- User has updaed areas of interest -->
        <br>
        <span v-if="areasOfInterestNames.length !== 0">
          <label> Which Areas would you like to Mentor in? </label>
          <br>
          <el-checkbox v-model="checkAllAreasOfInterest" @change="handleCheckAllAreasOfInterestChange">
            <span class="selectAll">Select All</span>
          </el-checkbox>
          <el-checkbox-group v-model="checkedAreasOfInterestNames" @change="handleCheckedAreasOfInterestChange" @blur="$v.checkedAreasOfInterestNames.$touch">
            <el-checkbox v-for="(areaOfInterest, index) in areasOfInterestNames" :label="areaOfInterest" :key="index" border size="medium">{{areaOfInterest}}</el-checkbox>
          </el-checkbox-group>
          <br>
          <br>
        </span>

        <!-- End -->
        <!-- User has no areas of interest -->
        <span v-else>
          <p class="errorMessage"> You must update your
            <a @click="navigateTo('/edit-profile')">Areas Of Interest </a>
          </p>
          <br>
        </span>
        <!-- End -->
        <label> What formats of mentoring are you interested in?</label>
        <br>
        <el-checkbox v-model="checkAllFormats" @change="handleCheckAllMentorFormats">
          <span class="selectAll">Select All</span>
        </el-checkbox>
        <el-checkbox-group v-model="checkedMentoringFormats" @change="handleCheckedMentorFormatsChange">
          <el-checkbox v-for="format in mentoringFormats" :label="format" :key="format" border size="medium">{{format}}</el-checkbox>
        </el-checkbox-group>
        <span v-if="wantsToMentorInPerson()">
          <br>
          <br>
          <label> What is your maximum travel distance for in person meetings?</label>
          <br>
          <input type="number" min="0" oninput="validity.valid||(years=0)" v-model="maximumTravelDistanceKM" name="maximumTravelDistanceKM">
          <b> KM</b>
          <br>
          <br>
        </span>
        <br>
        <br>
        <label> What languages can you be mentored in? </label>
        <br>
        <el-checkbox v-model="checkAllLanguages" @change="handleCheckAllLanguages">
          <span class="selectAll">Select All</span>
        </el-checkbox>
        <el-checkbox-group v-model="checkedLanguages" @change="handleCheckedLanguageChange">
          <el-checkbox v-for="language in languages" :label="language" :key="language" border size="medium">{{language}}</el-checkbox>
        </el-checkbox-group>
        <br>
        <br>
        <label> What levels of education would you like your Mentor to have? </label>
        <br>
        <el-checkbox v-model="checkAllEducation" @change="handleCheckAllEducation">
          <span class="selectAll">Select All</span>
        </el-checkbox>
        <el-checkbox-group v-model="checkedEducation" @change="handleCheckedEducationChange">
          <el-checkbox v-for="education in educationLevel" :label="education" :key="education" border size="medium">{{education}}</el-checkbox>
        </el-checkbox-group>
        <br>
        <br>
        <label>What is the youngest age you'll be Mentored by?</label>
        <br>
        <input type="number" min="16" oninput="validity.valid||(minimumAge=16)" v-model="minimumAge" name="minimumAge">
        <br>
        <br>
        <label>What is the oldest age you'll be Mentored by?</label>
        <br>
        <input type="number" max="120" oninput="validity.valid||(maximumAge=120)" v-model="maximumAge" name="maximumAge">
        <br>
        <br>
        <label> What is your maximum number of Mentors? </label>
        <br>
        <input type="number" min="1" oninput="validity.valid||(maxNumberOfMentors=0)" v-model="maxNumberOfMentors" name="maxNumberOfMentors">
        <br>
        <br>
        <div class="row text-center hidden-xs">
          <button class="btn btn-lg btn-primary" :disabled="$v.$invalid" @click="onSubmit"> Update mentee settings </button>
        </div>
        <div class="row text-center visible-xs">
          <button class="btn btn-md btn-primary" :disabled="$v.$invalid" @click="onSubmit"> Update mentee settings </button>
        </div>
      </div>

      <br>
      <!-- Update mentor settings error message -->
      <div class="row text-center">
        <div class="col-xs-12">
          <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
        </div>
      </div>
      <!-- End of error messages -->

      <!-- Update mentor settings success Message -->
      <div class="row">
        <div class="text-center">
          <p class="successMessage" v-if="successMessage !== null">{{successMessage}}</p>
        </div>
      </div>
      <!-- End of success message -->

      <div v-if="wouldLikeAMentor === 'false'">
        <p> Everyone has room for improvement, these people can take your skills to the next level. 
        </p>
        <h3 class="text-center">
          <u>
            These people want to Mentor someone just like you..
          </u>
        </h3>
        <br>
        <div class="row text-center">
          <div class="col-xs-4">
            Person 1.
          </div>
          <div class="col-xs-4">
            Person 2.
          </div>
          <div class="col-xs-4">
            Person 3.
          </div>
        </div>
        <br>
        <div class="col-xs-12 text-center">
          <button class="btn btn-danger" @click="doesNotWantAMentor()"> I do not want to Mentor </button>
        </div>

        <br>

        <br>
      <!-- Does not want to mentor error message -->
      <div class="row text-center">
        <div class="col-xs-12">
          <p class="errorMessage" v-if="doesNotWantAMentorErrorMessage !== null">{{doesNotWantAMentorErrorMessage}}</p>
        </div>
      </div>
      <!-- End of error messages -->

      <!-- Does not want to mentor success Message -->
      <div class="row">
        <div class="text-center">
          <p class="successMessage" v-if="doesNotWantAMentorSuccessMessage !== null">{{doesNotWantAMentorSuccessMessage}}</p>
        </div>
      </div>
      <!-- End of success message -->

      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {
    required,
    minLength,
    minValue
  } from 'vuelidate/lib/validators'
  const updateMenteeSettingsURL = 'http://localhost:4000/update/mentee-settings/'
  export default {
    data() {
      return {
        userID: this.$store.state.user.authUser._id,
        userName: null,
        wouldLikeAMentor: 'true',
        areasOfInterest: [],
        areasOfInterestNames: [],
        checkAllAreasOfInterest: false,
        checkedAreasOfInterest: [],
        checkedAreasOfInterestNames: [],
        mentoringFormats: ['Online', 'In person'],
        checkAllFormats: false,
        checkedMentoringFormats: [],
        maximumTravelDistanceKM: 20,
        languages: ['English', 'Spanish', 'German'],
        checkAllLanguages: false,
        checkedLanguages: [],
        educationLevel: ['No education', 'High School', 'Certification', 'Vocational', 'Bachelors', 'Masters', 'PHD'],
        checkAllEducation: false,
        checkedEducation: [],
        minimumAge: 16,
        maximumAge: 120,
        maxNumberOfMentors: 10,
        successMessage: null,
        doesNotWantAMentorSuccessMessage: null,
        errorMessage: null,
        doesNotWantAMentorErrorMessage: null
      }
    },
    methods: {
      handleCheckAllAreasOfInterestChange(val) {
        this.checkedAreasOfInterestNames = val ? this.areasOfInterestNames : []
      },
      handleCheckedAreasOfInterestChange(value) {
        let checkedCount = value.length
        this.checkAllAreasOfInterestNames = checkedCount === this.areasOfInterestNames.length
      },
      handleCheckAllMentorFormats(val) {
        this.checkedMentoringFormats = val ? this.mentoringFormats : []
      },
      handleCheckedMentorFormatsChange(value) {
        let checkedCount = value.length
        this.checkAllFormats = checkedCount === this.mentoringFormats.length
      },
      wantsToMentorInPerson() {
        for (var i = 0; i < this.checkedMentoringFormats.length; i++) {
          if (this.checkedMentoringFormats[i] === 'In person') {
            return true
          }
        }
      },
      handleCheckAllLanguages(val) {
        this.checkedLanguages = val ? this.languages : []
      },
      handleCheckedLanguageChange(value) {
        let checkedCount = value.length
        this.checkAllLanguages = checkedCount === this.languages.length
      },
      handleCheckAllEducation(val) {
        this.checkedEducation = val ? this.educationLevel : []
      },
      handleCheckedEducationChange(value) {
        let checkedCount = value.length
        this.checkAllEducation = checkedCount === this.educationLevel.length
      },
      navigateTo(route) {
        this.$router.push(route)
      },
      doesNotWantAMentor() {
        var interestedInMentoringAreas = []
        this.checkedAreasOfInterestNames.forEach(value => {
          this.areasOfInterest.forEach(areaOfInterest => {
            if (areaOfInterest.value === value) {
              interestedInMentoringAreas.push(areaOfInterest)
            }
          })
        })
        var self = this
        /*
        It is important that only wouldLikeAMentor is updated so that the
        user does not have to reenter their settings if they change their
        mind.
        */
        axios.post(updateMenteeSettingsURL, {
          userID: this.userID,
          userName: this.userName,
          menteeSettings: {
            wouldLikeAMentor: false,
            areasOfInterest: interestedInMentoringAreas,
            prefferedMentoringFormats: this.checkedMentoringFormats,
            maximumTravelDistanceKM: this.maximumTravelDistanceKM,
            languages: this.checkedLanguages,
            prefferedEducation: this.checkedEducation,
            minimumAge: this.minimumAge,
            maximumAge: this.maximumAge,
            maxNumberOfMentors: this.maxNumberOfMentors
          }
        }).then(response => {
          self.doesNotWantAMentorSuccessMessage = response.data.message
          setTimeout(() => {
            self.doesNotWantAMentorSuccessMessage = null
          }, 3000)
        }).catch(error => {
          self.doesNotWantAMentorErrorMessage = error.response.data.message
          setTimeout(() => {
            self.doesNotWantAMentorErrorMessage = null
          }, 3000)
        })
      },
      onSubmit() {
        var interestedInMentoringAreas = []
        this.checkedAreasOfInterestNames.forEach(value => {
          this.areasOfInterest.forEach(areaOfInterest => {
            if (areaOfInterest.value === value) {
              interestedInMentoringAreas.push(areaOfInterest)
            }
          })
        })
        var self = this
        let booleanWouldLikeAMentor = (this.wouldLikeAMentor === 'true')
        axios.post(updateMenteeSettingsURL, {
          userID: this.userID,
          userName: this.userName,
          menteeSettings: {
            wouldLikeAMentor: booleanWouldLikeAMentor,
            areasOfInterest: interestedInMentoringAreas,
            prefferedMentoringFormats: this.checkedMentoringFormats,
            maximumTravelDistanceKM: this.maximumTravelDistanceKM,
            languages: this.checkedLanguages,
            prefferedEducation: this.checkedEducation,
            minimumAge: this.minimumAge,
            maximumAge: this.maximumAge,
            maxNumberOfMentors: this.maxNumberOfMentors
          }
        }).then(function (response) {
          self.successMessage = response.data.message
          setTimeout(() => {
            self.successMessage = null
          }, 3000)
        }).catch(error => {
          self.errorMessage = error.response.data.message
          setTimeout(() => {
            self.errorMessage = null
          }, 3000)
        })
      }
    },
    validations: {
      checkedAreasOfInterestNames: {
        required,
        minLength: minLength(1)
      },
      checkedMentoringFormats: {
        required,
        minLength: minLength(1)
      },
      checkedLanguages: {
        required,
        minLength: minLength(1)
      },
      checkedEducation: {
        required,
        minLength: minLength(1)
      },
      minimumAge: {
        required,
        minValue: minValue(16)
      },
      maximumAge: {
        required,
        minValue: minValue(16)
      },
      maxNumberOfMentors: {
        required,
        minValue: minValue(1)
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
    }
  }
</script>

<style scoped>
  select.wouldLikeAMentorSelector {
    height: 50px;
    text-align: center;
    font-size: 200%;

  }

  .el-checkbox.is-bordered.el-checkbox--medium {
    border: 0px;
    background-color: #104E8B;
    color: white;
  }

  .el-checkbox.is-bordered.el-checkbox.is-bordered {
    margin-right: 2px !important;
    margin-left: 0px !important;
  }

  .errorMessage {
    color: red;
  }

  .successMessage {
    color: green;
  }

  .el-checkbox.is-bordered.el-checkbox--medium.is-checked {
    border: 0px;
    background-color: black;
    color: white;
  }


  .el-checkbox-button {
    border-left-style: solid;
    border-left-width: 1px;
    border-left-color: rgb(220, 223, 230);
  }

  .el-checkbox-button.is-focus {
    border-left-style: solid;
    border-left-width: 1px;
    border-left-color: #409EFF;
  }

  .selectAll {
    font-size: 14px;
    color: black;
  }

</style>

<template>
  <div class="container">
    <!-- Desktop Version -->
    <div>
      <div class="col-xs-12 text-center">
        <h2>Would you like to have a Mentor?</h2>
        <br>
      </div>
    </div>

    <div>
      <div class="col-xs-12 text-center">
        <select class="wouldYouLikeToHaveAMentor" v-model="wouldLikeToHaveAMentor">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br>
        <br>
      </div>
    </div>

    <div>
      <div v-if="wouldLikeToHaveAMentor === 'Yes'">
        <label> Which Areas would you like to have a Mentor in? </label>
        <br>
        <el-checkbox :indeterminate="isIndeterminateAreasOfInterest" v-model="checkAllAreasOfInterest" @change="handleCheckAllAreasOfInterestChange">Select All</el-checkbox>
        <el-checkbox-group v-model="checkedAreasOfInterest" @change="handleCheckedAreasOfInterestChange">
          <el-checkbox v-for="areaOfInterest in areasOfInterest" :label="areaOfInterest" :key="areaOfInterest.value" border size="medium">{{areaOfInterest.value}}</el-checkbox>
        </el-checkbox-group>
        <br>
        <br>
        <label> What formats of mentoring are you interested in?</label>
        <br>
        <el-checkbox :indeterminate="isIndeterminateMentoringFormat" v-model="checkAllFormats" @change="handleCheckAllMentorFormats">Select All</el-checkbox>
        <el-checkbox-group v-model="checkedMentoringFormats" @change="handleCheckedMentorFormatsChange">
          <el-checkbox v-for="format in mentoringFormats" :label="format" :key="format" border size="medium">{{format}}</el-checkbox>
        </el-checkbox-group>
        <span v-if="wantsToMentorInPerson()">
          <br>
          <br>
          <label> What is your maximum travel distance for in person meetings?</label>
          <br>
          <input type="number" min="0" oninput="validity.valid||(years=0)" v-model="maximumTravelDistance" name="maximumTravelDistance">
          <b> KM</b>
          <br>
          <br>
        </span>
        <br>
        <br>
        <label> What languages can you be Mentored in </label>
        <br>
        <el-checkbox :indeterminate="isIndeterminateLanguage" v-model="checkAllLanguages" @change="handleCheckAllLanguages">Select All</el-checkbox>
        <el-checkbox-group v-model="checkedLanguages" @change="handleCheckedLanguageChange">
          <el-checkbox v-for="language in languages" :label="language" :key="language" border size="medium">{{language}}</el-checkbox>
        </el-checkbox-group>
        <br>
        <br>
        <label> What levels of education would you like your Mentor to have? </label>
        <br>
        <el-checkbox :indeterminate="isIndeterminateEducation" v-model="checkAllEducation" @change="handleCheckAllEducation">Select All</el-checkbox>
        <el-checkbox-group v-model="checkedEducation" @change="handleCheckedEducationChange">
          <el-checkbox v-for="education in educationLevel" :label="education" :key="education" border size="medium">{{education}}</el-checkbox>
        </el-checkbox-group>
        <!-- Do similar to this for all the different inputs -->
        <br v-if="!$v.checkedEducation.required && !$v.checkedEducation.$dirty">
        <p v-if="!$v.checkedEducation.required && !$v.checkedEducation.$dirty" class="errorMessage">
              You must specify the level of education you want your Mentor to have. 
        </p>
        <br>
        <br>
        <label>What is the youngest age you are willing to be Mentored by?</label>
        <br>
        <input type="number" min="16" oninput="validity.valid||(minimumAge=16)" v-model="minimumAge" name="minimumAge">
        <br>
        <br>
        <label>What is the oldest age you are willing to be Mentored by?</label>
        <br>
        <input type="number" max="120" oninput="validity.valid||(maximumAge=120)" v-model="maximumAge" name="maximumAge">
        <br>
        <br>
        <label> What is your maximum number of simultaneous Mentors? </label>
        <br>
        <input type="number" min="1" oninput="validity.valid||(numberOfMentees=0)" v-model="numberOfMentees" name="numberOfMentees">
        <br>
        <br>
        <div class="row text-center">
          <button class="btn btn-lg btn-primary" :disabled="$v.$invalid" @click="onSubmit"> Update mentor preferences </button>
        </div>
      </div>

      <div v-if="wouldLikeToHaveAMentor === 'No'">
        <p> Are you sure? These people might have a thing or two to teach you. 
        </p>
        <h3 class="text-center">
          <u>
            These people could take you to the next level. 
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
          <button class="btn btn-danger"> I do not want a Mentor </button>
        </div>

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
  export default {
    data() {
      return {
        wouldLikeToHaveAMentor: 'Yes',
        areasOfInterest: [],
        checkAllAreasOfInterest: false,
        checkedAreasOfInterest: [],
        isIndeterminateAreasOfInterest: true,
        mentoringFormats: ['Online', 'In person'],
        checkAllFormats: false,
        checkedMentoringFormats: [],
        maximumTravelDistance: '',
        isIndeterminateMentoringFormat: true,
        languages: ['English', 'Spanish', 'German'],
        checkAllLanguages: false,
        checkedLanguages: [],
        isIndeterminateLanguage: true,
        educationLevel: ['Any', 'No education', 'High School', 'Vocational', 'Bachelors', 'Masters', 'PHD'],
        checkAllEducation: false,
        checkedEducation: [],
        isIndeterminateEducation: true,
        minimumAge: 16,
        maximumAge: '',
        numberOfMentees: 1,
        successMessage: null
      }
    },
    methods: {
      handleCheckAllAreasOfInterestChange(val) {
        this.checkedAreasOfInterest = val ? this.areasOfInterest : []
        this.isIndeterminateAreasOfInterest = false
      },
      handleCheckedAreasOfInterestChange(value) {
        let checkedCount = value.length
        this.checkAllAreasOfInterest = checkedCount === this.areasOfInterest.length
        this.isIndeterminateAreasOfInterest = checkedCount > 0 && checkedCount < this.areasOfInterest.length
      },
      handleCheckAllMentorFormats(val) {
        this.checkedMentoringFormats = val ? this.mentoringFormats : []
        this.isIndeterminateMentoringFormat = false
      },
      handleCheckedMentorFormatsChange(value) {
        let checkedCount = value.length
        this.checkAllFormats = checkedCount === this.mentoringFormats.length
        this.isIndeterminateMentoringFormat = checkedCount > 0 && checkedCount < this.mentoringFormats.length
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
        this.isIndeterminateLanguage = false
      },
      handleCheckedLanguageChange(value) {
        let checkedCount = value.length
        this.checkAllLanguages = checkedCount === this.languages.length
        this.isIndeterminateLanguage = checkedCount > 0 && checkedCount < this.languages.length
      },
      handleCheckAllEducation(val) {
        this.checkedEducation = val ? this.educationLevel : []
        this.isIndeterminateEducation = false
      },
      handleCheckedEducationChange(value) {
        let checkedCount = value.length
        this.checkAllEducation = checkedCount === this.educationLevel.length
        this.isIndeterminateEducation = checkedCount > 0 && checkedCount < this.educationLevel.length
      },
      navigateTo(route) {
        this.$router.push(route)
      },
      onSubmit() {
        // Parses the years input as the html validates it and converts it to a string.
        for (var x = 0; x < this.areasOfInterest.length; x++) {
          this.areasOfInterest[x].years = parseInt(this.areasOfInterest[x].years)
        }
        const url = 'http://localhost:4000/update/mentor-preferences/'
        // Need a way to add a preffered distance if it's not equal to blank.
        axios.post(url, {
          _id: this.currentUser._id,
          mentoringPreferences: {
            areasOfInterest: this.checkedAreasOfInterest,
            prefferedMentoringFormats: this.mentoringFormats,
            maximumTravelDistance: this.maximumTravelDistance,
            mentoringLanguages: this.checkedMentoringFormats,
            prefferedEducation: this.checkedEducation,
            prefferedFieldOfWork: this.checkedFieldsOfWork,
            minimumAge: this.minimumAge,
            maximumAge: this.maximumAge
          }
        }).then(function (response) {
          this.successMessage = response
        }).catch(error => {
          this.errorMessage = error.response.data.message
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        })
      }
    },
    validations: {
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
      checkedFieldsOfWork: {
        required,
        minLength: minLength(1)
      },
      checkedAreasOfInterest: {
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
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      // Get the users areas of interest
      const getAreasOfInterestUrl = 'http://localhost:4000/get/areas-of-interest-names/'
      axios.get(getAreasOfInterestUrl + userID).then(function (response) {
        self.areasOfInterest = response.data.areasOfInterest
      })
    }
  }
</script>

<style scoped>
  select.wouldYouLikeToHaveAMentor {
    width: 20%;
    height: 50px;
    text-align: center;
    font-size: 200%;

  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .errorMessage {
    color: red;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #104E8B;
    background-color: #eee;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }

  .el-checkbox.is-bordered.el-checkbox--medium {
    padding: 7px 20px 7px 10px;
    border-radius: 4px;
    height: 36px;
    background-color: #104E8B;
    color: white;
}

.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: black;
    border-color: black;
}

.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: red;
    border-color: #409EFF;
}

</style>

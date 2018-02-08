<template>
  <div class="container">
    <!-- Desktop Version -->
    <div>
      <div class="col-xs-12 text-center">
        <h1>Would you like to be a Mentor?</h1>
        <br>
      </div>
    </div>

    <div>
      <div class="col-xs-12 text-center">
        <select class="wouldYouLikeToMentorSelector" v-model="wouldLikeToMentor">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br>
        <br>
      </div>
    </div>

    <div>
      <div v-if="wouldLikeToMentor === 'Yes'">
        <label> Which Areas would you like to Mentor in? </label>
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
        <label> What languages can you Mentor in? </label>
        <br>
        <el-checkbox :indeterminate="isIndeterminateLanguage" v-model="checkAllLanguages" @change="handleCheckAllLanguages">Select All</el-checkbox>
        <el-checkbox-group v-model="checkedLanguages" @change="handleCheckedLanguageChange">
          <el-checkbox v-for="language in languages" :label="language" :key="language" border size="medium">{{language}}</el-checkbox>
        </el-checkbox-group>
        <br>
        <br>
        <label> What levels of education would you be willing to Mentor? </label>
        <br>
        <el-checkbox :indeterminate="isIndeterminateEducation" v-model="checkAllEducation" @change="handleCheckAllEducation">Select All</el-checkbox>
        <el-checkbox-group v-model="checkedEducation" @change="handleCheckedEducationChange">
          <el-checkbox v-for="education in educationLevel" :label="education" :key="education" border size="medium">{{education}}</el-checkbox>
        </el-checkbox-group>
        <br>
        <br>
        <label>What is the youngest age you are willing to Mentor?</label>
        <br>
        <input type="number" min="16" oninput="validity.valid||(minimumAge=16)" v-model="minimumAge" name="minimumAge">
        <br>
        <br>
        <label>What is the oldest age you are willing to Mentor?</label>
        <br>
        <input type="number" max="120" oninput="validity.valid||(maximumAge=120)" v-model="maximumAge" name="maximumAge">
        <br>
        <br>
        <label> What field of work would you like to Mentor? </label>
        <br>
        <el-checkbox :indeterminate="isIndeterminateFieldOfWork" v-model="checkAllFieldsOfWork" @change="handleCheckAllFieldsOfWork">Select All</el-checkbox>
        <el-checkbox-group v-model="checkedFieldsOfWork" @change="handleCheckedFieldOfWorkChange">
          <el-checkbox v-for="field in fieldsOfWork" :label="field" :key="field" border size="medium">
            <span>{{field}}</span>
            <br>
          </el-checkbox>
        </el-checkbox-group>
        <br>
        <div class="row text-center">
        <button class="btn btn-lg btn-primary" :disabled="$v.$invalid" @click="onSubmit"> Submit </button>
      </div>
      </div>

      <div v-if="wouldLikeToMentor === 'No'">
        <p> You do not need to be an expert to Mentor. You just need more experience than your potential Mentee. Being a Mentor
          is one of the fastest ways to improve your areas of interest.
        </p>
        <h3 class="text-center">
          <u>
            These people want a Mentor just like you.
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
          <button class="btn btn-danger"> SKIP </button>
        </div>

      </div>
    </div>
  </div>


  <!-- Mobile Version -->

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
        wouldLikeToMentor: 'Yes',
        areasOfInterest: [],
        checkAllAreasOfInterest: false,
        checkedAreasOfInterest: [],
        isIndeterminateAreasOfInterest: true,
        mentoringFormats: ['Online', 'In person'],
        checkAllFormats: false,
        checkedMentoringFormats: [],
        maximumTravelDistance: 20,
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
        fieldsOfWork: ['Any',
          'Agriculture, Food, and Natural Resources',
          'Architecture and Construction',
          'Arts, Audio/Video Technology, and Communications',
          'Business, Management, and Administration',
          'Education and Training',
          'Finance',
          'Government and Public Administration',
          'Military',
          'Hospitality and Tourism',
          'Law, Public Safety, Corrections, and Security',
          'Manufacturing',
          'Marketing, Sales, and Service',
          'Science, Technology, Engineering, and Mathematics',
          'Transportation, Distribution, and Logistics'
        ],
        checkAllFieldsOfWork: false,
        checkedFieldsOfWork: [],
        isIndeterminateFieldOfWork: true
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
      handleCheckAllFieldsOfWork(val) {
        this.checkedFieldsOfWork = val ? this.fieldsOfWork : []
        this.isIndeterminateFieldOfWork = false
      },
      handleCheckedFieldOfWorkChange(value) {
        let checkedCount = value.length
        this.checkAllFieldsOfWork = checkedCount === this.fieldsOfWork.length
        this.isIndeterminateFieldOfWork = checkedCount > 0 && checkedCount < this.fieldsOfWork.length
      },
      navigateTo(route) {
        this.$router.push(route)
      },
      onSubmit() {
        this.navigateTo('/mentee-preferences')
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
  select.wouldYouLikeToMentorSelector {
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

</style>

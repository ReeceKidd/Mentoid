<template>
  <div class="container-fluid">
    <!-- This component is different depending on whether it is viewed in mobile or on desktop -->

    <div class="row">
      <div class="visible-xs">
        <button @click="onAddEducation" class="btn btn-success btn-md">Add Education</button>
        <br> 
        <br>
        <button @click="onSubmit" class="btn btn-danger btn-md" v-if="education.length === 0"> Skip</button>
      </div>
      <div class="hidden-xs">
        <button @click="onAddEducation" class="btn btn-success btn-lg">Add Education</button>
        <button @click="onSubmit" class="btn btn-danger btn-lg" v-if="education.length === 0"> Skip</button>
      </div>

      <div class="education" v-for="(currentEducation, index) in education" :key="currentEducation.id">
        <div>
          <h3>
            <u>Education {{ index + 1}} </u>
          </h3>
          <div class="input" :class="{invalid: $v.education.$each[index].$error}">
            <label :for="currentEducation.school">School</label>
            <input type="text" :id="currentEducation.school" @blur="$v.education.$each[index].school.$touch()" v-model="currentEducation.school">
            <p v-if="!$v.education.$each[index].school.required && $v.education.$each[index].school.$dirty" class="errorMessage">
              School is required
            </p>
            <p v-if="!$v.education.$each[index].school.minLength && $v.education.$each[index].school.$dirty" class="errorMessage">
              School must be at least two characters long.
            </p>
            <p v-if="!$v.education.$each[index].school.alphaAndWhitespace && $v.education.$each[index].school.$dirty" class="errorMessage">
              School can only contain alphabetical and space characters.
            </p>
            <label :for="currentEducation.degree">Degree</label>
            <select v-model="currentEducation.degree">
              <option>High School</option>
              <option>Vocational</option>
              <option>Certification</option>
              <option>Bachelors</option>
              <option>Masters</option>
              <option>PHD</option>
            </select>
            <label :for="currentEducation.fieldOfStudy">Field of study</label>
            <input type="text" :id="currentEducation.fieldOfStudy" @blur="$v.education.$each[index].fieldOfStudy.$touch()" v-model="currentEducation.fieldOfStudy">
            <p v-if="!$v.education.$each[index].fieldOfStudy.required && $v.education.$each[index].fieldOfStudy.$dirty" class="errorMessage">
              Field of study is required
            </p>
            <p v-if="!$v.education.$each[index].fieldOfStudy.minLength && $v.education.$each[index].fieldOfStudy.$dirty" class="errorMessage">
              Field of study must be at least two characters long.
            </p>
            <p v-if="!$v.education.$each[index].fieldOfStudy.alphaAndWhitespace && $v.education.$each[index].fieldOfStudy.$dirty" class="errorMessage">
              Field of study can only contain alphabetical and space characters.
            </p>
            <label :for="currentEducation.country">Country</label>
            <input type="text" :id="currentEducation.country" @blur="$v.education.$each[index].country.$touch()" v-model="currentEducation.country">
            <p v-if="!$v.education.$each[index].country.required && $v.education.$each[index].country.$dirty" class="errorMessage">
              Country is required
            </p>
            <p v-if="!$v.education.$each[index].country.minLength && $v.education.$each[index].country.$dirty" class="errorMessage">
              Country must be at least two characters long.
            </p>
            <p v-if="!$v.education.$each[index].country.alphaAndWhitespace && $v.education.$each[index].country.$dirty" class="errorMessage">
              Country can only contain alphabetical and space characters.
            </p>
            <div>
              <label>Start Year</label>
              <input type="text" :id="currentEducation.startYear" @blur="$v.education.$each[index].startYear.$touch()" v-model="currentEducation.startYear">
            </div>
            <p v-if="!$v.education.$each[index].startYear.required && $v.education.$each[index].startYear.$dirty" class="errorMessage">
              The year you started is required.
            </p>
            <p v-if="!$v.education.$each[index].startYear.validYear && $v.education.$each[index].startYear.$dirty" class="errorMessage">
              Your starting year must be in the following format: YYYY
            </p>
            <p v-if="!$v.education.$each[index].startYear.greaterThanCurrentYear && $v.education.$each[index].startYear.$dirty" class="errorMessage">
              You cannot start in the future.
            </p>
            <div>
              <label>Graduation Year</label>
              <input type="text" :id="currentEducation.endYear" @blur="$v.education.$each[index].endYear.$touch()" v-model="currentEducation.endYear">
              <p v-if="!$v.education.$each[index].endYear.required && $v.education.$each[index].endYear.$dirty" class="errorMessage">
                End year is required
              </p>
              <p v-if="!$v.education.$each[index].endYear.validYear && $v.education.$each[index].endYear.$dirty" class="errorMessage">
                Your ending year must be in the following format: YYYY
              </p>
            </div>
            <br>
            <div class="hidden-xs">
              <button @click="onDeleteEducation(currentEducation.educationID)" class="btn-danger btn btn-md">Delete Current Education</button>
              <button @click="onAddEducation()" class="btn btn-success btn-md">Add Education</button>
              <br>
            </div>
            <div class="visible-xs">
              <button @click="onDeleteEducation(currentEducation.educationID)" class="btn-danger btn btn-sm">Delete Current Education</button>
              <br>
              <br>
              <button @click="onAddEducation()" class="btn btn-success btn-sm">Add Education</button>
              <br>
            </div>
          </div>
        </div>
      </div>
      </div>

    <br>

    <!-- Error messages -->
    <div class="row">
      <div class="text-center">
        <p v-if="!$v.education.required" class="errorMessage"> Please add at least one educational experience or click skip. </p>
      </div>
    </div>

    <div class="row">
      <div class="text-center">
        <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
      </div>
    </div>
    <!-- Error messages -->

    <!-- Success message -->
    <div class="row">
      <div class="text-center">
        <p class="successMessage" v-if="successMessage !== null">{{successMessage}}</p>
      </div>
    </div>
    <!-- End of success message -->

    <br>

    <div class="text-center visible-xs">
      <button class="btn btn-sm btn-primary" :disabled="$v.education.$invalid" @click="onSubmit"> Update Education History </button>
    </div>
    <div class="text-center hidden-xs">
      <button class="btn btn-lg btn-primary" :disabled="$v.education.$invalid" @click="onSubmit"> Update Education History </button>
    </div>
    <br>
  </div>

</template>


<script>
  import {
    required,
    minLength
  } from 'vuelidate/lib/validators'

  import axios from 'axios'

  const date = new Date()
  var currentYear = date.getFullYear()

  var regexForAlphabeticAndWhiteSpace = /^[a-zA-Z ]+$/

  function alphaAndWhitespace(input) {
    if (input.length === 0) {
      return true
    }
    var result = input.match(regexForAlphabeticAndWhiteSpace) ? 'passed' : 'failed'
    if (result === 'passed') {
      return true
    } else {
      return false
    }
  }

  function validYear(year) {
    if (year.length !== 4) return false
    if (!year.match(/\d{4}/)) return false
    return true
  }

  function greaterThanCurrentYear(year) {
    if (parseInt(year) > currentYear) return false
    return true
  }

  export default {
    data() {
      return {
        education: [],
        currentUser: this.$store.state.user.authUser,
        age: null,
        noEducation: null,
        errorMessage: null,
        successMessage: null
      }
    },
    methods: {
      onAddEducation() {
        const newEducation = {
          educationID: this.education.length,
          school: '',
          degree: '',
          fieldOfStudy: '',
          startYear: '',
          endYear: '',
          country: ''
        }
        this.education.push(newEducation)
      },
      navigateTo(route) {
        this.$router.push(route)
      },
      onSubmit() {
        const url = 'http://localhost:4000/update/education/'
        var that = this
        axios.post(url, {
          education: this.education,
          _id: this.currentUser._id,
          age: this.age
        }).then(function (response) {
          that.successMessage = 'Updated education history successfully.'
          setTimeout(() => {
            that.successMessage = null
          }, 3000)
        }).catch(error => {
          this.errorMessage = error.response.data.message
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        })
      },
      onDeleteEducation(id) {
        this.education = this.education.filter(currentEducation => currentEducation.educationID !== id)
      }
    },
    validations: {
      education: {
        required,
        $each: {
          school: {
            required,
            minLength: minLength(2),
            alphaAndWhitespace
          },
          degree: {
            required,
            minLength: minLength(2),
            alphaAndWhitespace
          },
          fieldOfStudy: {
            required,
            minLength: minLength(2),
            alphaAndWhitespace
          },
          country: {
            required,
            minLength: minLength(2),
            alphaAndWhitespace
          },
          startYear: {
            required,
            validYear,
            greaterThanCurrentYear
          },
          endYear: {
            required,
            validYear
          }
        }
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      // Get the users education history
      const getEducationHistory = 'http://localhost:4000/get/education-history/'
      axios.get(getEducationHistory + userID).then(function (response) {
        self.education = response.data.education
      })
      // Get the users age
      const getAgeUrl = 'http://localhost:4000/get/age/'
      axios.get(getAgeUrl + userID).then(function (response) {
        self.age = response.data.age
      })
    }
  }
</script>

<style scoped>


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
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .errorMessage {
    color: red;
  }

  .successMessage {
    color: green;
  }

  .input.yearInputDesktop {
    width: 50%;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #104E8B;
    background-color: #fff;
  }

  .invalid input {
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

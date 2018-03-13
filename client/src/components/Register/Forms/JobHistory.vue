<template>
  <div>

    <div>
      <div class="text-center">
        <button @click="onAddExperience" class="btn btn-success btn-lg">Add Experience</button>
        <br>
        <br>
        <button @click="onSubmit" class="btn btn-danger" v-if="experiences.length === 0"> Skip</button>
      </div>
    <!-- End of Mobile Version of job history and buttons -->

    <!-- Form -->

      <div class="experiences" v-for="(experience, index) in experiences" :key="experience.id">
          <h3>
            <u>Experience {{ index + 1}} </u>
          </h3>
          <div class="input" :class="{invalid: $v.experiences.$each[index].$error}">
            <label :for="experience.title">Title</label>
            <input type="text" :id="experience.title" @blur="$v.experiences.$each[index].title.$touch()" v-model="experience.title">
            <p v-if="!$v.experiences.$each[index].title.required && $v.experiences.$each[index].title.$dirty" class="errorMessage">
              Job title is required
            </p>
            <p v-if="!$v.experiences.$each[index].title.minLength && $v.experiences.$each[index].title.$dirty" class="errorMessage">
              Job title must be at least two characters.
            </p>
            <p v-if="!$v.experiences.$each[index].title.alphaAndWhitespace && $v.experiences.$each[index].title.$dirty" class="errorMessage">
              Job title can only contain alphabetical and space characters.
            </p>
            <label :for="experience.company">Company</label>
            <input type="text" :id="experience.company" @blur="$v.experiences.$each[index].company.$touch()" v-model="experience.company">
            <p v-if="!$v.experiences.$each[index].company.required && $v.experiences.$each[index].company.$dirty" class="errorMessage">
              Company is required
            </p>
            <div class="yearInputDesktop">
              <label :for="experience.startYear">Start Year</label>
              <input type="text" :id="experience.startYear" @blur="$v.experiences.$each[index].startYear.$touch()" v-model="experience.startYear">
            </div>
            <p v-if="!$v.experiences.$each[index].startYear.required && $v.experiences.$each[index].startYear.$dirty" class="errorMessage">
              The year you started is required.
            </p>
            <p v-if="!$v.experiences.$each[index].startYear.validYear && $v.experiences.$each[index].startYear.$dirty" class="errorMessage">
              Your starting year must be in the following format: YYYY
            </p>
            <label>Do you currently work here?</label>
            <select :id="experience.isWorkingHere" @change="experience.endYear = ''" @blur="$v.experiences.$each[index].isWorkingHere.$touch()" v-model="experience.isWorkingHere">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <p v-if="!$v.experiences.$each[index].isWorkingHere.required && $v.experiences.$each[index].isWorkingHere.$dirty" class="errorMessage">
              You must specify if you are still working here.
            </p>
            <br>
            <div v-if="experience.isWorkingHere === 'No'" class="yearInputDesktop">
              <label>End Year</label>
              <input type="text" :id="experience.endYear" v-model="experience.endYear">
            </div>
          </div>
          <br>
          <div class="hidden-xs">
            <button @click="onDeleteExperiences(experience.experienceID)" class="btn-danger btn btn-sm">Delete experience</button>
            <button @click="onAddExperience" class="btn btn-success btn-sm">Add Another Experience</button>
            <br>
            <br>
          </div>
          <div class="visible-xs">
            <button @click="onDeleteExperiences(experience.experienceID)" class="btn-danger btn btn-sm">Delete experience</button>
            <br>
            <br>
            <button @click="onAddExperience" class="btn btn-success btn-sm">Add Another Experience</button>
            <br>
            <br>
          </div>
      </div>
    <!-- End of Form -->
    <br>

    <!-- Error messages -->
    <div class="row text-center">
      <p v-if="!$v.experiences.required" class="errorMessage"> Please add at least one experience or click "Never had a job" </p>
    </div>

    <div class="row text-center">
      <div class="col-xs-12">
        <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
      </div>
    </div>
    <!-- End of error messages -->

    <!-- Success Message -->
    <div class="row">
      <div class="text-center">
        <p class="successMessage" v-if="successMessage !== null">{{successMessage}}</p>
      </div>
    </div>
    <!-- End of success message -->

    <br>

    <div class="text-center hidden-xs">
      <button class="btn btn-lg btn-primary" :disabled="$v.experiences.$invalid" @click="onSubmit"> Update Job History </button>
    </div>
    <div class="text-center visible-xs">
      <button class="btn btn-sm btn-primary" :disabled="$v.experiences.$invalid" @click="onSubmit"> Update Job History </button>
    </div>
    <br>
    </div>
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
        experiences: [],
        currentUser: this.$store.state.user.authUser,
        age: '',
        neverHadAJob: null,
        errorMessage: null,
        successMessage: null
      }
    },
    methods: {
      onAddExperience() {
        const newExperience = {
          experienceID: this.experiences.length,
          title: '',
          company: '',
          isWorkingHere: '',
          startYear: '',
          endYear: ''
        }
        this.experiences.push(newExperience)
      },
      onDeleteExperiences(id) {
        this.experiences = this.experiences.filter(experience => experience.experienceID !== id)
      },
      navigateTo(route) {
        this.$router.push(route)
      },
      onSubmit() {
        const url = 'http://localhost:4000/update/job-history/'
        var that = this
        axios.post(url, {
          experiences: this.experiences,
          _id: this.currentUser._id,
          age: this.age
        }).then(function (response) {
          that.successMessage = 'Updated job history successfully.'
          setTimeout(() => {
            that.successMessage = null
          }, 3000)
        }).catch(error => {
          this.errorMessage = error.response.data.message
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        })
      }
    },
    validations: {
      experiences: {
        required,
        $each: {
          title: {
            required,
            minLength: minLength(2),
            alphaAndWhitespace
          },
          company: {
            required,
            alphaAndWhitespace
          },
          isWorkingHere: {
            required
          },
          startYear: {
            required,
            validYear,
            greaterThanCurrentYear
          }
        }
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      // Get the users experience history
      const getJobHistory = 'http://localhost:4000/get/job-history/'
      axios.get(getJobHistory + userID).then(function (response) {
        self.experiences = response.data.jobHistory
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

<template>
  <div class="container">
    <div class="row hidden-xs">
      <div class="col-sm-8 col-sm-offset-2">
        <h2 class="text-center">
          Please add your employment experience.
        </h2>
      </div>
    </div>

    <div class="row visible-xs">
      <div class="col-xs-10 col-xs-offset-1">
        <h2>
          Please add your employment experience.
        </h2>
      </div>
    </div>

    <br>

    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 text-center">
      <button @click="onAddExperience" class="btn btn-success">Add Experience</button>
      <button @click="onSubmit" class="btn btn-danger" v-if="experiences.length === 0"> Never had a job</button>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="onSubmit">

        <div class="experiences" v-for="(experience, index) in experiences" :key="experience.id">

          <div class="col-xs-12 col-sm-8 col-sm-offset-2">
            <h3 class="text-center"> Experience {{ index + 1}} </h3>
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
              <label>Start Year</label>
              <input type="text" :id="experience.startDate" @blur="$v.experiences.$each[index].startDate.$touch()" v-model="experience.startDate">
              <p v-if="!$v.experiences.$each[index].startDate.required && $v.experiences.$each[index].startDate.$dirty" class="errorMessage">
                The year you started is required.
              </p>
              <p v-if="!$v.experiences.$each[index].startDate.validYear && $v.experiences.$each[index].startDate.$dirty" class="errorMessage">
                Your starting year must be in the following format: YYYY
              </p>
              <p v-if="!$v.experiences.$each[index].startDate.greaterThanCurrentYear && $v.experiences.$each[index].startDate.$dirty" class="errorMessage">
                You cannot start in the future.
              </p>
              <label>Do you currently work here?</label>
                <select :id="experience.isWorkingHere" @blur="$v.experiences.$each[index].isWorkingHere.$touch()" v-model="experience.isWorkingHere">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              <p v-if="!$v.experiences.$each[index].isWorkingHere.required && $v.experiences.$each[index].isWorkingHere.$dirty" class="errorMessage">
                You must specify if you are still working here.
              </p>
              <br>
              <div v-if="experience.isWorkingHere === 'No'">
              <label>Enter the year you finished working here</label>
              <input type="text" :id="experience.endDate" @blur="$v.experiences.$each[index].endDate.$touch()" v-model="experience.endDate">
              <p v-if="!$v.experiences.$each[index].endDate.required && $v.experiences.$each[index].endDate.$dirty" class="errorMessage">
                End year is required
              </p>
              <p v-if="!$v.experiences.$each[index].endDate.validYear && $v.experiences.$each[index].endDate.$dirty" class="errorMessage">
                Your ending year must be in the following format: YYYY
              </p>
              <p v-if="!$v.experiences.$each[index].endDate.greaterThanCurrentYear && $v.experiences.$each[index].endDate.$dirty" class="errorMessage">
                You cannot enter end dates greater than the current year.
              </p>
              </div>
              <div v-else>
                <span>{{currentlyWorkingHere(experience.endDate)}}</span>
              </div>
            </div>
            <br>
            <button @click="onDeleteExperiences(experience.id)" class="btn-danger btn btn-sm">Delete experience</button>
            <button @click="onAddExperience"  class="btn btn-success btn-sm">Add Another Experience</button>
          </div>
        </div>
    </form>
  </div>
  <br>

  <div class="row text-center">
        <p v-if="!$v.experiences.required" class="errorMessage"> Please add at least one experience or click "Never had a job" </p>
      </div>

      <div class="row text-center">
        <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
      </div>
      <br>

      <div class="row text-center">
        <button class="btn btn-lg btn-primary" :disabled="$v.experiences.$invalid" @click="onSubmit"> Submit </button>
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

  function validYear (year) {
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
        currentUserID: this.$store.state.user.authUser._id,
        neverHadAJob: null,
        errorMessage: null,
        count: 1
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
          startDate: {
            required,
            validYear,
            greaterThanCurrentYear
          },
          endDate: {
            required,
            validYear,
            greaterThanCurrentYear
          }
        }
      }
    },
    methods: {
      onAddExperience() {
        const newExperience = {
          id: this.count,
          title: '',
          company: '',
          isWorkingHere: '',
          startDate: '',
          endDate: ''
        }
        this.count++
        this.experiences.push(newExperience)
      },
      currentlyWorkingHere (endDate) {
        endDate = 9999
      },
      onDeleteExperiences(id) {
        this.experiences = this.experiences.filter(experience => experience.id !== id)
      },
      onSubmit() {
        const url = 'http://localhost:4000/update/job-history/'
        var that = this
        axios.post(url, {
          experiences: this.experiences,
          _id: this.currentUserID
        }).then(function (response) {
          console.log(response.data.message)
          that.navigateTo('/edit-profile')
        }).catch(error => {
          this.errorMessage = error.response.data.message
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        })
      }
    },
    beforeMount() {
      console.log(currentYear)
      var self = this
      // Checks if job history registration has already been complete
      const getAreasOfInterestCompleteValue = 'http://localhost:4000/get/areas-of-interest-registration-complete/'
      axios.get(getAreasOfInterestCompleteValue + self.currentUserID).then(function (response) {
        self.areasOfInterestRegistrationComplete = response.data.areasOfInterestRegistrationComplete
      })
    }
  }
</script>

<style scoped>
  .align-right {
    text-align: right;
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

  #yearsOfExperienceDesktop input {
    width: 10%;
  }

  #areOfInterestDesktop input {
    width: 50%
  }

  #yearsOfExperienceMobile input {
    width: 50%;
  }

  #areaOfInterestMobile input {
    width: 80%;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #104E8B;
    background-color: #eee;
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

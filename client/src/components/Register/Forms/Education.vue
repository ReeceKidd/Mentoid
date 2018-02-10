<template>
  <div class="container">
    <!-- This component is different depending on whether it is viewed in mobile or on desktop -->

    <div class="row hidden-xs">
      <div class="col-sm-8 col-sm-offset-2 text-center">
        <button @click="onAddEducation" class="btn btn-success">Add Education</button>
        <button @click="onSubmit" class="btn btn-danger" v-if="education.length === 0"> Skip</button>
      </div>
    </div>
    <!-- End of desktop version -->

    <div class="row visible-xs">
      <div class="col-xs-12 text-center">
        <button @click="onAddEducation" class="btn btn-success">Add Education</button>
        <br>
        <br>
        <button @click="onSubmit" class="btn btn-danger" v-if="education.length === 0"> Skip </button>
      </div>
    </div>
    <!-- End of Mobile Version of job history and buttons -->

    <!-- Desktop version of form -->
    <div class="row hidden-xs">
      <form @submit.prevent="onSubmit">

        <div class="education" v-for="(currentEducation, index) in education" :key="currentEducation.id">

          <div class="col-xs-12 col-sm-8 col-sm-offset-2">
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
              <input type="text" :id="currentEducation.degree" @blur="$v.education.$each[index].degree.$touch()" v-model="currentEducation.degree">
              <p v-if="!$v.education.$each[index].degree.required && $v.education.$each[index].degree.$dirty" class="errorMessage">
                Degree is required
              </p>
              <p v-if="!$v.education.$each[index].degree.minLength && $v.education.$each[index].degree.$dirty" class="errorMessage">
                Degree must be at least two characters long.
              </p>
              <p v-if="!$v.education.$each[index].degree.alphaAndWhitespace && $v.education.$each[index].degree.$dirty" class="errorMessage">
                Degree can only contain alphabetical and space characters.
              </p>
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
              <div class="yearInputDesktop">
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
              <div class="yearInputDesktop">
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
                <button @click="onDeleteEducation(currentEducation.id)" class="btn-danger btn btn-sm">Delete Current Education</button>
                <button @click="onAddEducation" class="btn btn-success btn-sm">Add Education</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- End of desktop version of form -->

    <!-- Mobile version of form -->
    <div class="row visible-xs">
      <form @submit.prevent="onSubmit">

        <div class="education" v-for="(currentEducation, index) in education" :key="currentEducation.id">

          <div class="col-xs-12 col-sm-8 col-sm-offset-2">
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
              <input type="text" :id="currentEducation.degree" @blur="$v.education.$each[index].degree.$touch()" v-model="currentEducation.degree">
              <p v-if="!$v.education.$each[index].degree.required && $v.education.$each[index].degree.$dirty" class="errorMessage">
                Degree is required
              </p>
              <p v-if="!$v.education.$each[index].degree.minLength && $v.education.$each[index].degree.$dirty" class="errorMessage">
                Degree must be at least two characters long.
              </p>
              <p v-if="!$v.education.$each[index].degree.alphaAndWhitespace && $v.education.$each[index].degree.$dirty" class="errorMessage">
                Degree can only contain alphabetical and space characters.
              </p>
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
              <div class="yearInputMobile">
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
              <label>End Year</label>
              <input type="text" :id="currentEducation.endYear" @blur="$v.education.$each[index].endYear.$touch()" v-model="currentEducation.endYear">
              <p v-if="!$v.education.$each[index].endYear.required && $v.education.$each[index].endYear.$dirty" class="errorMessage">
                End year is required
              </p>
              <p v-if="!$v.education.$each[index].endYear.validYear && $v.education.$each[index].endYear.$dirty" class="errorMessage">
                Your ending year must be in the following format: YYYY
              </p>
            </div>
            <br>
            <div class="visible-xs">
              <button @click="onDeleteEducation(currentEducation.id)" class="btn-danger btn btn-sm">Delete Current Education</button>
              <br>
              <br>
              <button @click="onAddEducation" class="btn btn-success btn-sm">Add Education</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- End of mobile job history form -->
    <br>

    <!-- Desktop error messages -->
    <div class="row hidden-xs text-center">
      <p v-if="!$v.education.required" class="errorMessage"> Please add at least one educational experience or click no education </p>
    </div>

    <div class="row hidden-xs text-center">
      <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
    </div>
    <!-- End of desktop error messages -->

    <!-- Mobile error messages -->
    <div class="row visible-xs">
      <div class="col-xs-12">
        <p v-if="!$v.education.required" class="errorMessage"> Please add at least one educational experience or click skip. </p>
      </div>
    </div>

    <div class="row visible-xs">
      <div class="col-xs-12">
        <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
      </div>
    </div>
    <!-- End of mobile error messages -->

    <br>

    <div class="row text-center">
      <button class="btn btn-lg btn-primary" :disabled="$v.education.$invalid" @click="onSubmit"> Update Education History </button>
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
        education: [],
        currentUser: this.$store.state.user.authUser,
        age: null,
        noEducation: null,
        errorMessage: null
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
    methods: {
      onAddEducation() {
        const newEducation = {
          educationID: this.education.length.toString(),
          school: '',
          degree: '',
          fieldOfStudy: '',
          startYear: '',
          endYear: ''
        }
        this.education.push(newEducation)
      },
      onDeleteEducation(id) {
        this.education = this.education.filter(currentEducation => currentEducation.id !== id)
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
          console.log(response)
          that.navigateTo('/upload-profile-picture')
        }).catch(error => {
          this.errorMessage = error.response.data.message
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        })
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      // Get the users age
      const getAgeUrl = 'http://localhost:4000/get/age/'
      axios.get(getAgeUrl + userID).then(function (response) {
        self.age = response.data.age
      })
    }
  }
</script>

<style scoped>
  .yearInputDesktop {
    width: 25%;
  }

  .yearInputMobile {
    width: 50%;
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

  .input.yearInputDesktop {
    width: 50%;
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

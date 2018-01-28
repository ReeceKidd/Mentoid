<template>
  <!-- This component is different on XS devices -->
    <div class="container">
      <!-- This is the desktop version of this registration section.  -->
      <div class="row hidden-xs">
        <div class="col-sm-12">
          <h1 class="text-center"> Hello {{ currentUser.userName }} </h1>
        </div>
        <div class="col-sm-8 col-sm-offset-2">
          <h2 class="text-center">
            Please add your hobbies, skills, areas of interest and your years of experience in each.
          </h2>
        </div>
      </div>

      <br class="hidden-xs">

      <div class="row hidden-xs text-center">
        <button @click="onAddAreaOfInterest" class="btn btn-success">Add Interest</button>
      </div>

      <br class="hidden-xs">


      <div class="row hidden-xs">
        <div class="col-sm-6 text-right">
          <div class="areasOfInterestList">
            <div id="areaOfInterestDesktop" v-for="(areaOfInterest, index) in areasOfInterest" :key="areaOfInterest.areaOfInterestID"
              :class="{invalid: $v.areasOfInterest.$each[index].value.$error}">
              <label :for="areaOfInterest.areaOfInterestID">
                <h4>Area of Interest
                  <b> {{index + 1}}: </b>
                </h4>
              </label>
              <input type="text" @blur="$v.areasOfInterest.$each[index].value.$touch" :id="areaOfInterest.areaOfInterestID" v-model="areaOfInterest.value"
                name="areaOfInterestValue">
              <br>
              <p v-if="!$v.areasOfInterest.$each[index].value.required && $v.areasOfInterest.$each[index].value.$dirty" class="errorMessage">
                You must enter an area of interest. </p>
              <p v-if="!$v.areasOfInterest.$each[index].value.alphaAndWhitespace && $v.areasOfInterest.$each[index].value.$dirty" class="errorMessage">
                Areas of interest can only alphabet characters. </p>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="areasOfInterestList">
            <div id="yearsOfExperienceDesktop" v-for="(areaOfInterest, index) in areasOfInterest" :key="areaOfInterest.areaOfInterestID"
              :class="{invalid: $v.areasOfInterest.$each[index].years.$error}">
              <label>
                <h4>Years of experience</h4>
              </label>
              <input type="number" min="0" oninput="validity.valid||(years=0)" @blur="$v.areasOfInterest.$each[index].years.$touch" @focus="$v.areasOfInterest.$each[index].years.$reset"
                :id="areaOfInterest.areaOfInterestID" v-model="areaOfInterest.years" name="yearsOfExperience">
              <button @click="onDeleteAreaOfInterest(areaOfInterest.areaOfInterestID)" class="btn-danger btn btn-sm">X</button>
              <br>
              <p v-if="!$v.areasOfInterest.$each[index].years.required && $v.areasOfInterest.$each[index].years.$dirty" class="errorMessage">
                Please enter years of experience in this area. </p>
            </div>
          </div>
        </div>
      </div>

      <br v-if="errorMessage !== null" class="hidden-xs">

      <div class="row hidden-xs">
        <div class="text-center">
          <p v-if="!$v.areasOfInterest.required" class="errorMessage"> Please add at least one area of interest. </p>
        </div>
      </div>

      <div class="row hidden-xs">
        <div class="text-center">
          <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
        </div>
      </div>

      <br class="hidden-xs">
      <!-- End of desktop version -->

      <!-- Mobile version  -->
      <div class="row visible-xs">
        <div class="col-xs-12">
          <h3>
            Please add your hobbies, skills, areas of interest and your years of experience in each.
          </h3>
        </div>
      </div>

      <br class="visible-xs">

      <div class="row visible-xs text-center">
        <button @click="onAddAreaOfInterest" class="btn btn-success">Add Interest</button>
      </div>

      <br class="visible-xs">
      <div class="row visible-xs">
        <div class="col-xs-6">
          <div class="areasOfInterestList">
            <div id="areaOfInterestMobile" v-for="(areaOfInterest, index) in areasOfInterest" :key="areaOfInterest.areaOfInterestID"
              :class="{invalid: $v.areasOfInterest.$each[index].value.$error}">
              <label :for="areaOfInterest.areaOfInterestID">
                Area of Interest
              </label>
              <input type="text" @blur="$v.areasOfInterest.$each[index].value.$touch" :id="areaOfInterest.areaOfInterestID" v-model="areaOfInterest.value"
                name="areaOfInterestValue">
              <br>
              <p v-if="!$v.areasOfInterest.$each[index].value.required && $v.areasOfInterest.$each[index].value.$dirty" class="errorMessage">
                You must enter an area of interest. </p>
              <p v-if="!$v.areasOfInterest.$each[index].value.alphaAndWhitespace && $v.areasOfInterest.$each[index].value.$dirty" class="errorMessage">
                Areas of interest can only alphabet characters. </p>
            </div>
          </div>
        </div>
        <div class="col-xs-6">
          <div class="areasOfInterestList">
            <div id="yearsOfExperienceMobile" v-for="(areaOfInterest, index) in areasOfInterest" :key="areaOfInterest.areaOfInterestID"
              :class="{invalid: $v.areasOfInterest.$each[index].years.$error}">
              <label>
                Experience
              </label>
              <input type="number" min="0" oninput="validity.valid||(years=0)" @blur="$v.areasOfInterest.$each[index].years.$touch" @focus="$v.areasOfInterest.$each[index].years.$reset"
                :id="areaOfInterest.areaOfInterestID" v-model="areaOfInterest.years" name="yearsOfExperience">
              <button @click="onDeleteAreaOfInterest(areaOfInterest.areaOfInterestID)" class="btn-danger btn btn-sm">X</button>
              <br>
              <p v-if="!$v.areasOfInterest.$each[index].years.required && $v.areasOfInterest.$each[index].years.$dirty" class="errorMessage">
                Please enter years of experience in this area. </p>
            </div>
          </div>
        </div>
      </div>
      
      <br v-if="errorMessage !== null" class="visible-xs">

      <div class="row visible-xs">
        <div class="col-xs-10 col-xs-offset-1">
          <p v-if="!$v.areasOfInterest.required" class="errorMessage"> Please add at least one area of interest. </p>
        </div>
      </div>

      <div class="row visible-xs">
        <div class="col-xs-10 col-xs-offset-1">
          <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
        </div>
      </div>

      <br class="visible-xs">
      <!-- End of mobile section -->

      <div class="row text-center">
        <button class="btn btn-lg btn-primary" :disabled="$v.areasOfInterest.$invalid" @click="onSubmit"> Submit </button>
      </div>


    </div>

</template>
<script>
  import {
    required,
    numeric
  } from 'vuelidate/lib/validators'

  import axios from 'axios'

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

  export default {
    data() {
      return {
        areasOfInterest: [],
        currentUser: this.$store.state.user.authUser,
        errorMessage: null,
        age: null,
        areasOfInterestRegistrationComplete: null
      }
    },
    methods: {
      onSubmit() {
        // Parses the years input as the html validates it and converts it to a string.
        for (var x = 0; x < this.areasOfInterest.length; x++) {
          this.areasOfInterest[x].years = parseInt(this.areasOfInterest[x].years)
        }
        const url = 'http://localhost:4000/update/areas-of-interest/'
        var that = this
        axios.post(url, {
          areasOfInterest: this.areasOfInterest,
          _id: this.currentUser._id,
          age: this.age
        }).then(function (response) {
          console.log(response.data.message)
          that.navigateTo('/register-job-history')
        }).catch(error => {
          this.errorMessage = error.response.data.message
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        })
      },
      navigateTo(route) {
        this.$router.push(route)
      },
      onAddAreaOfInterest() {
        const newHobby = {
          value: '',
          years: 0,
          areaOfInterestID: this.areasOfInterest.length
        }
        this.areasOfInterest.push(newHobby)
      },
      onDeleteAreaOfInterest(id) {
        this.areasOfInterest = this.areasOfInterest.filter(areaOfInterest => areaOfInterest.areaOfInterestID !== id)
      },
      getCurrentAge() {
        return this.age
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      // Get the users areas of interest
      const getAreasOfInterestUrl = 'http://localhost:4000/get/areas-of-interest/'
      axios.get(getAreasOfInterestUrl + userID).then(function (response) {
        self.areasOfInterest = response.data.areasOfInterest
      })
      // Get the users age
      const getAgeUrl = 'http://localhost:4000/get/age/'
      axios.get(getAgeUrl + userID).then(function (response) {
        self.age = response.data.age
      })
    },
    validations: {
      areasOfInterest: {
        required,
        $each: {
          value: {
            required,
            alphaAndWhitespace
          },
          years: {
            required,
            numeric
          }
        }
      }
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

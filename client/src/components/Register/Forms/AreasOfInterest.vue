<template>
  <!-- This component is different on XS devices -->
 
    <div class="container-fluid">
      <div class="row text-center">
        <button @click="onAddAreaOfInterest" class="btn btn-success btn-lg">Add Interest</button>
      </div>

      <!-- Desktop version -->
      <br class="hidden-xs">

      <div class="row hidden-xs" v-for="(areaOfInterest, index) in areasOfInterest" :key="areaOfInterest.areaOfInterestID">
        <div class="col-sm-8 col-sm-offset-2 displayBox">
        <div class="col-sm-6 text-right">
            <div id="areaOfInterestDesktop" 
              :class="{invalid: $v.areasOfInterest.$each[index].value.$error}">
              <br>
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
        <div class="col-sm-6">
          <br>
            <div id="yearsOfExperienceDesktop"
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
        <div class="col-xs-12 text-center" v-if="(index + 1) === areasOfInterest.length">
          <br>
          <button @click="onAddAreaOfInterest" class="btn btn-success">Add Another Interest</button>
          <br>
          <br>
          </div>
        </div>
      </div>
      <!-- End of desktop version -->

      <!-- Mobile version  -->
      <br class="visible-xs">
      <div class="row visible-xs text-center displayBox" v-for="(areaOfInterest, index) in areasOfInterest" :key="areaOfInterest.areaOfInterestID">
        <div class="col-xs-12">
          <br>
            <div
              :class="{invalid: $v.areasOfInterest.$each[index].value.$error}">
              <label :for="areaOfInterest.areaOfInterestID">
                Area of Interest {{ index + 1}}
              </label>
              <br>
              <input type="text" @blur="$v.areasOfInterest.$each[index].value.$touch" :id="areaOfInterest.areaOfInterestID" v-model="areaOfInterest.value"
                name="areaOfInterestValue">
              <br>
              <p v-if="!$v.areasOfInterest.$each[index].value.required && $v.areasOfInterest.$each[index].value.$dirty" class="errorMessage">
                You must enter an area of interest. </p>
              <p v-if="!$v.areasOfInterest.$each[index].value.alphaAndWhitespace && $v.areasOfInterest.$each[index].value.$dirty" class="errorMessage">
                Areas of interest can only alphabet characters. </p>
            </div>
        </div>
        <br>
        <div class="col-xs-12">
            <div
              :class="{invalid: $v.areasOfInterest.$each[index].years.$error}">
              <label>
                Years of Experience
              </label>
              <br>
              <input type="number" min="0" oninput="validity.valid||(years=0)" @blur="$v.areasOfInterest.$each[index].years.$touch" @focus="$v.areasOfInterest.$each[index].years.$reset"
                :id="areaOfInterest.areaOfInterestID" v-model="areaOfInterest.years" name="yearsOfExperience">
              <br>
              <p v-if="!$v.areasOfInterest.$each[index].years.required && $v.areasOfInterest.$each[index].years.$dirty" class="errorMessage">
                Please enter years of experience in this area. </p>
            </div>
            <br>
        </div>
        <div class="col-xs-12 text-center">
          <button @click="onDeleteAreaOfInterest(areaOfInterest.areaOfInterestID)" class="btn-danger btn btn-sm">Delete</button>
          <br>
          <br>
        </div>
        <div class="col-xs-12" v-if="(index + 1) === areasOfInterest.length">
          <br>
          <button @click="onAddAreaOfInterest" class="btn btn-success btn-sm">Add Another Interest</button>
          <br>
          <br>
          </div>
          <br>
          <br>
      </div>
      <!-- End of mobile section -->
      
      <br v-if="errorMessage !== null">
      <br v-if="successMessage !== null">

      <div class="row">
        <div class="text-center">
          <p v-if="!$v.areasOfInterest.required" class="errorMessage"> Please add at least one area of interest. </p>
        </div>
      </div>

      <div class="row">
        <div class="text-center">
          <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
        </div>
      </div>

      <div class="row">
        <div class="text-center">
          <p class="successMessage" v-if="successMessage !== null">{{successMessage}}</p>
        </div>
      </div>

      <br>
      <!-- End of mobile section -->

      <div class="row text-center">
        <button class="btn btn-lg btn-primary" :disabled="$v.areasOfInterest.$invalid" @click="onSubmit"> Update Areas Of Interest</button>
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
        successMessage: null,
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
        var that = this
        const url = 'http://localhost:4000/update/areas-of-interest/'
        axios.post(url, {
          areasOfInterest: this.areasOfInterest,
          _id: this.currentUser._id,
          age: this.age
        }).then(function (response) {
          that.successMessage = 'Updated areas of interest successfully.'
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
      // Get the users age
      const getAgeUrl = 'http://localhost:4000/get/age/'
      axios.get(getAgeUrl + userID).then(function (response) {
        self.age = response.data.age
      })
       // Get the users areas of interest
      const getAreasOfInterestUrl = 'http://localhost:4000/get/areas-of-interest/'
      axios.get(getAreasOfInterestUrl + userID).then(function (response) {
        self.areasOfInterest = response.data.areasOfInterest
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

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .errorMessage {
    color: red;
  }

  .successMessage {
    color: green;
  }

  #yearsOfExperienceDesktop input {
    width: 15%;
  }

  #areaOfInterestMobile input {
    width: 100%;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #104E8B;
    background-color: #fff;
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

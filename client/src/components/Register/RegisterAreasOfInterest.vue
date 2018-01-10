<template>
  <div id="areasOfInterest">
    <div class="row">
      <div class="col-xs-12">
        <h1 class="text-center"> Hello {{ currentUser.userName }} </h1>

      </div>
      <div class="col-xs-8 col-xs-offset-2">
        <h2 class="text-center">
          Please add your hobbies, skills or interests that you are interested in learning more or helping others with.
        </h2>
      </div>
    </div>

    <br>

    <div class="row text-center">
      <button @click="onAddAreaOfInterest" class="btn btn-success">Add Interest</button>
    </div>

    <br>

    <div class="row">
      <div class="col-xs-6 text-right">
        <div class="areasOfInterestList">
          <div id="areaOfInterestValue" v-for="(areaOfInterest, index) in areasOfInterest" :key="areaOfInterest.areaOfInterestID" :class="{invalid: $v.areasOfInterest.$each[index].value.$error}">
            <label :for="areaOfInterest.areaOfInterestID">
              <h4>Area of Interest
                <b> {{index}}: </b>
              </h4>
            </label>
            <input type="text" @blur="$v.areasOfInterest.$each[index].value.$touch" :id="areaOfInterest.areaOfInterestID" v-model="areaOfInterest.value" name="areaOfInterestValue">
            <br>
            <p v-if="!$v.areasOfInterest.$each[index].value.required && $v.areasOfInterest.$each[index].value.$dirty" class="errorMessage"> You must enter an area of interest. </p>
            <p v-if="!$v.areasOfInterest.$each[index].value.alphaAndWhitespace && $v.areasOfInterest.$each[index].value.$dirty" class="errorMessage"> Areas of interest can only alphabet characters. </p>
          </div>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="areasOfInterestList">
          <div id="yearsOfExperience" v-for="(areaOfInterest, index) in areasOfInterest" :key="areaOfInterest.areaOfInterestID" :class="{invalid: $v.areasOfInterest.$each[index].years.$error}">
            <label>
              <h4>Years of experience</h4>
            </label>
            <input type="number" min="0" oninput="validity.valid||(value='')" @blur="$v.areasOfInterest.$each[index].years.$touch" :id="areaOfInterest.areaOfInterestID" v-model="areaOfInterest.years" name="yearsOfExperience">
            <button @click="onDeleteAreaOfInterest(areaOfInterest.areaOfInterestID)" class="btn-danger btn btn-sm">X</button>
            <br>
            <p v-if="!$v.areasOfInterest.$each[index].years.required && $v.areasOfInterest.$each[index].years.$dirty" class="errorMessage"> Please enter years of experience in this area. </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row text-center">
      <p v-if="!$v.areasOfInterest.required" class="errorMessage"> Please add at least one area of interest. </p>
    </div>

    <br>

    <div class="row text-center">
      <button class="btn btn-lg btn-primary" :disabled="$v.areasOfInterest.$invalid" @click="onSubmit"> Submit </button>
    </div>

  </div>
</template>

<script>
  import {
    required
  } from 'vuelidate/lib/validators'

  import axios from 'axios'

  // TODO Write test code for the regexForAlphabeticAndWhiteSpace validator.

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
        areasOfInterestCount: 0,
        areasOfInterest: [],
        currentUser: this.$store.state.user.authUser
      }
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
            required
          }
        }
      }
    },
    methods: {
      onSubmit() {
        const updateInfo = {
          areasOfInterest: this.areasOfInterest,
          _id: this.currentUser._id
        }
        console.log(updateInfo.areasOfInterest)
        this.$store
          .dispatch('updateAreasOfInterest', {
            updateInfo
          })
          .then(() => {
            this.$router.push('/success')
          })
          .catch(e => {
            console.log('Could not update areas of interest.')
            this.errorMessage = e.message
          })
      },
      onAddAreaOfInterest() {
        const newHobby = {
          value: '',
          years: '',
          areaOfInterestID: ''
        }
        this.areasOfInterestCount++
        this.areasOfInterest.push(newHobby)
        this.areasOfInterest[this.areasOfInterest.length - 1].areaOfInterestID = this.areasOfInterestCount
      },
      onDeleteAreaOfInterest(id) {
        this.areasOfInterest = this.areasOfInterest.filter(areaOfInterest => areaOfInterest.areaOfInterestID !== id)
      }
    },
    created() {
      const userID = this.$store.state.user.authUser._id
      const apiUrl = 'http://localhost:4000/get/areas-of-interest/'
      var self = this
      axios.get(apiUrl + userID).then(function (response) {
        self.areasOfInterest = response.data.areasOfInterest
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
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .errorMessage {
    color: red;
  }

  #yearsOfExperience input {
    width: 10%;
  }

  #areasOfInterestValue input {
    width: 10%;
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

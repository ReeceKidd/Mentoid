<template>
  <div class="container-fluid">
    <!-- If user has already completed areas of interest registration they will get redirected to their profile -->
    <div class="signup-form">
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4">
          <form @submit.prevent="onSubmit()">
            <p class="error" v-if="errorMessage !== ''">{{errorMessage}}</p>
            <div class="input" :class="{invalid: $v.firstName.$error}">
              <label for="firstName">Your First Name*</label>
              <input id="firstName" @blur="$v.firstName.$touch()" v-model.trim="firstName" name="firstName">
              <p class="errorMessage" v-if="!$v.firstName.minLength && $v.firstName.$dirty">Your first name must be two or more characters</p>
              <p class="errorMessage" v-if="!$v.firstName.required && $v.firstName.$dirty">First name field is required</p>
              <p class="errorMessage" v-if="!$v.firstName.alpha && $v.firstName.$dirty">First name can only contain alphabetical characters</p>
            </div>
            <div class="input" :class="{invalid: $v.lastName.$error}">
              <label for="lastName">Your Last Name*</label>
              <input id="lastName" @blur="$v.lastName.$touch()" v-model.trim="lastName" name="lastName">
              <p class="errorMessage" v-if="!$v.lastName.minLength && $v.lastName.$dirty">Your last name must be two or more characters</p>
              <p class="errorMessage" v-if="!$v.lastName.required && $v.lastName.$dirty">Last name field is required</p>
              <p class="errorMessage" v-if="!$v.lastName.alpha && $v.lastName.$dirty">Last name can only contain alphabetical characters</p>
            </div>

            <!-- The below username and email validation have an additional '@focus' added to them this is essential
          as it resets the dirty value which prevents error messages as the user retypes their choosen email or
          username after entering a username or email that was already taken.  -->

            <div class="input" :class="{invalid: $v.userName.$error}">
              <label for="userName">Your Username*</label>
              <input id="userName" @focus="$v.userName.$reset" @blur="$v.userName.$touch()" v-model.trim="userName" name="userName">
              <p class="errorMessage" v-if="!$v.userName.required && $v.userName.$dirty">Username is required.</p>
              <p class="errorMessage" v-if="!$v.userName.unique && $v.userName.$dirty">Username already exists in database</p>
              <p class="errorMessage" v-if="!$v.userName.alphaNum && $v.userName.$dirty">Username must only contain alphabetical characters and numbers</p>
            </div>
            <div class="input" :class="{invalid: $v.email.$error}">
              <label for="email">Email*</label>
              <input type="email" id="email" @focus="$v.email.$reset" @blur="$v.email.$touch()" v-model.trim="email" name="email">
              <p class="errorMessage" v-if="!$v.email.email && $v.email.$dirty">Please provide a valid email address.</p>
              <p class="errorMessage" v-if="!$v.email.unique && $v.email.$dirty">Email already exists in database</p>
              <p class="errorMessage" v-if="!$v.email.required && $v.email.$dirty">Email is required.</p>
            </div>
            <div class="input" :class="{invalid: $v.age.$error}">
              <label for="age">Your Age*</label>
              <input type="number" id="age" v-model.number="age" name="age" @focus="$v.age.$reset" @blur="$v.age.$touch()" v-model.trim="age">
              <p class="errorMessage" v-if="!$v.age.required && $v.age.$dirty">Age is required.</p>
              <p class="errorMessage" v-if="!$v.age.minValue && $v.age.$dirty">You must be 16 years and older to use Mentoid.</p>
              <p class="errorMessage" v-if="!$v.age.maxValue && $v.age.$dirty">You must be younge than 120 to use Mentoid.</p>
            </div>
            <div class="input" :class="{invalid: $v.password.$error}">
              <label for="password">Password*</label>
              <input type="password" id="password" @blur="$v.password.$touch()" v-model="password" name="password">
            </div>
            <div class="input" :class="{invalid: $v.confirmPassword.$error}">
              <label for="confirm-password">Confirmation Password*</label>
              <input type="password" id="confirm-password" @blur="$v.confirmPassword.$touch()" v-model="confirmPassword" name="confirmPassword">
            </div>
            <div class="input" name="language">
              <label for="language">Language*</label>
              <select id="language" v-model="language">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
            <div class="input inline" :class="{invalid: $v.terms.$invalid}">
              <input type="checkbox" id="terms" @change="$v.terms.$touch()" v-model="terms" name="terms">
              <label for="terms">Accept Terms of Use*</label>
            </div>
            <div class="submit text-center">
              <button type="submit" class="btn btn-lg btn-primary" :disabled="$v.$invalid">Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row visible-xs">
        <div class="col-xs-10 col-xs-offset-1">
          <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
        </div>
      </div>
  </div>
</template>

<script>
  import {
    required,
    email,
    minLength,
    sameAs,
    alpha,
    alphaNum,
    minValue,
    maxValue
  } from 'vuelidate/lib/validators'

  import axios from 'axios'

  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
        areasOfInterest: [],
        language: '',
        terms: false,
        errorMessage: null,
        currentUser: '',
        basicRegistrationComplete: null
      }
    },
    validations: {
      firstName: {
        required,
        minLength: minLength(2),
        alpha
      },
      lastName: {
        required,
        minLength: minLength(2),
        alpha
      },
      email: {
        required,
        email,
        unique: val => {
          if (val === '') return true
          let uri = 'http://localhost:4000/check/email/'
          return axios.get(uri + val)
          .then(res => {
            return res.status === 200
          }).catch(error => {
            console.log('error', Object.assign({}, error).response.data.message)
          })
        }
      },
      terms: {
        required
      },
      age: {
        required,
        minValue: minValue(16),
        maxValue: maxValue(120)
      },
      userName: {
        required,
        alphaNum,
        unique: val => {
          if (val === '') return true
          let uri = 'http://localhost:4000/check/username/'
          return axios.get(uri + val).then(res => {
            return res.status === 200
          }).catch(error => {
            console.log('error', Object.assign({}, error).response.data.message)
          })
        }
      },
      password: {
        required,
        minLen: minLength(8)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      }
    },
    methods: {
      onSubmit() {
        this.errorMessage = null
        const userData = {
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
          age: this.age.toString(),
          password: this.password,
          confirmPassword: this.confirmPassword,
          language: this.language,
          terms: this.terms.toString()
        }
        this.$store
          .dispatch('register', {
            userData
          })
          .then(() => {
            this.$router.push('/register-areas-of-interest')
          })
          .catch(e => {
            console.log(e)
            this.errorMessage = e.message
          })
      },
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    beforeMount() {
      var self = this
      // If auth user ._id is equal to null it means it is their first time registering
      try {
        if (this.$store.state.user.authUser._id !== null) {
          const userID = this.$store.state.user.authUser._id
          // Checks if the areas of interest registration has already been complete
          const getBasicRegistrationCompleteValue = 'http://localhost:4000/get/basic-registration-complete/'
          axios.get(getBasicRegistrationCompleteValue + userID).then(function (response) {
            self.basicRegistrationComplete = response.data.basicRegistrationComplete
          })
        }
      } catch (exception) {
        console.log('Cannot read user ID value becuase of first time registration')
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

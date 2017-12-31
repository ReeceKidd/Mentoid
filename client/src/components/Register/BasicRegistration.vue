<template>
  <div class="container">
    <div id="signup">
      <div class="signup-form">
        <form @submit.prevent="onSubmit()">
          <p class="error" v-if="errorMessage">{{errorMessage}}</p>
          <div class="input" :class="{invalid: $v.firstName.$error}">
            <label for="firstName">Your First Name*</label>
            <input id="firstName" v-model.trim="firstName">
            <p class="errorMessage" v-if="!$v.firstName.minLength">Your first name must be two or more characters</p>
          </div>
          <div class="input" :class="{invalid: $v.lastName.$error}">
            <label for="lastName">Your Last Name*</label>
            <input id="lastName" v-model.trim="lastName">
            <p class="errorMessage" v-if="!$v.lastName.minLength">Your last name must be two or more characters</p>
          </div>
          <div class="input" :class="{invalid: $v.userName.$error}">
            <label for="userName">Your Username*</label>
            <input id="userName" @input="debounceInput()"  @blur="$v.userName.$touch()" v-model.trim="userName">
            <p class="errorMessage" v-if="!$v.userName.required && $v.userName.$dirty">Username is required.</p>
            <p class="errorMessage" v-if="!$v.userName.unique && $v.userName.$dirty">Username already exists in database</p>
          </div>
          <div class="input" :class="{invalid: $v.email.$error}">
            <label for="email">Email*</label>
            <input type="email" id="email" @input="debounceInput()"  @blur="$v.email.$touch()" v-model.trim="email">
            <p class="errorMessage" v-if="!$v.email.email && $v.email.$dirty">Please provide a valid email address.</p>
            <p class="errorMessage" v-if="!$v.email.unique && $v.email.$dirty">Email already exists in database</p>
            <p class="errorMessage" v-if="!$v.email.required && $v.email.$dirty">Email is required.</p>
          </div>
          <div class="input">
            <label for="age">Your Age*</label>
            <input type="number" id="age" v-model.number="age">
          </div>
          <div class="input" :class="{invalid: $v.password.$error}">
            <label for="password">Password*</label>
            <input type="password" id="password" @blur="$v.password.$touch()" v-model="password">
          </div>
          <div class="input" :class="{invalid: $v.confirmPassword.$error}">
            <label for="confirm-password">Confirmation Password*</label>
            <input type="password" id="confirm-password" @blur="$v.confirmPassword.$touch()" v-model="confirmPassword">
          </div>
          <div class="input">
            <label for="country">Country*</label>
            <select id="country" v-model="country">
              <option value="usa">USA</option>
              <option value="india">India</option>
              <option value="uk">UK</option>
              <option value="germany">Germany</option>
            </select>
          </div>
          <div class="input inline" :class="{invalid: $v.terms.$invalid}">
            <input type="checkbox" id="terms" @change="$v.terms.$touch()" v-model="terms">
            <label for="terms">Accept Terms of Use*</label>
          </div>
          <div class="submit text-center">
            <button type="submit" class="btn btn-lg btn-primary" :disabled="$v.$invalid">Next</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    required,
    email,
    minLength,
    sameAs
  } from 'vuelidate/lib/validators'

  import axios from 'axios'
  import lodash from 'lodash'

  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'usa',
        terms: false,
        errorMessage: null,
        currentUser: ''
      }
    },
    validations: {
      firstName: {
        required,
        minLength: minLength(2)
      },
      lastName: {
        required,
        minLength: minLength(2)
      },
      email: {
        required,
        email,
        unique: val => {
          if (val === '') return true
          let uri = 'http://localhost:4000/check/email/'
          return axios.get(uri + val).then(res => {
            return res.data === 'Email is available'
          })
        }
      },
      terms: {
        required
      },
      userName: {
        required,
        unique: val => {
          if (val === '') return true
          let uri = 'http://localhost:4000/check/username/'
          return axios.get(uri + val).then(res => {
            return res.data === 'Username is available'
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
          age: this.age,
          password: this.password,
          country: this.country,
          terms: this.terms,
          basicRegistrationComplete: true,
          areasOfInterestRegistrationComplete: false,
          userRegistrationComplete: false
        }
        console.log(userData)
        this.$store
          .dispatch('register', {
            userData
          })
          .then(() => {
            this.$router.push('/register-areas-of-interest')
          })
          .catch(e => {
            console.log('Could not complete basic registration')
            this.errorMessage = e.message
          })
      },
      debounceInput: lodash.debounce(function (e) {
        this.filterKey = e.target.value
      }, 500)
    }
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
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

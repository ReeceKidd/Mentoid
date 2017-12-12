<template>
    <div class="container">
      <!-- The transistion variable is the stage of registration, this is a two part registration -->

      <div id="signup" v-if="transistion == false">

        <div class="signup-form">
          <form @submit.prevent="areasOfInterest()">
            <p class="error" v-if="errorMessage">{{errorMessage}}</p>
            <div class="input">
              <label for="userName">Your Username</label>
              <input id="userName" v-model.trim="userName" @input="delayTouch($v.userName)">
              <p class="errorMessage" v-if="!$v.userName.unique">Username is taken</p>
            </div>
            <div class="input" :class="{invalid: $v.email.$error}">
              <label for="email">Email</label>
              <input type="email" id="email" @blur="$v.email.$touch()" v-model.trim="email" @input="delayTouch($v.email)">
              <p class="errorMessage" v-if="!$v.email.email">Please provide a valid email address.</p>
              <p class="errorMessage" v-if="!$v.email.unique">Email already exists in database</p>
            </div>
            <div class="input">
              <label for="age">Your Age</label>
              <input type="number" id="age" v-model.number="age">
            </div>
            <div class="input" :class="{invalid: $v.password.$error}">
              <label for="password">Password</label>
              <input type="password" id="password" @blur="$v.password.$touch()" v-model="password">
            </div>
            <div class="input" :class="{invalid: $v.confirmPassword.$error}">
              <label for="confirm-password">Confirmation Password</label>
              <input type="password" id="confirm-password" @blur="$v.confirmPassword.$touch()" v-model="confirmPassword">
            </div>
            <div class="input">
              <label for="country">Country</label>
              <select id="country" v-model="country">
                <option value="usa">USA</option>
                <option value="india">India</option>
                <option value="uk">UK</option>
                <option value="germany">Germany</option>
              </select>
            </div>
            <div class="input inline" :class="{invalid: $v.terms.$invalid}">
              <input type="checkbox" id="terms" @change="$v.terms.$touch()" v-model="terms">
              <label for="terms">Accept Terms of Use</label>
            </div>
            <div class="submit">
              <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Next</button>
            </div>
          </form>
        </div>
      </div>

      <!-- The areas of interest section is only shown after the above registration form is completed -->
      <div id="areasOfInterest" v-else>
        <div class="row">
          <div class="col-xs-8 col-xs-offset-2">
            <h2 class="text-center">
              Please add your hobbies, skills or interests that you are interested in learning more or helping others with.
            </h2>
          </div>
        </div>
        <br>
        <div class="row text-center">
          <button @click="onAddHobby" class="btn btn-primary btn-xl">Add Interest</button>
        </div>
        <br>
        <div class="row">
          <div class="col-xs-2">
            <br>
          </div>
          <div class="col-xs-4">
            <div class="hobby-list">
              <div id="areaOfInterestInput" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
                <label :for="hobbyInput.id">
                  <h4>Area of Interest #{{ index }}</h4>
                </label>
                <input type="text" :id="hobbyInput.id" v-model="hobbyInput.value">
              </div>
            </div>
          </div>
          <div class="col-xs-6">
            <div class="hobby-list">
              <div id="yearsOfExperience" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
                <label>
                  <h4>Years of experience</h4>
                </label>
                <input type="number" :id="hobbyInput.id" v-model="hobbyInput.years">
                <button @click="onDeleteHobby(hobbyInput.id)" class="btn-danger btn btn-sm">X</button>
              </div>
            </div>
          </div>
        </div>

        <br>
        <div class="row">
          <div class="col-xs-12 text-center">
            <div>
              <button class="btn btn-primary btn-lg" @click="onSubmit()">Submit</button>
            </div>
          </div>
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

  const touchMap = new WeakMap()

  export default {
    data() {
      return {
        userName: '',
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'usa',
        terms: false,
        errorMessage: null,
        hobbyInputs: [],
        currentUser: '',
        transistion: false,
        hobbyCount: 0
      }
    },
    validations: {
      email: {
        required,
        email,
        unique: val => {
          if (val === '') return true
          let uri = 'http://localhost:4000/users/check/email/'
          return axios.get(uri + val)
        }
      },
      terms: {
        required
      },
      userName: {
        required,
        unique: val => {
          if (val === '') return true
          let uri = 'http://localhost:4000/users/check/username/'
          return axios.get(uri + val)
        }
      },
      hobbyInputs: {
        minLength: minLength(1),
        $each: {
          value: {
            required
          }
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
      areasOfInterest() {
        this.transistion = true
      },
      onSubmit() {
        this.errorMessage = null

        const userData = {
          userName: this.userName,
          email: this.email,
          age: this.age,
          password: this.password,
          country: this.country,
          terms: this.terms,
          hobbyInputs: this.hobbyInputs
        }
        console.log(userData)
        this.$store
          .dispatch('register', {
            userData
          })
          .then(() => {
            this.$router.push('/success')
          })
          .catch(e => {
            this.errorMessage = e.message
          })
      },
      delayTouch($v) {
        $v.$reset()
        if (touchMap.has($v)) {
          clearTimeout(touchMap.get($v))
        }
        touchMap.set($v, setTimeout($v.$touch, 2000))
      },
      onAddHobby() {
        const newHobby = {
          id: this.hobbyCount,
          value: '',
          years: ''
        }
        this.hobbyCount++
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby(id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      }
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

  #yearsOfExperience input {
    width: 10%;
  }

  #areaOfInterestInput input {
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

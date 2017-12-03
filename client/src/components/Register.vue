<template>
<div class="container">
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.fullName.$error}">
          <label for="fullName">Your Full Name*</label>
          <input id="fullName" @blur="$v.fullName.$touch()" v-model="fullName">
          <p v-if="!$v.fullName.required">This field must not be empty.</p>
        </div>
        <div class="input" :class="{invalid: $v.userName.$error}">
          <label for="userName">Your Username*</label>
          <input id="userName" @blur="$v.userName.$touch()" v-model="userName">
          <p v-if="!$v.userName.unique">Username is taken</p>
        </div>
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Email*</label>
          <input type="email" id="email" @blur="$v.email.$touch()" v-model="email">
          <p v-if="!$v.email.email">Please provide a valid email address.</p>
          <p v-if="!$v.email.unique">Email is already registered please login instead</p>
        </div>
        <div class="input">
          <label for="age">Your Age</label>
          <input type="number" id="age" v-model.number="age">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password">
        </div>
        <div class="input">
          <label for="confirmationPassword">Confirm Password</label>
          <input type="password" id="confirmationPassword" v-model="confirmationPassword">
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
          <button class="btn btn-primary" :disabled="$v.$invalid">Submit</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data() {
    return {
      fullName: '',
      userName: '',
      email: '',
      age: null,
      password: '',
      confirmationPassword: '',
      country: 'uk',
      terms: false
    }
  },
  validations: {
    fullName: {
      required
    },
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
    }
  },
  methods: {
    onSubmit() {
      const userData = {
        fullName: this.fullName,
        userName: this.userName,
        email: this.email,
        age: this.age,
        password: this.password,
        confirmationPassword: this.confirmationPassword,
        country: this.country,
        terms: this.terms
      }
      this.$store
        .dispatch('register', { userData })
        .then(() => {
          this.$router.push('/success')
        })
        .catch(e => {
          this.message = e.response.data.message
            ? e.response.data.message
            : 'There was an error'
        })
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

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #104E8B;
  background-color: #eee;
}

.input.invalid label {
  color: red;
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

<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Email</label>
          <input
                  type="email"
                  id="email"
                  @blur="$v.email.$touch()"
                  v-model="email">
          <p v-if="!$v.email.email">Please provide a valid email address.</p>
        </div>
        <div class="input" :class="{invalid: $v.confirmationEmail.$error}">
          <label for="confirmationEmail"> Confirm Email</label>
          <input
                  type="email"
                  id="confirmEmail"
                  @blur="$v.confirmationEmail.$touch()"
                  v-model="confirmationEmail">
        <p v-if="!$v.confirmationEmail.email">Please provide a valid email address.</p>
        <p v-if="!$v.confirmationEmail.sameAs">Emails must match</p>
        </div>
        <div class="input">
          <label for="age">Your Age</label>
          <input
                  type="number"
                  id="age"
                  v-model.number="age">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="input">
          <label for="confirmationPassword">Confirm Password</label>
          <input
                  type="password"
                  id="confirmationPassword"
                  v-model="confirmationPassword">
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
          <input 
              type="checkbox" 
              id="terms" 
              @change="$v.terms.$touch()"
              v-model="terms">
          <label for="terms">Accept Terms of Use</label>
        </div>
        <div class="submit">
          <button type="submit" :disabled="$v.$invalid">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, sameAs } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        userName: '',
        email: '',
        confirmationEmail: '',
        age: null,
        password: '',
        confirmationPassword: '',
        country: 'usa',
        terms: false
      }
    },
    validations: {
      email: {
        required,
        email
      },
      confirmationEmail: {
        required,
        email,
        sameAs: sameAs('email')
      },
      terms: {
        required
      }
    },
    methods: {
      onSubmit () {
        const userData = {
          email: this.email,
          confirmationEmail: this.confirmationEmail,
          age: this.age,
          password: this.password,
          confirmationPassword: this.confirmationPassword,
          country: this.country,
          terms: this.terms
        }
        console.log(userData)
        let uri = 'http://localhost:4000/users/add'
        this.axios.post(uri, userData).then((response) => {
          console.log(userData + ' Posted to server')
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
    border: 1px solid #521751;
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

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
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
<template>
  <a v-if="editName === false">
    <h3 @click="editName = true"> {{firstName }} {{ lastName }}
      <i class="far fa-edit"></i>
    </h3>
  </a>
  <span v-else>
    <br>
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
    <br>
    <div class="text-center">
      <button class="btn btn-md btn-primary" @click="onSubmit()" :disabled="$v.$invalid">Update Name</button>
    </div>

    <br>
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

  </span>
  <!--End of edit name -->
</template>

<script>
  import axios from 'axios'
  import {
    required,
    minLength,
    alpha
  } from 'vuelidate/lib/validators'
  export default {
    data() {
      return {
        currentUser: this.$store.state.user.authUser,
        firstName: 'Undefined',
        lastName: 'Undefined',
        editName: false,
        errorMessage: null,
        successMessage: null
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
      }
    },
    methods: {
      onSubmit() {
        var that = this
        const url = 'http://localhost:4000/update/name/'
        axios.post(url, {
          firstName: this.firstName,
          lastName: this.lastName,
          userID: this.currentUser._id
        }).then(function (response) {
          that.successMessage = 'Updated first and last name.'
          setTimeout(() => {
            that.successMessage = null
            that.editName = false
          }, 2000)
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
      const getBasicRegistration = 'http://localhost:4000/get/basic-registration/'
      axios.get(getBasicRegistration + userID).then(function (response) {
        self.firstName = response.data.userInfo.firstName
        self.lastName = response.data.userInfo.lastName
      })
    }
  }
</script>

<style>
  .errorMessage {
    color: red;
  }

  .successMessage {
      color: green;
  }

</style>

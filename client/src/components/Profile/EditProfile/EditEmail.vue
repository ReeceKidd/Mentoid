<template>
  <a v-if="editEmail === false">
    <h4 @click="editEmail = true, oldEmail = email, newEmail = email">
      <i class="fas fa-envelope"></i> {{ email }}
      <i class="far fa-edit"></i>
    </h4>
  </a>
  <span v-else>
    <br>
    <div class="input" :class="{invalid: $v.newEmail.$error}">
      <label for="email">Email*</label>
      <input type="email" id="newEmail" @focus="$v.newEmail.$reset" @blur="$v.newEmail.$touch()" v-model.trim="newEmail" name="newEmail">
      <p class="errorMessage" v-if="!$v.newEmail.email && $v.newEmail.$dirty">Please provide a valid email address.</p>
      <p class="errorMessage" v-if="!$v.newEmail.required && $v.newEmail.$dirty">Email is required.</p>
    </div>
    <br>
    <div class="text-center">
      <button class="btn btn-md btn-primary" @click="onSubmit()" :disabled="$v.$invalid">Update Email</button>
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
    email
  } from 'vuelidate/lib/validators'
  export default {
    data() {
      return {
        currentUser: this.$store.state.user.authUser,
        editEmail: false,
        email: null,
        oldEmail: null,
        newEmail: null,
        errorMessage: null,
        successMessage: null
      }
    },
    validations: {
      newEmail: {
        required,
        email
      }
    },
    methods: {
      onSubmit() {
        var that = this
        const url = 'http://localhost:4000/update/email/'
        axios.post(url, {
          newEmail: this.newEmail,
          oldEmail: this.oldEmail,
          userID: this.currentUser._id
        }).then(function (response) {
          that.successMessage = 'Updated email.'
          setTimeout(() => {
            that.successMessage = null
            that.editEmail = false
            that.email = that.newEmail
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
        self.email = response.data.userInfo.email
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

<template>
  <a v-if="editUsername === false">
    <h4 @click="editUsername = true"> @{{ userName }}
      <i class="far fa-edit smallFA"></i>
    </h4>
  </a>
  <span v-else>
    <br>
    <div class="input" :class="{invalid: $v.userName.$error}">
      <label for="userName">Your Username*</label>
      <input id="userName" @focus="$v.userName.$reset" @blur="$v.userName.$touch()" v-model.trim="userName" name="userName">
      <p class="errorMessage" v-if="!$v.userName.required && $v.userName.$dirty">Username is required.</p>
      <p class="errorMessage" v-if="!$v.userName.alphaNum && $v.userName.$dirty">Username must only contain alphabetical characters and numbers</p>
    </div>
    <br>
    <div class="text-center">
      <button class="btn btn-md btn-primary" @click="onSubmit()" :disabled="$v.$invalid">Update User Name</button>
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
    alphaNum
  } from 'vuelidate/lib/validators'
  export default {
    data() {
      return {
        currentUser: this.$store.state.user.authUser,
        userName: this.$store.state.user.authUser.userName,
        editUsername: false,
        errorMessage: null,
        successMessage: null
      }
    },
    validations: {
      userName: {
        required,
        alphaNum
      }
    },
    methods: {
      onSubmit() {
        var that = this
        const url = 'http://localhost:4000/update/username/'
        axios.post(url, {
          newUserName: this.userName,
          oldUserName: this.$store.state.user.authUser.userName,
          userID: this.currentUser._id
        }).then(function (response) {
          that.successMessage = 'Updated username.'
          setTimeout(() => {
            that.successMessage = null
            that.editUsername = false
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
        self.userName = response.data.userInfo.userName
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

  .smallFA {
      font-size: 12px;
  }

</style>

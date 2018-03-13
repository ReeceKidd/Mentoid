<template>
  <div>
    <form @submit.prevent="onSubmit()">
      <p class="error" v-if="errorMessage !== ''">{{errorMessage}}</p>
      <div class="input" :class="{invalid: $v.facebook.$error}">
        <label for="facebook">
          <i class="fab fa-facebook-f"></i>: Facebook</label>
        <input id="facebook" @blur="$v.facebook.$touch()" v-model.trim="facebook" name="facebook">
        <p class="errorMessage" v-if="!$v.facebook.minLength && $v.facebook.$dirty">Please enter a valid Facebook URL</p>
      </div>
      <div class="input" :class="{invalid: $v.instagram.$error}">
        <label for="instagram">
          <i class="fab fa-instagram"></i>: Instagram</label>
        <input id="instagram" @blur="$v.instagram.$touch()" v-model.trim="instagram" name="instagram">
        <p class="errorMessage" v-if="!$v.instagram.minLength && $v.instagram.$dirty">Please enter a valid Instagram handle</p>
      </div>
      <div class="input" :class="{invalid: $v.twitter.$error}">
        <label for="twitter">
          <i class="fab fa-twitter"></i>: Twitter</label>
        <input id="twitter" @blur="$v.twitter.$touch()" v-model.trim="twitter" name="twitter">
        <p class="errorMessage" v-if="!$v.twitter.minLength && $v.twitter.$dirty">Please enter a valid Twitter handle.</p>
      </div>
      <div class="input" :class="{invalid: $v.snapchat.$error}">
        <label for="snapchat">
          <i class="fab fa-snapchat"></i>: Snapchat</label>
        <input id="snapchat" @focus="$v.snapchat.$reset" @blur="$v.snapchat.$touch()" v-model.trim="snapchat" name="snapchat">
        <p class="errorMessage" v-if="!$v.snapchat.minLength && $v.snapchat.$dirty">Please enter a valid Snapchat name.</p>
      </div>
      <div class="input" :class="{invalid: $v.linkedIn.$error}">
        <label for="linkedIn">
          <i class="fab fa-linkedin-in"></i>: LinkedIn</label>
        <input type="linkedIn" id="linkedIn" @focus="$v.linkedIn.$reset" @blur="$v.linkedIn.$touch()" v-model.trim="linkedIn" name="linkedIn">
        <p class="errorMessage" v-if="!$v.linkedIn.minLength && $v.linkedIn.$dirty">Please enter a valid LinkedIn URL.</p>
      </div>
      <div class="input" :class="{invalid: $v.medium.$error}">
        <label for="medium">
          <i class="fab fa-medium"></i>: Medium</label>
        <input type="medium" id="medium" @focus="$v.medium.$reset" @blur="$v.medium.$touch()" v-model.trim="medium" name="medium">
        <p class="errorMessage" v-if="!$v.medium.minLength && $v.medium.$dirty">Please enter a valid Medium URL.</p>
      </div>
      <div class="input" :class="{invalid: $v.youtube.$error}">
        <label for="youtube">
          <i class="fab fa-youtube"></i>: Youtube</label>
        <input type="youtube" id="youtube" @focus="$v.youtube.$reset" @blur="$v.medium.$touch()" v-model.trim="youtube" name="youtube">
        <p class="errorMessage" v-if="!$v.youtube.minLength && $v.youtube.$dirty">Please enter a valid Youtube URL.</p>
      </div>
      <div class="input" :class="{invalid: $v.website.$error}">
        <label for="website">
          <i class="fas fa-globe"></i>: Personal Website </label>
        <input type="website" id="website" @focus="$v.website.$reset" @blur="$v.website.$touch()" v-model.trim="website" name="website">
        <p class="errorMessage" v-if="!$v.website.minLength && $v.website.$dirty">Please provide a valid Personal Website URL.</p>
      </div>
      <br>
      <div class="submit text-center hidden-xs">
        <button type="submit" class="btn btn-lg btn-primary" :disabled="$v.$invalid">Update Social Details</button>
      </div>
      <div class="submit text-center visible-xs">
        <button type="submit" class="btn btn-md btn-primary" :disabled="$v.$invalid">Update Social Details</button>
      </div>
    </form>
      <br>
      <div class="row">
        <p class="errorMessage" v-if="errorMessage !== null">{{errorMessage}}</p>
      </div>
      <!-- Update social media success Message -->
      <div class="text-center">
        <p class="successMessage" v-if="successMessage !== null">{{successMessage}}</p>
      </div>

      <!-- End of success message -->
  </div>
</template>

<script>
  import {
    minLength
  } from 'vuelidate/lib/validators'

  import axios from 'axios'

  export default {
    data() {
      return {
        currentUserID: this.$store.state.user.authUser._id,
        userName: null,
        facebook: undefined,
        instagram: undefined,
        twitter: undefined,
        medium: undefined,
        youtube: undefined,
        snapchat: undefined,
        linkedIn: undefined,
        website: undefined,
        errorMessage: null,
        successMessage: null
      }
    },
    validations: {
      facebook: {
        minLength: minLength(2)
      },
      instagram: {
        minLength: minLength(2)
      },
      twitter: {
        minLength: minLength(2)
      },
      medium: {
        minLength: minLength(2)
      },
      snapchat: {
        minLength: minLength(2)
      },
      linkedIn: {
        minLength: minLength(2)
      },
      youtube: {
        minLength: minLength(2)
      },
      website: {
        minLength: minLength(2)
      }
    },
    methods: {
      onSubmit() {
        const url = 'http://localhost:4000/update/social-media/'
        axios.post(url, {
          userName: this.userName,
          userID: this.currentUserID,
          facebook: this.facebook,
          instagram: this.instagram,
          twitter: this.twitter,
          linkedIn: this.linkedIn,
          snapchat: this.snapchat,
          medium: this.medium,
          youtube: this.youtube,
          website: this.website
        }).then(response => {
          this.successMessage = response.data.message
          setTimeout(() => {
            this.successMessage = null
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
      }
    },
    beforeMount() {
      var self = this
      var userID = this.currentUserID
      // Get username.
      const getUserNameURL = 'http://localhost:4000/get/user-name/'
      axios.get(getUserNameURL + userID).then(function (response) {
        self.userName = response.data.userName
      })
      // Get users social media details
      const getSocialMedia = 'http://localhost:4000/get/social-media/'
      axios.get(getSocialMedia + userID).then(function (response) {
        self.facebook = response.data.facebook
        self.twitter = response.data.twitter
        self.instagram = response.data.instagram
        self.linkedIn = response.data.linkedIn
        self.snapchat = response.data.snapchat
        self.youtube = response.data.youtube
        self.medium = response.data.medium
        self.website = response.data.website
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

  .successMessage {
    color: green;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #104E8B;
    background-color: #fff;
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

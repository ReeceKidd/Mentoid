<template>
  <div class="containter-fluid">
    <!-- If user is logged in they should get redirected to their profile instead -->
    <span v-if="isUserLoggedIn"> {{ navigateTo('/profile/edit-profile')}} </span>
    <div class="row">
      <br>
      <div class="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4 displayBox">
        <br>
        <img src="..\assets\login-logo.png" class="img-responsive center-block">
        <form @submit.prevent="onSubmit">
          <div class="input">
            <label for="email"><i class="fas fa-envelope"></i> Email</label>
            <input type="email" id="email" v-model="email">
          </div>
          <div class="input">
            <label for="password"><i class="fas fa-lock"></i> Password</label>
            <input type="password" id="password" v-model="password">
          </div>
          <p class="error" v-if="errorMessage">{{errorMessage}}</p>
          <div class="submit text-center">
            <button class="btn btn-primary text-center">Submit</button>
          </div>
        </form>
        <br>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: null,
        isUserLoggedIn: null
      }
    },
    methods: {
      onSubmit() {
        this.errorMessage = null
        this.$store
          .dispatch('login', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.email = ''
            this.password = ''
            this.$router.push('/success')
          })
          .catch(e => {
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
          const isUserLoggedInURL = 'http://localhost:4000/get/is-user-logged-in/'
          axios.get(isUserLoggedInURL + userID).then(function (response) {
            self.isUserLoggedIn = response.data.isUserLoggedIn
          })
        }
      } catch (exception) {
        console.log('User is not logged in so can access login page')
      }
    }
  }
</script>

<style scoped>
  .error {
    color: red;
  }

  .input.invalid label {
    color: red;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #104E8B;
    background-color: #fff;
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

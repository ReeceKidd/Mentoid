<template>
  <div class="container">
    <!-- Desktop Version -->
    <div class="row hidden-xs">
      <div class="col-xs-12 text-center">
        <h1>Would you like to be a Mentor</h1>
        <br>
      </div>
    </div>

    <div class="row hidden-xs">
      <div class="col-xs-12 text-center">
        <select class="wouldYouLikeToMentorSelector" v-model="wouldLikeToMentor" >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br>
        <br>
      </div>
    </div>

    <div class="row hidden-xs">
        <div v-if="wouldLikeToMentor === 'Yes'">

        <p> What areas of interest would you like to Mentor in? </p>
        <p> --Get a list of the areas of interest with a tickbox beside each. </p>
        <p> What formats of mentoring are you interested in?</p>
        <p> What languages can you mentor in?</p>
        <p> Are you willing to Mentor internationally?</p>
        <p> What is the maximum distance for in person meetings?</p>

        <p> --Mentee preferences --</p>
        <p> What education level would you prefer to mentor?</p>
        <p> What subject would you prefer </p>
        <p> Any specific fields you are interested in?</p>   
        <p> What age range are most interested in Mentoring? </p>
        <p> What jobs would you like your Mentee to have had or want </p>
        </div>
        
        
        
        
        
        <div v-if="wouldLikeToMentor === 'No'">
          <p> You do not need to be an expert to Mentor. You just need more experience than your potential Mentee.
            Being a Mentor is one of the fastest ways to improve your areas of interest. 
          </p>
          <h3 class="text-center"><u> 
            These people want a Mentor just like you. 
          </u></h3>
          <br>
          <div class="row text-center">
          <div class="col-xs-4">
            Person 1. 
          </div>
          <div class="col-xs-4">
            Person 2.
          </div>
          <div class="col-xs-4">
            Person 3.
          </div>
          </div>
          <br>
          <div class="col-xs-12 text-center">
            <button class="btn btn-danger"> SKIP </button>
          </div>
          
        </div>
      </div>
  </div>


    <!-- Mobile Version -->

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
        wouldLikeToMentor: 'Yes',
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
select.wouldYouLikeToMentorSelector {
  width: 20%;
  height: 50px;
  text-align: center;
  font-size: 200%;

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

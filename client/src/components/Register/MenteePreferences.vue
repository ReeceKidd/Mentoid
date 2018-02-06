<template>
  <div class="container">
    <!-- Desktop Version -->
    <div>
      <div class="col-xs-12 text-center">
        <h1>Would you like to be a Mentor</h1>
        <br>
      </div>
    </div>

    <div>
      <div class="col-xs-12 text-center">
        <select class="wouldYouLikeToMentorSelector" v-model="wouldYouLikeToHaveAMentor" >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br>
        <br>
      </div>
    </div>

    <div>
        <div v-if="wouldYouLikeToHaveAMentor === 'Yes'">

        <p> What areas of interest would you like to be Mentored in? </p>
        // List the areas of interest with checkboxes with all of them ticked by default with a select all option. 
        <p> What formats of mentoring are you interested in?</p>
        //Online 
        //In person
        //Maybe groups or maybe a hangout. 
        <p> What languages can you mentor in?</p>
        //English 
        //Spanish 
        //German
        <p> Are you willing to Mentor internationally?</p>
        //Yes 
        //No
        <p> What is the maximum distance for in person meetings?</p>
        Input box that accepts Kilometer values. 

        <p> --Mentee preferences --</p>
        <p> What education level would you prefer to mentor?</p>
        //No preference
        //High school
        //Vocational degree. 
        //Bachelors
        //Masters
        //PHD 
        -- This only appears if they are above no preferences. 
        <p> What field of study? </p>
        //Computing 
        //Business
        //Accountancy
        //Architecture. 
        <p> What age range are most interested in Mentoring? </p>
        // Min age. 
        // Max age. 
        <p> What field of work would you like your mentor to work in.  </p>
        // Enter a field of work that should use a regex prediction in order to show it. 
        </div>
        
        
        
        
        
        <div v-if="wouldYouLikeToHaveAMentor === 'No'">
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
        wouldYouLikeToHaveAMentor: 'Yes',
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

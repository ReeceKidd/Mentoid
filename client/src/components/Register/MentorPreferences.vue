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
        <select class="wouldYouLikeToMentorSelector" v-model="wouldLikeToMentor" >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br>
        <br>
      </div>
    </div>

    <div>
        <div v-if="wouldLikeToMentor === 'Yes'">

        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"> Check all </el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        //Can set the size of the checkbox as an option with a string and make it have a border as well. 
        //Need to get the users area of interest value names from this on create and load this check box up with ith. 
        <p> What formats of mentoring are you interested in?</p>
        //Online 
        //In person
        //Future will be groups. 
        <p> What languages can you mentor in?</p>
        //English 
        //Spanish 
        //German
        <p> Are you willing to Mentor internationally?</p>
        //Yes 
        //No
        <p> What is the maximum distance for in person meetings?</p>
        Input box that accepts Kilometer values. 

        // Matching you with the correct Mentor is important for us, where possibe we will try to match you on the following criteria. 
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
        checkAll: false, 
        cities: cityOptions, 
        isIndeterminate: true
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions: [],
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
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

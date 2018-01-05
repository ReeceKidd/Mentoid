<template>
  <div id="areasOfInterest">
    <div class="row">
      <div class="col-xs-12">
        <h1 class="text-center"> Hello {{ currentUser.userName }} </h1>

      </div>
      <div class="col-xs-8 col-xs-offset-2">
        <h2 class="text-center">
          Please add your hobbies, skills or interests that you are interested in learning more or helping others with.
        </h2>
      </div>
    </div>
    <br>
    <div class="row text-center">
      <button @click="onAddAreaOfInterest" class="btn btn-primary btn-xl">Add Interest</button>
    </div>
    <br>
    <div class="row">
      <div class="col-xs-2">
        <br>
      </div>
      <div class="col-xs-4">
        <div class="hobby-list">
          <div id="areaOfInterestInput" v-for="(areaOfInterest, index) in areasOfInterest" :key="areaOfInterest.areaOfInterestID">
            <label :for="areaOfInterest.areaOfInterestID">
            </label>
            <input type="text" :id="areaOfInterest.areaOfInterestID" v-model="areaOfInterest.value">
          </div>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="hobby-list">
          <div id="yearsOfExperience" v-for="(areaOfInterest, index) in areasOfInterest" :key="areaOfInterest.areaOfInterestID">
            <label>
              <h4>Years of experience</h4>
            </label>
            <input type="number" :id="areaOfInterest.areaOfInterestID" v-model="areaOfInterest.years">
            <button @click="onDeleteAreaOfInterest(areaOfInterest.areaOfInterestID)" class="btn-danger btn btn-sm">X</button>
          </div>
        </div>
      </div>
      <div class="row">
        <button @click="onSubmit"> Submit </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    required,
    minLength
  } from 'vuelidate/lib/validators'

  import axios from 'axios'

  export default {
    data() {
      return {
        areasOfInterestCount: 0,
        areasOfInterest: [{
          value: 'Yoga',
          years: 1,
          areaOfInterestID: 0
        }],
        currentUser: this.$store.state.user.authUser
      }
    },
    validations: {
      areasOfInterest: {
        minLength: minLength(1),
        $each: {
          value: {
            required
          }
        }
      }
    },
    methods: {
      onSubmit() {
        const updateInfo = {
          areasOfInterest: this.areasOfInterest,
          _id: this.currentUser._id
        }
        console.log(updateInfo.areasOfInterest)
        this.$store
          .dispatch('updateAreasOfInterest', {
            updateInfo
          })
          .then(() => {
            this.$router.push('/success')
          })
          .catch(e => {
            console.log('Could not update areas of interest.')
            this.errorMessage = e.message
          })
      },
      onAddAreaOfInterest() {
        const newHobby = {
          value: '',
          years: '',
          areaOfInterestID: ''
        }
        this.areasOfInterestCount++
        this.areasOfInterest.push(newHobby)
        this.areasOfInterest[this.areasOfInterest.length - 1].areaOfInterestID = this.areasOfInterestCount
      },
      onDeleteAreaOfInterest(id) {
        this.areasOfInterest = this.areasOfInterest.filter(hobby => hobby.id !== id)
      }
    },
    created() {
      const userID = this.$store.state.user.authUser._id
      const apiUrl = 'http://localhost:4000/get/areas-of-interest/'
      var self = this
      axios.get(apiUrl + userID).then(function (response) {
        self.areasOfInterest = response.data.areasOfInterest
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

  #yearsOfExperience input {
    width: 10%;
  }

  #areasOfInterest input {
    width: 50%;
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

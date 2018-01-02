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
      <button @click="onAddHobby" class="btn btn-primary btn-xl">Add Interest</button>
    </div>
    <br>
    <div class="row">
      <div class="col-xs-2">
        <br>
      </div>
      <div class="col-xs-4">
        <div class="hobby-list">
          <div id="areaOfInterestInput" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
            <label :for="hobbyInput.id">
              <h4>Area of Interest #{{ index }}</h4>
            </label>
            <input type="text" :id="hobbyInput.id" v-model="hobbyInput.value">
          </div>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="hobby-list">
          <div id="yearsOfExperience" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
            <label>
              <h4>Years of experience</h4>
            </label>
            <input type="number" :id="hobbyInput.id" v-model="hobbyInput.years">
            <button @click="onDeleteHobby(hobbyInput.id)" class="btn-danger btn btn-sm">X</button>
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
        hobbyInputs: [],
        currentUser: this.$store.state.user.authUser,
        hobbyCount: 0
      }
    },
    validations: {
      hobbyInputs: {
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
        const hobbyInputs = this.hobbyInputs
        const infoForUpdate = {
          areasOfInterest: hobbyInputs,
          id: this.currentUser.id
        }
        console.log(hobbyInputs)
        console.log('Information for update ' + infoForUpdate.areasOfInterest)
        let url = 'http://localhost:4000/update/areas-of-interest/'
        return axios.get(url + infoForUpdate).then(res => {
          console.log(res)
        }).then(() => {
          console.log('Redirect to different page')
          // this.$router.push('/success')
        }).catch(e => {
          this.errorMessage = e.message
        })
      },
      onAddHobby() {
        const newHobby = {
          id: this.hobbyCount,
          value: '',
          years: ''
        }
        this.hobbyCount++
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby(id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      }
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

  #areaOfInterestInput input {
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

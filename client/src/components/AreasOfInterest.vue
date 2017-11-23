<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">
          Please add your hobbies, skills or interests below.
        </h2>
      </div>
    </div>
    <div id="signup">
      <div class="signup-form">
        <form @submit.prevent="onSubmit">
          <div class="areasOfInterest">
            <button @click="onAddHobby" type="button">Add Hobby</button>
            <div class="hobby-list">
              <div class="input" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
                <label :for="hobbyInput.id">Hobby #{{ index }}</label>
                <input type="text" :id="hobbyInput.id" v-model="hobbyInput.value">
                <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
              </div>
            </div>
          </div>
          <br>
          <div class="submit">
            <button type="submit" :disabled="$v.$invalid">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    required,
    minLength
  } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        hobbyInputs: [],
        terms: false
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
      onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },
      onSubmit () {
        const formData = {
          hobbies: this.hobbyInputs.map(hobby => hobby.value)
        }
        console.log(formData)
        this.$store.dispatch('signup', formData)
      }
    }
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
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

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input.invalid label {
    color: red;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
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
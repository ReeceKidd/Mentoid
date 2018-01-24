<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-8 col-xs-offset-2">
        <h2 class="text-center">
          Please add your employment experience.
        </h2>
      </div>
    </div>

    <br>

    <div class="row text-center">
      <button @click="onAddExperience" class="btn btn-success">Add Experience</button>
    </div>

    <div class="row">
      <form @submit.prevent="onSubmit">

        <div class="experiences" v-for="(experience, index) in experiences" :key="experience.id">

          <div class="col-xs-4 col-xs-offset-4">

            <div class="input" :class="{invalid: $v.experiences.$each[index].$error}">
              <label :for="experience.title">Title</label>
              <input type="text" :id="experience.title" @blur="$v.experiences.$each[index].title.$touch()" v-model="experience.title">
              <label :for="experience.company">Company</label>
              <input type="text" :id="experience.company" @blur="$v.experiences.$each[index].company.$touch()" v-model="experience.company">
              <div class="block">
                <label>Start Date</label>
                <el-date-picker type="year" placeholder="Pick a year">
                </el-date-picker>
              </div>
              <div class="block">
                <label>Currently work here?</label>
                <div class="input" name="language">
                  <label for="language">Language*</label>
                  <select id="language" v-model="language">
                    <option value="English">English</option>
                    <option value="Spanish">Spainish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>
              <div class="block">
                <label>End Date</label>
                <el-date-picker type="year" placeholder="Pick a year">
                </el-date-picker>
              </div>
              <br>
              <button @click="onDeleteExperiences(experience.id)" type="button" class="btn-danger btn btn-sm">Delete experience</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <button>Submit</button>
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
    data() {
      return {
        experiences: [],
        checked: true
      }
    },
    validations: {
      experiences: {
        required,
        minLen: minLength(2),
        $each: {
          value: {
            required,
            minLen: minLength(5)
          }
        }
      }
    },
    methods: {
      onAddExperience() {
        const newExperience = {
          id: 0,
          title: '',
          company: '',
          currentlyWorkHere: '',
          startDate: '',
          endDate: ''
        }
        this.experiences.push(newExperience)
      },
      onDeleteExperiences(id) {
        this.experiences = this.experiences.filter(experience => experience.id !== id)
      },
      onSubmit() {
        const formData = {
          experiences: this.experiences.map(experience => experience.title)
        }
        console.log(formData)
        this.$store.dispatch('signup', formData)
      }
    }
  }

</script>

<style scoped>
  .align-right {
    text-align: right;
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

  #yearsOfExperienceDesktop input {
    width: 10%;
  }

  #areOfInterestDesktop input {
    width: 50%
  }

  #yearsOfExperienceMobile input {
    width: 50%;
  }

  #areaOfInterestMobile input {
    width: 80%;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #104E8B;
    background-color: #eee;
  }

  .invalid input {
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
